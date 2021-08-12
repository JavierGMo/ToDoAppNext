import conectarDB from "../../../db/connection"
import Task from "../../../models/Task"

export default async function handler(req, res){
    const {method} = req
    switch (method) {
        case 'POST':
            try {
                await conectarDB()
                const task = new Task(req.body)
                await task.save()
                return res.json({
                    success: true,
                    task
                })

            } catch (error) {
                console.error(error)
                return res.status(500).json({success: false, error: 'Falla en el servidor'})
            }
            break;
        case 'GET':
            try {
                await conectarDB()
                const resultado = await Task.find({})
                
                const tasks = resultado.map(doc=>{
                    const task = doc.toObject()
                    task._id = `${task._id}`
                    return task
                })
                return res.json({
                    success: true,
                    data: tasks
                })

            } catch (error) {
                console.error(error)
                return res.status(500).json({success: false, error: 'Falla en el servidor'})
            }
            break;
        default:
            return res.status(500).json({success: false, error: 'Falla en el servidor'})
    }
}