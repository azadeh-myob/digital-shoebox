using Microsoft.WindowsAzure.Storage.Blob;
using Microsoft.WindowsAzure.Storage;
using System.Net;
using System.Drawing;

public static async Task<HttpResponseMessage> Run(HttpRequestMessage req, TraceWriter log)
{
  log.Info("C# HTTP trigger function processed a request.");

  // parse query parameter
  string name = req.GetQueryNameValuePairs()
  .FirstOrDefault(q => string.Compare(q.Key, "name", true) == 0)
  .Value;

  log.Info("test");

  // Get request body
  dynamic data = await req.Content.ReadAsAsync<object>();

  // Set name to query string or body data
  name = name ?? data?.name;

  WriteToBlob(name);

  return name == null
    ? req.CreateResponse(HttpStatusCode.BadRequest, "Please pass a name on the query string or in the request body")
    : req.CreateResponse(HttpStatusCode.OK, "Hello " + name);
}

static async Task<string> WriteToBlob(string base64String)
{
  string status = string.Empty;

  CloudStorageAccount storageAccount = CloudStorageAccount.Parse("DefaultEndpointsProtocol=https;AccountName=dgscratchstorage;AccountKey=FPDuYq6kXsuPQXruxk2tV8OX1h6qgodT5Q/8dphT6zPer4hdoZwjg3vDmNZDQHIltqAzhhQsSfU8qMpsu5zKxQ==;EndpointSuffix=core.windows.net");
  CloudBlobClient blobClient = storageAccount.CreateCloudBlobClient();
  CloudBlobContainer blobContainer = blobClient.GetContainerReference("test");
  blobContainer.CreateIfNotExists();

  string blobName = "sfm/invoice02.jpg";
  CloudBlockBlob blob = blobContainer.GetBlockBlobReference(blobName);
  blob.Properties.ContentType = "image/jpeg";


  try
  {
    byte[] imageBytes = Convert.FromBase64String(base64String);
    // Convert byte[] to Image
    using (var ms = new MemoryStream(imageBytes, 0, imageBytes.Length))
    {
      blob.UploadFromStream(ms);
    }
  }
  catch (StorageException e)
  {
    return $"Error {e.Message}";
  }
  return "Success";
}


function postImage(req, res) {

  if (req.body && req.body.clientId) {
    res.sendStatus(200);

  }
  else {
    res.sendStatus(400);
  }
}

module.exports = {
  postImage
}
