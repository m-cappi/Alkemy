const notFound = async (req, res, next) => {
    const error = new Error(`Not Found ${req.originalUrl}`);
    res.status(404);
    next(error);
};

const errorHandler = (err, req, res, next) => {
    try {
        console.log("llegue al errorHandler. El error.msg fue:", err.message)
        const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
        res.status(statusCode).json({ success: false, message: err.message });
        return;
    } catch (error) {
        console.log(error);
    }
};

module.exports = { notFound, errorHandler };
