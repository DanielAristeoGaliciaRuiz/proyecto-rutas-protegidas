const checkUsersCredentials=require('./auth.controllers')
const response=require('../utils/responses.handler')
const jwt=require('jsonwebtoken')

const postLogin=(req,res)=>{

    const {email,password}=req.body
    checkUsersCredentials(email,password)
    .then(data=>{
        if(data){

            const token=jwt.sing({
                id:data.id,
                email:data.email,
                firstName:data.firstName
            }, 'academlo',{
                expiresIn: '1d'
            })
            
            response.success({
                res,
                status:200,
                message:'Correct Credentials',
                data: token
            })
        }else{
            response.error({
                res,
                status:401,
                message:'Invalid Credentials'
            })
        }
    })
    .catch(err=>{
        response.error({
            res,
            status:400,
            message:'Something wrong'
        })
    })
}

module.exports=postLogin