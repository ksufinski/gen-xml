



# how to convert csv products to google product feed in xml 

1. git clone https://github.com/ksufinski/gen-xml.git
2. npm install
3. export from magento products and place it in projects root dir in file `products.csv`
4. run `npm run convert-from-csv-to-xml-feed`
5. you will get `feed_rows_{N}_{timestamp}.xml` feed file 





# how to gen large xml
cd gen-xml 

node --max-old-space-size=8096 index.js
