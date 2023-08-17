const logoutController = () =>{
    return{
        async postLogout(req,res){
                try {
                    res.clearCookie('login');
                    res.status(301).redirect('/login');
                } catch (error) {
                    res.status(400).json({'status' : error , 'code' : 400})
                }
            }
    }
}

module.exports = logoutController;