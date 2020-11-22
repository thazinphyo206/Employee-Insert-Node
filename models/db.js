const mongoose=require('mongoose')
const url='mongodb+srv://root:123@cluster0.oey5r.mongodb.net/RoyalDB?retryWrites=true&w=majority'
mongoose.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true },(err)=>{
    if(!err){
        console.log('Mongodb connection success.')
    }else{
        console.log('Error in Mongodb connecting.')
    }
})
require('./employee.model')