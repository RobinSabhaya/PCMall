const logoutController = () =>{
    return{
        async postLogout(req,res){
                if(req.user){
                    try {
                        req.logout((err)=>{
                            console.log(err);
                            return res.redirect('/login')
                        })
                    } catch (error) {
                        console.log(error)
                    }
                }
                else{
                    try {
                        res.clearCookie('login');
                        res.status(301).redirect('/login');
                    } catch (error) {
                        res.status(400).json({'status' : error , 'code' : 400})
                    }
                }
            }
    }
}

module.exports = logoutController;