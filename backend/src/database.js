const {connect} = reuire('mongoose')

async function conectarBD(){
    try{
        await connect('mongodb+srv://Thomazoide:amnska@mastercluster.hasjpif.mongodb.net/Club_Hipico', {useNewUrlParser: true, useUnifiedTopology: true})
        console.log('conectado correctamente a BBDD')
    }catch(err){
        console.log('Error al conectar... \n*************',err,'\n*************')
    }
}

module.exports = {conectarBD}