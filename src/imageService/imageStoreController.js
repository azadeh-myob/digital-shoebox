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
