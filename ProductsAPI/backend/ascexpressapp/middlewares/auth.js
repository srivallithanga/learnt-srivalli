const jwt = require("jsonwebtoken");
module.exports = function(req, res, next){
    const token = req.header("token");
    if(!token) return res.status(401)
        .json({message: "Token not received"});
    try{
        const decodedToken = jwt.verify(token, "ascendion_secret");
        console.log(decodedToken);
        req.id = decodedToken.user.id;
        req.email = decodedToken.user.email;
        next();
    }
    catch(e){
        console.error(e);
        res.status(500)
        .send({message: `Token Not Valid: ${e.toString()}`});
    }
};