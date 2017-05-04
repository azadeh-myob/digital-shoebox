/**
 * Created by azadeh.hassanzadeh on 5/5/17.
 */
var request = require('request');
var azure = require('azure-storage');
var _ = require('lodash');

module.exports = function (context, myQueueItem) {
  context.log('JavaScript queue trigger function processed work item', myQueueItem);
  context.log('myQueueItem');
  context.log(myQueueItem);
  context.log(myQueueItem);
  let url = 'https://digitalshoebox.blob.core.windows.net/dshoebox/';
  url += myQueueItem.userId + '/' + myQueueItem.id + '.jpg';

  let uid = myQueueItem.userId;

  // Make a call out to Cognitive Services
  function OCR () {
    request.post({
      url: "https://southeastasia.api.cognitive.microsoft.com/vision/v1.0/ocr",
      headers: {
        "Content-Type": "application/json",
        "Ocp-Apim-Subscription-Key": 'XXXXX'
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
        };
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

    tableSvc.queryEntities('dshoebox',query, null, function(error, result, response) {

      if(!error) {
        // query was successful
        updatedTask=result.entries[0];

        updatedTask.ocrBlob= {'_':JSON.stringify(ocr)};
        // context.log(result.entries[0]);
        tableSvc.mergeEntity('dshoebox', updatedTask, function(error, result, response){
          context.log('ERROR',error);
          if(!error) {
            // Entity updated
            context.log('about to put on queue');
            var retryOperations = new azure.ExponentialRetryPolicyFilter();
            var queueSvc = azure.createQueueService().withFilter(retryOperations);
            queueSvc.createMessage('digital-shoebox-data-complete', "Hello world!", function(error, result, response){
              if(!error){
                // Message inserted
                console.log('on queue');
              }
            });
            context.done();
          } else {
            context.done();
          }
        });
      } else {
        context.done();
      }
    });
  }
  OCR();
};