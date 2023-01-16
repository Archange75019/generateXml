const express = require('express');
const bodyParser = require('body-parser');
require('body-parser-xml')(bodyParser);
 const { XMLParser, XMLBuilder, XMLValidator} = require("fast-xml-parser");
require('dotenv').config();
var customers =[];

const app = express();
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())

app.use(
    bodyParser.xml({
      limit: '1MB', // Reject payload bigger than 1 MB
      xmlParseOptions: {
        normalize: true, // Trim whitespace inside text nodes
        normalizeTags: true, // Transform tags to lowercase
        explicitArray: false, // Only put nodes in array if >1
      },
    }),
  );

  app.get('/', (req, res, next)=>{
    res.json({
      mess: 'page acceuil'
    })
  })
app.post('/data', (req, res, next) =>{
    const parser = new XMLParser();
    
    




    for (var i = 0; i < req.body.customers.customer.length; i++ ) {
        var customer = req.body.customers.customer[i];

        if (customer.credentials['enabled-flag'] == "true") {
            customers.push(customer)
        }

    }
    let jObj = parser.parse(customers);
    console.log('jObj :', jObj)
    const builder = new XMLBuilder();
    const xmlContent = builder.build(jObj);

    res.json({
        "message": true,
        "body": xmlContent
    })
});

app.listen(3000, () => {
    console.log(`Server online on port  :3000`)
})