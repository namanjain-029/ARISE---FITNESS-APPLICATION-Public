// validators.js - Client side validation rules for react-hook-form

export const emailValidation = {
    required: 'Email is required',
    pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: 'Invalid email address',
    },
};

export const passwordValidation = {
    required: 'Password is required',
    minLength: {
        value: 6,
        message: 'Password must be at least 6 characters',
    },
};

export const nameValidation = {
    required: 'Name is required',
    minLength: {
        value: 2,
        message: 'Name must be at least 2 characters',
    },
};

export const ageValidation = {
    required: 'Age is required',
    min: { value: 10, message: 'Minimum age is 10' },
    max: { value: 100, message: 'Maximum age is 100' },
    valueAsNumber: true,
};

export const weightValidation = {
    required: 'Weight is required',
    min: { value: 1, message: 'Weight must be positive' },
    valueAsNumber: true,
};

export const heightValidation = {
    required: 'Height is required',
    min: { value: 1, message: 'Height must be positive' },
    valueAsNumber: true,
};
