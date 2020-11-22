require('./models/db')
const employeeController=require('./controllers/employeeController')
const express=require('express')
const app=express()

const bodyParser=require('body-parser')
app.use(bodyParser.urlencoded({
    extended:true
}))
app.use(bodyParser.json())

const path=require('path')
const exphbs=require('express-handlebars')
app.set('view engine','hbs')
app.set('views', path.join(__dirname,'/views/'))
app.engine('hbs',exphbs({
    extname:'hbs',
    defaultLayout:'mainLayout.hbs',
    layoutsDir:__dirname+'/views/layouts/',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
    }
}))

app.listen(5000,(err)=>{
    if(!err){
        console.log('Server is started at Port 5000.')
    }else{
        console.log('Server running error ' + err)
    }
})
app.use('/employee',employeeController)