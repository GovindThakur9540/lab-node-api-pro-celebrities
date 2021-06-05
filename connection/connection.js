const mongoose = require('mongoose')

//connect to cluster
mongoose.connect('mongodb+srv://System:root@cluster0.8fc7b.mongodb.net/ProCeleb?retryWrites=true&w=majority', 
{
    useNewUrlParser :true,
    useUnifiedTopology : true,
    useFindAndModify : false 
})
.then(ok => console.log("connected to mongodb"))
.catch(err => console.log("mongodb connection error",err))

module.exports = mongoose