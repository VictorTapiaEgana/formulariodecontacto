const nombre = document.getElementById('inputNombre');
const Nmail = document.getElementById('inputEmail');
const Smail = document.getElementById('InputServidor');
const asunto = document.getElementById('inputAsunto');

const Boton = document.getElementById('enviar');

Boton.addEventListener('click',(e)=>{
    
    e.preventDefault();

    const ArmarCorreo = {        
        para : `${Nmail.value}@${Smail.value}`,
        asunto :'Gracias por comunicarte',        
        parametros: {
            nombre: nombre.value,
            cuerpo: asunto.value
        }
    }

    fetch('/registro', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(ArmarCorreo)    
    })
    .then(response => {
        if (response.ok) {
            document.write('Gracias el correo fue recibido exitosamente')
        } else {
            document.write('❌ se produjo un error al enviar el correo')
        }
    });
});