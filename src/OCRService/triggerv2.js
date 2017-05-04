var request = require('request');
var _ = require("lodash");

module.exports = function(context, req) {
    
    context.log('Node.js HTTP trigger function processed a request. RequestUri=%s', req.originalUrl);
    
    // Make a call out to Cognitive Services
        request.post({
            url: "https://southeastasia.api.cognitive.microsoft.com/vision/v1.0/ocr",
            headers: {
                "Content-Type": "application/json",
                "Ocp-Apim-Subscription-Key": 'XXXXX'
            },
            json: true,
            body: {
              "url": req.RequestUri
            }
        }, function(err, res, body) {
            // Check to see if we succeeded.
            if(err || res.statusCode != 200) {
                context.log(err);
                context.res = {
                    status: 500,
                    body: err
                };
                context.done();
                return
            }
            
            context.res = {
                body
            }
            context.done();
        });
};