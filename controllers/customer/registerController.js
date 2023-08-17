const bcrypt = require('bcryptjs');
const registerModel = require('../../db/models/registerSchema');
const registerController = () =>{
    return {
        getRegister(req,res){
            return  res.status(200).render("Register_Page");
        },
        async postRegister(req,res){
          const {name,email,password,cpassword} = req.body;
                try {
                  if (cpassword === password) {
                    const hashPassword = await bcrypt.hash(password,10);
                    const registerData = new registerModel({
                      name : name,
                      email : email,
                      password : hashPassword,
                    });
                    // const token = await Web14data.jwtoken();
                    // res.cookie("register", token);
                    // Web14data.save().then(() => {
                    //   res.status(200).json({ status: "sucess", code: "200" });
                    // });
                    await registerData.save();
                    return res.status(302).redirect('/');
                  } 
                } catch (error) {
                 return  res.send(error.message);
                }
              }
        }
    }

module.exports = registerController;