

const commentValidation={
    content:{
        in: ['body'],
        exists: {
            errorMessage: 'content  is required'
        },
        notEmpty: {
            errorMessage: 'content cannot be empty'
        },
        trim: true 
    }
}



module.exports=commentValidation