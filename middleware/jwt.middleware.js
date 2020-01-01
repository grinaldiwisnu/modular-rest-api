const jwt = require('jsonwebtoken');

module.exports = {
    checkToken: (req, res, next) => {
        let token = req.get('authorization');
        if (!token) {
            res.json({
                success: false,
                data: null,
                message: "Access denied! Bearer token doesn't exist"
            });
        } else {
            token = token.slice(7);
            jwt.verify(token, process.env.JWT_TOKEN, (err, decoded) => {
                if (err) {
                    return res.json({
                        success: false,
                        data: null,
                        message: "Invalid token ..."
                    });
                } else {
                    console.log(decoded);
                    req.decoded = decoded;
                    next();
                }
            })
        }
    }
}