const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const TodoModel=require('./Models/Todo')

const app=express()

//middleware
app.use(cors())
app.use(express.json())

//db connection
mongoose.connect('mongodb://127.0.0.1:27017/test',{ useNewUrlParser: true, useUnifiedTopology: true })

//routes
app.get('/get',(req,res)=>{
    // res.send("hi all")
    TodoModel.find()
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
})
app.post('/add',(req,res)=>
{
   
    const task=req.body.task;
    // res.send(task)
    TodoModel.create({
        task:task 

    }).then(result=>res.json(result))
    .catch(err=>res.json(err))
})

app.put('/update/:id',(req,res)=>
{
    const {id}=req.params;
    // console.log(id)
    // res.send(id)
    TodoModel.findByIdAndUpdate({_id:id},{done:true})
    .then(result=>res.json(result))
    .catch(err=>res.json(err))

})

app.delete('/delete/:id',(req,res)=>
{
    const {id}=req.params;
    // console.log(id)
    // res.send('deleted')
    TodoModel.findByIdAndDelete({_id:id})
    .then(result=>res.json(result))
    .catch(err=>res.json(err))

})



const port=process.env.PORT||3001
const server=app.listen(port,()=>
{
    console.log("Server is running")
})


server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
      console.log(`Port ${port}} is already in use. Please use a different port.`);
      process.exit(1);
    } else {
      console.log('Server error:', error);
    }
});
  