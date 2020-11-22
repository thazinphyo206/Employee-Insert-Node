const express=require('express')
const router=express.Router()
const mongoose=require('mongoose')
const Employee=mongoose.model('Test')
router.get('/',(req,res)=>{
    //res.send('Sample test')
    res.render('employeeView/addOrEdit')
})
router.post('/',(req,res)=>{
    if(req.body._id==''){
        insertRecord(req,res)
    }else{
        updateRecord(req,res)
    }
    
})
function insertRecord(req,res){
    const employee=new Employee()
    employee.fullname=req.body.fullname;
    employee.email=req.body.email;
    employee.mobile=req.body.mobile;
    employee.city=req.body.city;
    employee.save((err)=>{
        if(!err){
            res.redirect('/employee/list')
        }else{
            //console.log(err.name)
            if(err.name="ValidationError"){
                //req.body => data4
                validationerror(err,req.body)
                //req.body => error2 + data4
                res.render('employeeView/addOrEdit',{
                    employee: req.body
                })
            }else{
                console.log('Error in inserting employee ' + err)
            }
        }
    }); 
}
function updateRecord(req,res){
    Employee.findOneAndUpdate({_id:req.body._id},req.body,(err,doc)=>{
        if(!err){
            res.redirect('/employee/list')
        }else{
            console.log('Error in updating employee ' + err)
        }
    })
}
function validationerror(err,body){
    // console.log(err)
    // console.log('********************')
    // console.log(err.errors)
    // console.log('********************')
    for(field in err.errors){
        // console.log(err.errors[field].path)
        // console.log('********************')
        switch(err.errors[field].path){
            case "fullname":
                body["fullnameError"]=err.errors[field].message
                break;
            case "email":
                body["emailError"]=err.errors[field].message
                break;
            default:
                break
        }
    }
}
router.get('/list',(req,res)=>{
    Employee.find((err,doc)=>{
        if(!err){
            //console.log(doc)
            res.render('employeeView/list',{
                list:doc
            })
        }else{
            console.log('Error in retrieving employees ' + err);
        }
    })
})

router.get('/:id',(req,res)=>{
    Employee.findById(req.params.id,(err,doc)=>{
        if(!err){
            res.render('employeeView/addOrEdit',{
                employee:doc
            })
        }else{
            console.log('Error in finding employee ' + err)
        }
    })
})

router.get('/delete/:id',(req,res)=>{
    Employee.findByIdAndDelete(req.params.id,(err,doc)=>{
        if(!err){
            res.redirect('/employee/list')
        }else{
            console.log('Error in deleting employee ' + err)
        }
    })
})
module.exports=router