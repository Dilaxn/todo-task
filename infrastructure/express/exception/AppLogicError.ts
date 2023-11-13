class AppLogicError extends Error {
    public errorCode: string;
    public statusCode: number;

    constructor(errorCode: string, message: string, statusCode: number) {
        super(message);
        this.errorCode = errorCode;
        this.statusCode = statusCode;
    }
}

export default AppLogicError;
