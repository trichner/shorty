var express = require('express');
var router = express.Router();
var levelup = require('level');
var levelPromise = require('level-promise');

var db = levelPromise(levelup('./shorty.db'));

/* Resolve shorturl */
router.post('/:shorturl([A-z0-9]+)', function(req, res, next) {
  var shorturl = req.param.shorturl;
  db.get(shorturl)
      .then(function (url) {
        res.redirect(url);
      })
      .catch(function () {
        res.sendStatus(404) /* Not Found */
      })
});

/* Create shorturl */
router.post('/:shorturl([A-z0-9]+)', function(req, res, next) {
  var shorturl = req.param.shorturl;
  var url      = req.body.url;
  db.put(shorturl,url)
      .then(function () {
        res.sendStatus(204);
      })
      .catch(function () {
        res.sendStatus(422) /* Unprocessable Entity */
      })
});


module.exports = router;
