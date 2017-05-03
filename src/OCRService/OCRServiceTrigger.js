var http = require('http');

function recogniseTextInImage() {
    let body = '{"url":"https://help.clover.com/wp-content/uploads/online-receipt-location.jpg"}';

    // An object of options to indicate where to post to
    var post_options = {
        url: 'https://southeastasia.api.cognitive.microsoft.com/vision/v1.0/ocr',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key': '93eebc96afd14ffba408c8f57af04c91'
        },
        json: true,
        body: {
            "url": "https://help.clover.com/wp-content/uploads/online-receipt-location.jpg"
        }
    };
    console.log(post_options.body)

    // Set up the request
    var post_req = http.request(post_options, function(res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log('Response: ' + chunk);
        });
    });

    // post the data
    // post_req.write(post_data);
    post_req.end();
};

recogniseTextInImage();