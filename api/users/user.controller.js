const { create, findUser, findUserByEmail } = require('./user.service');
const { genSaltSync, hashSync, compareSync } = require('bcrypt');
const { sign } = require('jsonwebtoken');
module.exports = {
    createUser: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);

        create(body, (error, result) => {
            if (error) {
                console.log(error);
                return res.json({
                    success: false,
                    data: null,
                    message: error
                });
            }
            return res.json({
                success: true,
                data: result,
                message: "Success generate user"
            });
        })
    },
    searchUser: (req, res) => {
        const body = req.params;

        findUser(body, (error, result) => {
            if (error) {
                console.log(error);
                return res.json({
                    success: false,
                    data: null,
                    message: error
                });
            }
            return res.json({
                success: true,
                data: result[0],
                message: "Success get user by Email"
            });
        })
    },
    login: (req, res) => {
        const body = req.body;
        findUserByEmail(body, (error, result) => {
            if (error) {
                res.json({
                    success: false,
                    data: null,
                    message: err
                });
            }
            if (!result) {
                res.json({
                    success: false,
                    data: null,
                    message: "Invalid email or password"
                });
            }

            const results = compareSync(body.password, result.PASSWORD);
            if (!results) {
                res.json({
                    success: false,
                    data: null,
                    message: "Invalid password"
                });
            } else {
                result.PASSWORD = undefined;
                const token = sign({ result: result }, process.env.JWT_TOKEN, {
                    expiresIn: "1h"
                });

                return res.json({
                    success: true,
                    data: token,
                    message: "Login success"
                });
            }
        })
    }
}