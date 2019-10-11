var fs = require('fs'),
    path = require('path'),
    http = require('http');

var app = require('connect')();
var swaggerTools = require('swagger-tools');
var jsyaml = require('js-yaml');

// Initialize the Swagger middleware
var middleware = function () {
    var spec = fs.readFileSync(path.join(__dirname, '../api/swagger.yaml'), 'utf8');
    var swaggerDoc = jsyaml.safeLoad(spec);
    this.middleware = swaggerTools.initializeMiddleware(swaggerDoc,
        function (middleware){
            
        }
        
        );
}
exports.swaggerInitial = function () {
    return new middleware();
};