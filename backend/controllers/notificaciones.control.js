const Notificacion = require('../models/notificaciones')

const NotiCtrl = {}

NotiCtrl.getNotis = async (req, res) => {
    const notis = await Notificacion.find()
    res.json(notis)
}

NotiCtrl.crearNoti = async (req, res) => {
    
    try{
        const {titulo, fecha, descripcion, target} = req.body
        let nuevaNoti = new Notificacion({
            titulo: titulo,
            fecha: fecha,
            descripcion: descripcion,
            target: target
        })
        await nuevaNoti.save()
        return res.status(200).json({mensaje: 'Exito al crear...'})
    }catch(err){
        console.log(err)
        return res.status(400).json({mensaje: 'error al crear...', error: err})
    }
}

NotiCtrl.delNoti = async (req, res) => {
    const {_id} = req.body
    await Notificacion.findByIdAndDelete({_id})
}

module.exports = NotiCtrl