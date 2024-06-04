

const postValidation={

title:{
    in: ['body'],
    exists: {
        errorMessage: 'content  is required'
    },
    notEmpty: {
        errorMessage: 'content cannot be empty'
    },
    trim: true 
},
content:{
    in: ['body'],
    exists: {
        errorMessage: 'content  is required'
    },
    notEmpty: {
        errorMessage: 'content cannot be empty'
    },
    trim: true 
},
tags:{
    exists:{
errorMessage:'tags required'
    },
    trim:true,
    notEmpty:{
        errorMessage:'skills cannot be empty'
    },
    custom:{
        options:function(value){
            if(!Array.isArray(value)){
                throw new Error("should be at least one tag")
            }
            if(value.length==0){
                throw new Error('should consist of at least one skill')
            }
            return true
        }
    }
}

}


module.exports=postValidation