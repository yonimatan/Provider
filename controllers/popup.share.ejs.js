module.exports = function (req,res){
    const {id,type} = req.params; //grabs the var from the url
    res.render('share_popup', {id,type});
}