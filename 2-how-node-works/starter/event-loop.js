const fs = require('fs');
const crypto = require('crypto');

const start = Date.now();

process.env.UV_THREADPOOL_SIZE = 8;

setTimeout(() => console.log('Timer 1 finished'));
setImmediate(() => console.log('Imemediate 1 finished'));

fs.readFile('test-file.txt', () => {
    console.log('I/O finished');

    setTimeout(() => console.log('Timer 2 finished'));
    setTimeout(() => console.log('Timer 3 finished'), 3000);
    setImmediate(() => console.log('Imemediate 2 finished'));

    crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
        console.log(Date.now() - start, 'password encrypted');
    });
    crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
        console.log(Date.now() - start, 'password encrypted');
    });
    crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
        console.log(Date.now() - start, 'password encrypted');
    });
    crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
        console.log(Date.now() - start, 'password encrypted');
    });
});

console.log('Hello from top level code');
