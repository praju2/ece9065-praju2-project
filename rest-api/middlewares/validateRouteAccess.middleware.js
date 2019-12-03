exports.minPermLvlRqd = (rqd_prm_lvl) => {
    return (req, res, next) => {
           if(req.user.role===rqd_prm_lvl || req.user.role==='admin')
            {
                return next();
            }
            else{
                return res.status(403).send('User does not have access to the path!');
            }       
 
    };
 };