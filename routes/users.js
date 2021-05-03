var express = require('express');
var router = express.Router();


router.get('/', function (req, res) {
  console.log('It works');
  // ...
});


/* GET users listing. 
router.get('/users/', function(req, res, next) {
  //res.send('respond with a resource');
    res.send('index', { title: 'Expresssss' });
});
*/


/* GET home page. 
router.get('/', function(req, res, next) {
  res.send('index', { title: 'Express' });
});
*/

module.exports = router;