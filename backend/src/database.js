const {connect} = require('mongoose')

async function conectarBD(){
    try{
        await connect(process.env['MONGO_LOGIN'], {useNewUrlParser: true, useUnifiedTopology: true})
        console.log('conectado correctamente a BBDD')
    }catch(err){
        console.log('Error al conectar... \n*************',err,'\n*************')
    }
}

module.exports = {conectarBD}