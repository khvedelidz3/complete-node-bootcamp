const fs = require('fs');
const http = require('http');
const url = require('url');
//
// const textIn = fs.readFileSync('./starter/txt/input.txt', 'utf-8');
//
// console.log(textIn);
//
// const textOut = `This is what we know about avocado: ${textIn} \n Created on: ${Date.now()}`;
// fs.writeFileSync('./final/txt/output.txt', textOut);
// fs.readFile('./starter/txt/start.txt', 'utf-8', (err, data1) => {
//     fs.readFile(`./starter/txt/${data1}.txt`, 'utf-8', (err, data2) => {
//         console.log(data2);
//         fs.readFile(`./starter/txt/append.txt`, 'utf-8', (err, data3) => {
//             console.log(data3);
//             fs.writeFile('./starter/txt/final.txt', `${data2}\n${data3}`, 'utf-8', err => {
//                 console.log('Your file has been written');
//             });
//         });
//     });
// });

const data = fs.readFileSync(`${__dirname}/starter/dev-data/data.json`, 'utf-8');

const server = http.createServer((req, res) => {
    const pathName = req.url;

    switch (pathName) {
        case '/':
        case '/overview':
            res.end('This is overview');
            break;
        case '/product':
            res.end('This is product');
            break;
        case '/api':
            res.writeHead(200, {'Content-type': 'application/json'});
            res.end(data);
            break;
        default :
            res.writeHead(404, {'Content-type': 'text/html'});
            res.end('<h1>404 Not Found</h1>');
    }
});

server.listen(8000, () => {
    console.log('Server is listening on port 8000');
});

const getProducts = async () => {
    return fs.readFile(`${__dirname}starter/dev-data/data.json`, 'utf-8', (err, data) => {
        console.log('in read file');
        return data;
    });
};




