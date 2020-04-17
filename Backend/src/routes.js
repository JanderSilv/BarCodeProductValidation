const express = require("express");
const routes = express.Router();

const ExcelUploadController = require("./controllers/ExcelUploadController/index");
const ExcelUpload = require("./controllers/ExcelUploadController/ExcelUpload");

const ShipmentController = require("./controllers/ShipmentController");

routes.post(
    "/upload",
    ExcelUpload.single("file"),
    ExcelUploadController.create
);
routes.get("/indexExcel", ExcelUploadController.index);

routes.get("/shipments", ShipmentController.index);

module.exports = routes;
