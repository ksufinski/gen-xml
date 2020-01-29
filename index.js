const builder = require('xmlbuilder');
const fs = require('fs');


const rowsCount = 1000000;
const filePath = `./test_xml_rows_n${rowsCount}.xml`;
const channelElement = builder.create('rss',
    {
        'xmlns:g': 'http://base.google.com/ns/1.0'
    })
    .ele('channel');

appendItem(channelElement, rowsCount);

const xml = channelElement.end({pretty: true});

fs.writeFileSync(filePath, xml);
const fileSizeMb = fs.statSync(filePath)['size'] / 1000000.0;

fs.renameSync(filePath, `./test_xml_rows_n${rowsCount}_size_${fileSizeMb}_mb.xml`);
console.log('fileSizeMb', fileSizeMb);


function appendItem(channelElement, count) {

    for (let i = 0; i < count; i++) {
        let item = channelElement.ele('item');

        item.ele('g:id', null, i);
        item.ele('g:description', null, 'Attractively styled and boasting stunning picture quality, the LG 22LB4510 - 22&quot; LED TV - 1080p (FullHD) is an excellent television/monitor. The LG 22LB4510 - 22&quot; LED TV - 1080p (FullHD) sports a widescreen 1080p panel, perfect for watching movies in their original format, whilst also providing plenty of working space for your other applications.');
        item.ele('g:link', null, 'http://www.example.com/electronics/tv/22LB4510.html');
        item.ele('g:condition', null, 'used');
        item.ele('g:availability', null, 'in stock');
        item.ele('g:price', null, '159 USD');
        item.ele('g:product_type', null, 'Consumer Electronics &gt; TVs &gt; Flat Panel TVs');
    }
}
