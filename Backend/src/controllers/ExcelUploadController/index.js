const xlsxToJson = require("xlsx-to-json-lc");
const fs = require("fs");

function DeleteSumManifest(json) {
    // const path = "./src/Json/Data.json";
    // const data = fs.readFileSync(path);
    // let json = JSON.parse(data);
    json = json.filter((delivery) => {
        return delivery["manifest no."] !== "Manifest Sum";
    });
    return json;
    // fs.writeFileSync(path, JSON.stringify(json, null, 2));
}

function StoreDataInDataJson(json) {
    const path = "./src/Json/Data.json";
    fs.readFile(path, "utf-8", function (err, data) {
        if (err) throw err;
        const arrayOfObjects = JSON.parse(data);
        arrayOfObjects.push(json);
        fs.writeFile(
            path,
            JSON.stringify(arrayOfObjects, null, 2),
            "utf-8",
            function (err) {
                if (err) throw err;
                console.log("Done!");
            }
        );
    });
}

module.exports = {
    create(req, res, next) {
        const file = req.file;
        const excelToJson = xlsxToJson;
        if (!file) {
            const error = new Error("Please upload a file");
            error.httpStatusCode = 400;
            return next(error);
        }
        // console.log(req.file.path);
        try {
            excelToJson(
                {
                    input: req.file.path,
                    output: null, //`./src/Json/${Date.now()}.json`,
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
                        result = DeleteSumManifest(result);
                        StoreDataInDataJson(result);
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
