const fs = require('fs');
const http = require('http');
const mysql = require('mysql');
const url = require('url');

function servePublicFile(res, path) {
    fs.readFile('./public' + path, 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
            res.writeHead(404);
            res.end();
        }
        else {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(data);
        }
    });
}

function serveMessages(res) {
    var con = mysql.createConnection({
        host: "localhost",
        user: "message_demo_read",
        password: "message_demo_read",
        database: "messages_demo"
    });

    con.connect((err) => {
        if (err) {
            console.log(err);
            res.writeHead(500);
            res.end();
        }
        else {
            con.query('select id, message from messages order by id', (err, result, fields) => {
                if (err) {
                    console.log(err);
                    res.writeHead(500);
                    res.end();
                }
                else {
                    res.writeHead(200, {'Content-Type': 'application/json'});
                    res.end(JSON.stringify(result));
                }
                con.end();
            }); 
        }
    });
}

http.createServer((req, res) => {
    console.log('Request for ' + req.url);
    let reqURL = url.parse(req.url, true);
    let reqPath = reqURL.pathname.toLowerCase();
    if (reqPath === '/')
        servePublicFile(res, '/index.html');
    else if (reqPath === '/messages')
        serveMessages(res);      
    else
        servePublicFile(res, reqPath)
}).listen(8080);
