// var http = require('http');

function recogniseTextInImage() {
    let body = {
            "url": 'https://help.clover.com/wp-content/uploads/online-receipt-location.jpg'
        };

    // An object of options to indicate where to post to
    var post_options = {
        host: 'southeastasia.api.cognitive.microsoft.com',
        path: '/vision/v1.0/ocr',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key': '93eebc96afd14ffba408c8f57af04c91'
        },
        json: true,
        body: JSON.stringify(body)
    };

    // Set up the request
    var post_req = http.request(post_options, function(error, response, body) {
        // console.log(`STATUS: ${res.statusCode}`);
        // console.log(`HEADERS: ${JSON.stringify(res.headers)}`);

        // post_req.on('error', (e) => {
        //     console.log('error', e);
        // })
        // res.on('data', function (chunk) {
        //     console.log('Response: ' + chunk);
        // });
        // res.on('end', () => {
        //     console.log('No more data in response.');
        //     post_req.end();
        // });
        console.log(error, response, body);
        res.on('data', function (chunk) {
            console.log(error, response, body);
        });
        res.on('error', function (chunk) {
            console.log(error, response, body);
        });
        if (!error) {
            //res.write(response.statusCode);
        } else {
            //response.end(error);
            //res.write(error);
        }
        res.end(response);
    });

    // post the data
    
    post_req.write(JSON.stringify(body));

};

recogniseTextInImage();