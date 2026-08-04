class ApiError extends Error {
    constructor(message, statusCode,

         message = "something went wrong",
        error = [],
        statck = ""

    ) {
        super(message);
        this.statusCode = statusCode;
        this.data = null
        this.message = message;
        this.success = false;
        this.error = error;
        
        if (stack){
            this.stack = statck;
        } else{
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export default ApiError;
