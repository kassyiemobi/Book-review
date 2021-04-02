const express = require ('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

const  port = process.env.PORT || 8000

//root route
app.get('*', (req,res) => res.status(200).send({
    message:'good morning Nigeria my people'

}));
app.listen(port, () =>{
    console.log (`Server running on  port ${port}....... `)
});

module.exports = app;