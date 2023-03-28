const express = require('express')
const bodyParser = require('body-parser');
const app = express()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({limit: '300mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '300mb', extended: true}))

const port = 3000
const PATH = "./images/"

function save(base64, name) {
    data = Buffer.from(base64, 'base64');
    try {
        require('fs').writeFile(PATH + name, data,  
            function() 
            {
            console.log('Saved image to: ', PATH + name);
            }
        );
    } catch(error) {
        console.log('ERROR:', error);
    }
}

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/image', (req, res) => {
    save(req.body.image, req.body.name);
    res.sendStatus(200);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})