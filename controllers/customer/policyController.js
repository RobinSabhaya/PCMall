const policyController = () =>{
    return {
        term(req,res){
            res.status(200).render("Tc_Page");
        },
        support(req,res){
            res.status(200).render("Support_Page");
        },
        privacy(req,res){
            res.status(200).render("Privacy_Page");
        },
        return(req,res){
            res.status(200).render("Return_Page");
        },

    }
}

module.exports = policyController;