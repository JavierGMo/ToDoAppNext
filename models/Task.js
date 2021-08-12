import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        require: [true, "El titulo es necesario para agregar la tarea"]
    },
    status: {
        type: String,
        require: [true, "El titulo es necesario para agregar la tarea"]
    },

})

export default mongoose.models.Task || mongoose.model('Task', TaskSchema)