'user strict'
module.exports.tokenVerification = function (event, context, callback){
    console.log(event);
    const request = event.Records[0].cf.request;
    const headers=request.headers;
    console.log(headers);
    // if(!headers['Authorization'])
    console.log(request.uri);

    callback(null, request);
}