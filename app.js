import express from 'express'
// import session from 'express-session' 
import './db.js' //ES module must include the extension.
import schedule from './db.js'

const app = express()
app.set('view engine', 'hbs')

app.use(express.urlencoded({extended:false}))

app.get('/', (req, res) => {
    //Usage without async and await
    schedule.find({})
    .then(foundData => {
        res.render('index', {ds: foundData})
    }).catch(err => console.log("Error occurs!", err)) 
})

app.post('/', async (req, res) => {
    console.log("What is req.body:\n", req.body)
    try{
        const newSchedule = new schedule({
            event: req.body.event,
            expire: req.body.expire,
            priority: req.body.priority
        })
        await newSchedule.save()
        res.redirect('/')
    }catch(err){
        res.status(500).send("error")
        console.err(err)
    }
})

app.post('/complete/:id', async(req, res) => {
    console.log(req.params.id)
    try{
        await schedule.findByIdAndUpdate(req.params.id, {completed: true})
        res.redirect('/')
    }catch(err){
        res.status(500).send(err)
    }
})
app.listen(3001, () => {
    console.log("Successfully connected to PORT 5000")
})