const { createServer } = require("http");
const fs = require('fs');
const { Server } = require("socket.io");

const mimeTypes = {
    "html": "text/html",
    "js": "text/javascript",
    "css": "text/css"
};

const httpServer = createServer(function (req, res){
    if (req.url === '/') {
        res.writeHead(200, { "Content-Type": "text/html" });
        fs.createReadStream('./index.html').pipe(res)
    }
    /* đọc file css/js */
    const filesDefences = req.url.match(/\.js|.css/);
    if (filesDefences) {
        const extension = mimeTypes[filesDefences[0].toString().split('.')[1]];
        res.writeHead(200, { 'Content-Type': extension });
        fs.createReadStream(__dirname + "/"+ req.url).pipe(res);
    }
});

const io = new Server(httpServer);

let vote = [0, 0, 0, 0, 0, 0, 0, 0];

/* Quản lý dữ liệu webscoket */
io.on('connection', socket => {
    socket.on('voted', data => {
        switch (data){
            case '1.1':
                vote[0]+=1;
                break;
            case '1.2':
                vote[1]+=1;
                break;
            case '1.3':
                vote[2]+=1;
                break;
            case '2.1':
                vote[3]+=1;
                break;
            case '2.2':
                vote[4]+=1;
                break;
            case '2.3':
                vote[5]+=1;
                break;
            case '3.1':
                vote[6]+=1;
                break;
            case '3.2':
                vote[7]+=1;
                break;
            default:
                break;
        }
        io.emit('updateVote', vote);
    })
});

httpServer.listen(3000, 'localhost', function () {
    console.log('Server running in http://localhost:3000')
});