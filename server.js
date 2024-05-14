const express = require('express');
const app = express();
const path = require('path');

const sendEmail = require('./functions/SendMail.js')

app.use(express.json());

require('dotenv').config();

const PORT =  process.env.PORT || 3005;

app.use('/css', express.static(path.join(process.cwd(), '/node_modules/bootstrap/dist/css')));

app.use('/cssjs', express.static(path.join(process.cwd(), '/node_modules/bootstrap/dist/js')));

app.use('/assets',express.static(path.join(process.cwd(), "/public")));

app.get('/contacto',(req,res)=>{
    res.sendFile(path.join(process.cwd(), '/contacto.html'));
});

app.post('/registro', async (req, res) => {    

    const { para, asunto, parametros } =  req.body;        

    try {
        const resultado = await sendEmail(para, asunto, parametros);        
        res.status(200).send('Registro Exitoso');
    } catch (error) {        
        res.status(500).send(`Error al enviar el correo: ${err}`);
    }

});   

app.get('*',(req,res)=>{
      res.redirect('/contacto')
});

app.listen(PORT,()=>{
     console.log(`Holiwis en puerto: ${PORT}`)
});