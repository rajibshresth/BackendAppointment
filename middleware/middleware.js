const auth=function(req,res,next){
    console.log("this is middleware");

next();
}

module.exports=auth;