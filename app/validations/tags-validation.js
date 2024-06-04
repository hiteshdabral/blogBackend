

const tagsValidation={
    name:{
        in:['body'],
        exists:{
            errorMessage:' name is required'
        },
        notEmpty:{
            errorMessage:"name cannot be empty"
        },
        trim :true
    },
    description:{
        in:['body'],
        exists:{
            errorMessage:' description is required'
        },
        notEmpty:{
            errorMessage:"description cannot be empty"
        },
        trim :true
    },
}


module.exports=tagsValidation