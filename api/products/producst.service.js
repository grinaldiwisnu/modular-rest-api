const pool = require('../../config/connection');

module.exports = {
    create: (data, callback) => {
        pool.query(
            'INSERT INTO products (PRODUCT_NAME, PRODUCT_TYPE, PRODUCT_DESC, PRODUCT_PRICE) VALUES (?, ?, ?, ?)',
            [
                data.name,
                data.type,
                data.desc,
                data.price
            ],
            (err, res) => {
                if (err)
                    return callback(err);
                return callback(null, res);
            }
        )
    },
    read: (data, callback) => {
        pool.query(
            'SELECT * FROM products WHERE PRODUCT_ID = ?',
            [
                data.id
            ],
            (err, res) => {
                if (err)
                    return callback(err);
                return callback(null, res);
            }
        )
    }
}