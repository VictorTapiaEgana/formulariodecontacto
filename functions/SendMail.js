const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const path = require('path');

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
            partialsDir:path.join(process.cwd(),'views/Styles'),
            defaultLayout:false
          },
          viewPath:path.join(process.cwd(),'views')
    };

    console.log(hbsOptions)
    console.log(path.join(process.cwd()));
    
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