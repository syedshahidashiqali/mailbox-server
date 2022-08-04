export const apiSuccessWithData = (message, data) => {
    const res = {
        status: true,
        message: message,
        detail: data,
    };
    return res;
}

export const apiSuccess = (message) => {

    const res = {
        status: true,
        message: message,
    };
    return res;
}

export const apiError = (message) => {
    const res = {
        status: false,
        message: message,
    };
    return res;
}

export const apiValidationErrors = (errors) => {
        const res = {
            status: false,
            message: 'Validation errors',
            details: errors,
        };        
    return res; 
}