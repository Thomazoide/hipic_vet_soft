const {connect, connection, mongo} = require('mongoose')
const Grid = require('gridfs-stream')

let gfs
async function conectarBD(){
    try{
        await connect(process.env['MONGO_LOGIN'], {useNewUrlParser: true, useUnifiedTopology: true})
        connection.once('open', () => {
            gfs = Grid(connection.db, mongo)
            gfs.collection('archivos')
        })
        console.log('conectado correctamente a BBDD')
    }catch(err){
        console.log('Error al conectar... \n*************',err,'\n*************')
    }
}

module.exports = {conectarBD, gfs}