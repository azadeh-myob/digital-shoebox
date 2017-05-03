var request = require('request');
var azure = require('azure-storage');

module.exports = function (context, myQueueItem) {
    context.log('JavaScript queue trigger function processed work item', myQueueItem);
    //construct url
    let url = myQueueItem.url;
    let uid = myQueueItem.uid;
    //  context.log(uid);

    //myQueueItem
    
    // Make a call out to Cognitive Services
    function OCR () {
            request.post({
                url: "https://southeastasia.api.cognitive.microsoft.com/vision/v1.0/ocr",
                headers: {
                    "Content-Type": "application/json",
                    "Ocp-Apim-Subscription-Key": '93eebc96afd14ffba408c8f57af04c91'
                },
                json: true,
                body: {
                "url": url
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

                updateTable(uid,body);

                
                

                
            });
        }
        function updateTable(uid,ocr) {

            var retryOperations = new azure.ExponentialRetryPolicyFilter();
            var tableSvc = azure.createTableService().withFilter(retryOperations);
            var query = new azure.TableQuery()
                .top(1)
                .where('PartitionKey eq ?', uid);

            // context.log(query);
            tableSvc.queryEntities('dshoebox',query, null, function(error, result, response) {

                if(!error) {
                    // query was successful
                    updatedTask=result.entries[0];

                    updatedTask.ocrBlob= {'_':ocr};
                    // context.log(result.entries[0]);
                    tableSvc.mergeEntity('dshoebox', updatedTask, function(error, result, response){
                        console.log(error);
                        if(!error) {
                            // Entity updated
                            context.log('success!');
                            return 'success!';
                        } else {
                            context.log(':((');
                        }
                        context.done();

                    });
                } else {
                    context.log(':(');
                    context.done();
                }
            });

        }

       OCR();
};