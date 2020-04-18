const fs = require("fs");

function readFiles(dirname, onFileContent, onError) {
    fs.readdir(dirname, function (err, filenames) {
        if (err) {
            onError(err);
            return;
        }
        filenames.forEach(function (filename) {
            fs.readFile(dirname + filename, "utf-8", function (err, content) {
                if (err) {
                    onError(err);
                    return;
                }
                onFileContent(filename, content);
            });
        });
    });
}

module.exports = {
    index(req, res) {
        let data = {};
        readFiles(
            "src/Json/",
            function (filename, content) {
                data[filename] = JSON.parse(content);
                res.json(data[filename]);
            },
            function (err) {
                throw err;
            }
        );
    },
};