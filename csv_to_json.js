const csvFilePath= './products.csv';
const csv =require('csvtojson');
const fs = require('fs');

const jsonFilePath = './products.json';
csv()
    .fromFile(csvFilePath)
    .then(data => fs.promises.writeFile(jsonFilePath, JSON.stringify(data, null, 2)))
    .catch(console.error);
