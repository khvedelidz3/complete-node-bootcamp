const fs = require('fs');
const superagent = require('superagent');

const readFilePro = file => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => {
            if (err) reject('Could not find file');
            else resolve(data);
        });
    });
};

const writeFilePro = (file, content) => new Promise((resolve, reject) => {
    fs.writeFile(file, content, err => {
        if (err) reject(err.message);
        else resolve('success');
    });
});

const getDogPic = async () => {
    try {
        const data = await readFilePro(`${__dirname}/dog.txt`);
        console.log(`Breed: ${data}`);

        const res = await superagent
            .get(`https://dog.ceo/api/breed/${data.toString().replace(/[\r\n]/g, '')}/images/random`);
        console.log(res.body.message);

        await writeFilePro('dog-image.txt', res.body.message);
        console.log("Random image was saved");
    } catch (err) {
        console.log(err);
    }
};

getDogPic();

// readFilePro(`${__dirname}/dog.txt`)
//     .then(res => {
//         console.log(`Breed: ${res}`);
//
//         return superagent
//             .get(`https://dog.ceo/api/breed/${res.toString().replace(/[\r\n]/g, '')}/images/random`);
//     })
//     .then(res => {
//         return writeFilePro('dog-image.txt', res.body.message);
//     })
//     .then(res => {
//         console.log("Random image was saved");
//     })
//     .catch(err => {
//         console.log(err.message || err);
//     });


