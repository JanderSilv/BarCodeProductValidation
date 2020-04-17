const express = require("express");
const routes = express.Router();

const ExcelUploadController = require("./controllers/ExcelUploadController/index");
const ExcelUpload = require("./controllers/ExcelUploadController/ExcelUpload");

routes.post(
    "/upload",
    ExcelUpload.single("file"),
    ExcelUploadController.create
);
routes.get("/indexExcel", ExcelUploadController.index);

module.exports = routes;
