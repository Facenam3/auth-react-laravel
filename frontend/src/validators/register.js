export function validateRegister(data) {
    const errors = {};

    if(!data.name || data.name.trim() == "") {
        errors.name = "Name is required.";
    };

    if (!data.email || data.email.trim() === "") {
        errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
        errors.email = "Invalid email format.";
    };

    if(!data.password || data.password.trim() === "") {
        errors.password = "Password is required.";
    } else if (data.password.length < 6) {
        errors.password = "Password must be at least 6 characters.";
    };

    if(!data.country ) {
        errors.country = "Please select a country.";
    };

    if(!data.adress || data.adress.trim() == "") {
        errors.adress = "Please add your adress/city.";
    };

    if(!data.phone || data.phone.trim() == "") {
        errors.phone = "Please add your phone.";
    };

    if(!data.gender ) {
        errors.gender = "Please select a gender.";
    };

    return errors;
}