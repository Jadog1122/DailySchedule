import mongoose from "mongoose";

mongoose.connect('mongodb://localhost/dailyschedule')
    .then(() => console.log("connected to the Database dailyschedule")
).catch(err => console.error("Connection Errors", err))

const scheduleSchema = new mongoose.Schema({
    event : String,
    priority : Number,
    expire: {
        type: String,
        required: true,
        match: /^([01]?[0-9]|2[0-3]):[0-5][0-9] ?(AM|PM)?$/ // Matches 24-hour or 12-hour format
    }, 
    completed: {type: Boolean, default: false}
})

const schedule = mongoose.model('schedule', scheduleSchema)
export default schedule