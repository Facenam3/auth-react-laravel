export function validateLogin(data) {
    const errors = {};

    if (!data.email || data.email.trim() === "") {
        errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
        errors.email = "Invalid email format.";
    }

    if(!data.password || data.password.trim() === "") {
        errors.password = "Password is required.";
    } else if (data.password.length < 6) {
        errors.password = "Password must be at least 6 characters.";
    };

    return errors;
}