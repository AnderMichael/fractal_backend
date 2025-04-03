export interface SuccessResponse<T> {
    success: true;
    data: T;
    message?: string;
}

export const successResponse = <T>(data: T, message?: string): SuccessResponse<T> => ({
    success: true,
    data,
    message,
});
