const fs = require('fs');
const http = require('http');
const url = require('url');
const slugify = require('slugify');
const replaceTemplate = require('./starter/modules/replaceTemplate');
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
const dataObj = JSON.parse(data);
const tempOverview = fs.readFileSync(`${__dirname}/starter/templates/template-overview.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/starter/templates/template-product.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/starter/templates/template-card.html`, 'utf-8');

const server = http.createServer((req, res) => {
    const {query, pathname} = url.parse(req.url, true);

    switch (pathname) {
        //overview page
        case '/':
        case '/overview':
            res.writeHead(200, {'Content-type': 'text/html'});
            const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('');
            const overviewHtml = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
            res.end(overviewHtml);
            break;

        //product page
        case '/product':
            res.writeHead(200, {'Content-type': 'text/html'});
            const product = dataObj[+query.id];
            const productHtml = replaceTemplate(tempProduct, product);

            res.end(productHtml);
            break;

        //api
        case '/api':
            res.writeHead(200, {'Content-type': 'application/json'});
            res.end(data);
            break;

        //not found
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




