var PORT = 8080;

var http = require( 'http' ),
  querystring = require( 'querystring' ),
  exec = require('child_process').exec;

process.on( "uncaughtException", function( error ) {
  console.error( "Uncaught exception: " + error.message );
  console.trace();
});

var last_payload = {};

http.createServer( function( request, response ) {


  if( request.method == 'GET' ) {

    response.writeHead( 200, {'Content-Type': 'application/json; charset=utf-8'} );
    response.write(last_payload);
    response.end();

  } else {

    var body = '';
    request.on( 'data', function( chunk ) {
      body += chunk.toString();

    });

    request.on( 'end', function() {
      //console.log(body);
      last_payload = body;
      console.log( new Date(), request.method, request.url);

      exec( "/home/hook/io/deploy.sh", function( error, stdout, stderr ) {
        response.writeHead( 200, {'Content-Type': 'text/plain'} );
        response.end( error ? stderr : stdout );
        if(error) {console.error(error);}
      });
    });
  }
}).listen( PORT );

console.log('Server running at '+PORT);