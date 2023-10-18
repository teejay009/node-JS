const http = require('http');
const path = require('path');
const fs = require('fs')
const fsPromises = require('fs').promises;


const logEvents = require('./longEvents');

const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}; 
const PORT = process.env.PORT || 3000;

// initialize object

const myEmitter = new MyEmitter();
myEmitter.on("log", (msg, filename) => logEvents(msg, filename))

const serveFile = async(filepath, contentType, Response) => {
    try{
        const rawData = await fsPromises.readFile(
            filepath, 
            !contentType.includes("image") ? "utf8" :
             ""
            );
     


        const data = contentType === "application/json"
        ? JSON.parse(rawData) : rawData
        Response.writeHead(
            filepath.includes("404,html") ? 404 :
            200,
             {'content-Type' : contentType}
        );
        Response.end(
            contentType === "application/json"
            ?JSON.stringify(data) : data 
        );
    } catch (err) {
        console.error(err);
    myEmitter.emit("log", `${err.name} : ${err.message} "errLog.txt"`)

        // 500 is interner error that will show in dev tools. but not show for users
        Response.statusCode = 500;
        Response.end();
    }
}
const server = http.createServer((req, res) => {
    console.log(req.url, req.method);
myEmitter.emit("log", `${req.url}\t${req.method}, "reqlog.txt"`)


//setting the content-type

    const extension = path.extname(req.url);
    let contentType;

    switch(extension) {
        case '.css': contentType = 'text/css';
        break;
        case '.js':
            contentType = 'text/javascript';
            break;
            case '.json':
                contentType = 'application/json';
                break;
                case '.jpg':
                contentType = 'image/jpg';
                break;
                case '.png':
                    contentType = 'image/png';
                break;
                case '.txt':
                    contentType = 'text/plain';
                    break;
                    default: contentType = 'text/html';
    }

    //setting the filepath
    let filepath = contentType === 'text/html' && req.url === '/'
    ? path.join(__dirname, 'views', 'index.html')
    :contentType === 'text/html' && req.url.slice(-1)==='/'
    ?path.join(__dirname, 'views', req.url, 'index.html')
    :path.join(__dirname, req.url);

    // make .html extension not required in browzer
    if(!extension && req.url.slice(-1) !== '/') filepath += '.html'
    const fileExists = fs.existsSync(filepath)
    if (fileExists) {
        serveFile(filepath, contentType, res)

    }else {
        //404. page not found
        //301. take us to normal page we call for

        // console.log(path.parse(filepath));
        switch(path.parse(filepath).base) {
            case 'old-page.html':
                res.writeHead(301, {'Location': '/new-page.html'});
                res.end();
                break;
            case 'www-page.html':
                    res.writeHead(301, {'Location': '/'});
                    res.end();
                    break;
            default:
                        // serve a 404 response we serve a 404 response by the code below
                        serveFile(path.join(__dirname, 'views', '404.html'), 'text/html', res);

        }
    }
})

server.listen(PORT, () => console.log(`server running on port ${PORT}`));


// add listener for the log event
// myEmitter.on('log', msg => {
//     logEvents(msg)
// })

// // we are using the setTimeout method to see the difference between two events clearly. We can also not use the setTimeout method

// setTimeout(() => {
//     myEmitter.emit('log', 'Log event emitted!');
// }, 2000);