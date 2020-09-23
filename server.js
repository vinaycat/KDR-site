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
pastebin = new PastebinAPI('RYdwev9iGvA-N-m6xtm6s7UtiCMiaE9u');
// pastebin
//     .createPaste("Test from pastebin-js", "pastebin-js")
//     .then(function (data) {
//         // paste succesfully created, data contains the id
//         console.log(data);
//     })
//     .fail(function (err) {
//         // Something went wrong
//         console.log(err);
//     })
// viewed at http://localhost:8080
app.use(express.static(path.join(__dirname, '/public')));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/main.html'));
});

app.listen(process.env.PORT || 5000)