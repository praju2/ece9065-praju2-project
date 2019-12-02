const User = require('../models/user.model');


exports.modify_user = function (req, res, next) {
    User.findById(req.body.user_id, function (err, user) {
        if (err) {
            return next(err);
        } else {
            if (user != undefined) {
                if (req.body.role != undefined) { user.role = req.body.role; }
                if (req.body.active != undefined) { user.active = req.body.active; }


                user.save(function (err, user) {
                    if (err) {
                        return next(err);
                    } else {
                        res.send('User modified successfully');
                    }
                });
            }
            else {
                res.send('User not found');
            }
        }
    });
};

