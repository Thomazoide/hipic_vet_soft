require('dotenv').config()
const {conectarDB} = require('./database')
const app = require('./app')

conectarDB()

async function main(){
    await app.listen(app.get('port'))
    console.log('servidor en puerto: ', app.get('port'))
}

main()