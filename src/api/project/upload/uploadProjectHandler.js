const autoBind = require("auto-bind").default;


class UploadprojectHandler {
    constructor(uploadProjectService, uploadProjectValidator) {
        this._uploadProjectService = uploadProjectService;
        this._uploadProjectValidator = uploadProjectValidator;

        autoBind(this);
    }

    async postUploadProjectHandler(req, res) {
        try {
            const coverImageUrl = req.file ? `/uploads/${req.file.filename}` : null;
            
            console.log(req.file ? { message: `Uploaded file: ${req.file.filename}` } : { message: "No file uploaded" });

            if (!coverImageUrl) {
                return res.status(400).json({
                    status: "fail",
                    message: "No file uploaded",
                });
            }

            res.status(200).json({
                status: "success",
                message: "Cover image uploaded successfully",
                data: {
                    coverImageUrl,
                    filename: req.file.filename,
                },
            });

        }catch (error) {
            res.status(400).json({
                status: "fail",
                message: error.message,
            });
        }
    }
}

module.exports = { UploadprojectHandler };