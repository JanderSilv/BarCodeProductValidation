const fs = require("fs");
const path = "./src/Json/Data.json";

module.exports = {
    index(req, res) {
        const json = fs.readFileSync(path);
        const data = JSON.parse(json);
        res.json(data);
    },

    remove(req, res) {
        const { deliveryNo } = req.query;
        const data = fs.readFileSync(path);
        let json = JSON.parse(data);
        json = json.map((shipments) => {
            return shipments.filter((delivery) => {
                return delivery["delivery no."] !== deliveryNo;
            });
        });
        fs.writeFileSync(path, JSON.stringify(json, null, 2));
        res.json(json);
    },
};
