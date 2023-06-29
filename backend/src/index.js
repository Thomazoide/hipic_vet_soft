require('dotenv').config()
const {conectarBD} = require('./database')
const app = require('./app')

conectarBD()

async function main(){
    await app.listen(app.get('port'))
    console.log('servidor en puerto: ', app.get('port'))
}

main()