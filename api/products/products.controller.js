const { create, read } = require('./producst.service');

module.exports = {
    createProduct: (req, res) => {
        const body = req.body;
        create(body, (error, result) => {
            if (error) {
                res.json({
                    success: false,
                    data: null,
                    message: error
                });
            } else {
                res.json({
                    success: true,
                    data: result,
                    message: "Success create product"
                });
            }
        })
    },
    getProduct: (req, res) => {
        const body = req.params;
        read(body, (error, result) => {
            if (error) {
                res.json({
                    success: false,
                    data: null,
                    message: error
                });
            } else {
                res.json({
                    success: true,
                    data: result,
                    message: "Success get product"
                });
            }
        });
    }
}