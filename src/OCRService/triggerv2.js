var request = require('request');

module.exports = function(context, req) {
    context.log('Node.js HTTP trigger function processed a request. RequestUri=%s', req.originalUrl);

    // Make a call out to Cognitive Services
        
        request.post({
            url: "https://southeastasia.api.cognitive.microsoft.com/vision/v1.0/ocr",
            headers: {
                "Content-Type": "application/json",
                "Ocp-Apim-Subscription-Key": '93eebc96afd14ffba408c8f57af04c91'
            },
            json: true,
            body: {
              "url": 'https://help.clover.com/wp-content/uploads/online-receipt-location.jpg'
            }
        }, function(err, res, body) {
          
            // Check to see if we succeeded.
            if(err || res.statusCode != 200) {
                context.log(err);
                context.res = {
                    status: 500,
                    body: err
                }
                context.done();
                return
            }
            
            context.res = {
                // status: 200, /* Defaults to 200 */
                // Send back the score we got from the Cog API
                body
            };
            context.done();
        });
  
    
};