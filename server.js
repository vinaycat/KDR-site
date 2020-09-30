// var http = require('http');
// var fs = require('fs');
// var express = require('express');
// var path = require('path');
// const app = express();
// const PORT=8080; 
// app.use(express.static(path.join(__dirname, 'public')));

// fs.readFile('./main.html', function (err, html) {

//     if (err) throw err;    

//     http.createServer(function(request, response) {  
//         response.writeHeader(200, {"Content-Type": "text/html"});  
//         response.write(html);  
//         response.end();  
//     }).listen(PORT);
// });
var express = require('express');
var app = express();
var path = require('path');
var PastebinAPI = require('pastebin-js')
const bodyParser = require('body-parser');

pastebin = new PastebinAPI('');
pastebin = new PastebinAPI({
    'api_dev_key' : 'RYdwev9iGvA-N-m6xtm6s7UtiCMiaE9u',
    'api_user_name' : 'Vinaycat123',
    'api_user_password' : '723bCKs#UhyB'
  });

// viewed at http://localhost:8080
app.use(express.static(path.join(__dirname, '/public')));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/main.html'));
});

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/', (req, res) => {
    // console.log(req);
    // console.log();
    // let contents = req.body.vinay
    // pastebin
    // .createPaste({
    //     text: contents,
    //     title: "K/D",
    //     format: "javascript",
    //     privacy: 1,
    //     expiration: '10M'
    // })
    // .then(function (data) {
    //     // paste succesfully created, data contains the id
    //     console.log(data);
    //     res.send(data);
    // })
    // .fail(function (err) {
    //     // Something went wrong
    //     console.log(err);
    // })
    
   

});
app.listen(process.env.PORT || 5000)