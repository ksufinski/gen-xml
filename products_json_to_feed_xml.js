const builder = require('xmlbuilder');
const fs = require('fs');


const rssElement = builder
    .create('rss', {'type': 'git'})
rssElement.att('xmlns:g', 'http://base.google.com/ns/1.0')
rssElement.att('version', '2.0');

const host = 'https://recom.devel.ardas.dp.ua';


const channelElement = rssElement.ele('channel');


function filterProducts(products) {
    return products
        .filter(product => product['product_type'] !== 'configurable')
}

fs.promises.readFile('./products.json')
    .then(r => JSON.parse(r.toString()))
    .then(filterProducts)
    .then(appendItems)
    .then(saveData)
    .catch(console.error);


function appendItems(products) {
    products.forEach(appendItem);
    return products.length;
}

function appendItem(product) {

    let item = channelElement.ele('item');

    item.ele('g:id', null, product['sku']);
    item.ele('g:link', null, processProductUrl(product['url_key']));
    item.ele('g:title', null, product['name']);
    item.ele('g:description', null, product['description']);
    item.ele('g:link', null, product['url']);
    item.ele('g:image_link', null, processImageUrl(product['additional_images']));
    item.ele('g:availability', null, product['is_in_stock']);
    item.ele('g:price', null, product['price']);
    item.ele('g:google_product_category', null, processCategories(product['categories']));
}


function saveData(rowsCount) {
    const xml = rssElement.end({pretty: true});
    const filePath = `./feed_rows_${rowsCount}_${Date.now()}.xml`;
    fs.writeFileSync(filePath, xml);
}

function processImageUrl(commaSeparateRelativePaths) {
    const firstImageUrl = commaSeparateRelativePaths.split(',')[0];
    return `${host}/media/catalog/product${firstImageUrl}`;
}

function processCategories(commaSeparatedCategoryTrees) {
    const categoryTrees = commaSeparatedCategoryTrees.split(',');
    return Array
        .from(categoryTrees[categoryTrees.length - 1])
        .map(char => char === '/' ? ' > ' : char)
        .join('');
}

function processProductUrl(urlKey) {
    return `${host}/${urlKey}.html`;
}