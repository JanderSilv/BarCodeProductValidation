const xlsxToJson = require("xlsx-to-json-lc");
const fs = require("fs");

module.exports = {
    create(req, res, next) {
        const file = req.file;
        const excelToJson = xlsxToJson;
        if (!file) {
            const error = new Error("Please upload a file");
            error.httpStatusCode = 400;
            return next(error);
        }
        console.log(req.file.path);
        try {
            excelToJson(
                {
                    input: req.file.path,
                    output: `./src/Json/${Date.now()}.json`,
                    lowerCaseHeaders: true,
                },
                function (err, result) {
                    if (err) {
                        return res.json({
                            error_code: 1,
                            err_desc: err,
                            data: null,
                        });
                    }
                    try {
                        fs.unlinkSync(req.file.path);
                        res.json({
                            data: result,
                            file: file,
                        });
                    } catch (e) {
                        res.json({
                            err: e,
                        });
                    }
                }
            );
        } catch (e) {
            res.json({ err: e });
        }
    },

    index(req, res) {
        res.sendFile(__dirname + "/index.html");
    },
};
