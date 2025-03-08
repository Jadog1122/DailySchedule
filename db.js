import mongoose from "mongoose";

mongoose.connect('mongod://localost/dailyschedule')
    .then(() => console.log("connected to the Database dailyschedule")
).catch(err => console.error("Connection Errors", err))

const scheudleSchema = new mongoose.Schema{
    event = String,
    priority = Number,
    date = Data
}

const schedule = mongoose.model('schedule', scheudleSchema)
export default schedule