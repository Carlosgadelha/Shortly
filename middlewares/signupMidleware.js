import joi from "joi";

export default function validateSinup(req, res, next){

    const userSchema = joi.object({
    
        email: joi.string().required().email(),
        password: joi.string().min(4).required(),

    });

    const {error} = userSchema.validate(req.body,{abortEarly: false});
    if(error)  return res.status(404).send(error.details.map( detail => detail.message));

    next();
}