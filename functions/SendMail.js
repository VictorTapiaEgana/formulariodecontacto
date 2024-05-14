const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');

module.exports = async function sendEmail(para,asunto,parametros){       
  
    const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_ADDRESS,
            pass: process.env.GMAIL_PASS
        }
    });
    
    const hbsOptions = {   
          viewEngine:{
            partialsDir:'../views/Styles',
            defaultLayout:false
          },
          viewPath:'../views'  
    };
    
    transport.use('compile',hbs(hbsOptions));

    const mailOptions ={
        from:{
              name:'Victor Tapia 👨‍💻',
              address:'victortapiaegana@gmail.com'
            },
        to: para,
        cc: 'victortapiaegana@gmail.com',
        subject: asunto,
         template: 'plantilla1',
        // html:'<h1>Hola</h1>',
        context:parametros,
    }

    // transport.sendMail(mailOptions,(err,info)=>{
    //     if (err){
    //         return (`Error coreo no enviado: ${err}`)
    //     }
        
    //     return (`Correo enviado exitosamente !!!`)
        
    // })
    
    try {
        const info = await transport.sendMail(mailOptions);
        return `Correo enviado exitosamente !!!`;
    } catch (err) {
        return (`Error correo no enviado: ${err}`);
    }

};