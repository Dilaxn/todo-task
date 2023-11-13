class ValidationError extends Error {
    public errorCode: string;
    public statusCode: number;

    constructor(message: string) {
        super(message);
        this.errorCode = "ValidationError";
        this.statusCode = 400;
    }
}

export default ValidationError;
