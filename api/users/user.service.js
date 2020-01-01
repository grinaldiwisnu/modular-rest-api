const pool = require('../../config/connection');

module.exports = {
    create: (data, callback) => {
        pool.query(
            `INSERT INTO users (NAME, USERNAME, EMAIL, PASSWORD, PHONE) VALUES (?,?,?,?,?)`,
            [
                data.fullname,
                data.username,
                data.email,
                data.password,
                data.phone_number
            ],
            (err, res, field) => {
                if (err)
                    return callback(err);
                return callback(null, res);
            }
        )
    },
    findUser: (data, callback) => {
        pool.query(
            `SELECT ID, NAME, USERNAME, EMAIL, PHONE FROM users WHERE EMAIL = ? ORDER BY ID LIMIT 1`,
            [
                data.email
            ],
            (err, res) => {
                if (err)
                    return callback(err);
                return callback(null, res);
            }
        )
    },
    findUserByEmail: (data, callback) => {
        pool.query(
            `SELECT * FROM users WHERE EMAIL = ?`,
            [
                data.email
            ],
            (err, res) => {
                if (err)
                    return callback(err);
                return callback(null, res[0]);
            }
        )
    }
}