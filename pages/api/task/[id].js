import conectarDB from "../../../db/connection"
import Task from "../../../models/Task"

export default async function handler(req, res){
    const {method, query: {id}} = req
    switch (method) {
        case 'PUT':
            try {
                
                await conectarDB()
                const task = await Task.findByIdAndUpdate(id, req.body)
                
                return res.json({
                    success: true,
                    task
                })

            } catch (error) {
                console.error(error)
                return res.status(500).json({success: false, error: 'Falla en el servidor'})
            }
            break;
        case 'DELETE':
            try {
                await conectarDB()
                const resultado = await Task.findByIdAndDelete(id)
                
                
                return res.json({
                    success: true,
                    resultado
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