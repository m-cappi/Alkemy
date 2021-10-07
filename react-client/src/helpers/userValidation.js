import V from "max-validator";

const emailRule = (email) => {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
    )
        ? true
        : "Invalid email format";
};

//const passwordRule = (password) => {return true};
const fullNameRule = (name) => {
    return /[a-z A-Z]{2,45}/.test(name)
        ? true
        : "Invalid name. Must be 2 to 45 characters long. Admits only: ' ', a-Z.";
};

const userSchema = (isRequired = false) => {
    const schema = {
        email: { required: true, mycustom: emailRule },
        password: { required: true, min: 6, max: 40 },
        full_name: { mycustom: fullNameRule },
    };
    if (isRequired) schema.full_name.required = true;
    return schema;
};

export const userValidation = (payload, isRequired = false) => {
    const validation = V.validate(payload, userSchema(isRequired));
    if (validation.hasError) {
        if (validation.errors.email) throw new Error(validation.errors.email);
        if (validation.errors.password) throw new Error(`Invalid password! Must be 6 to 40 characters long`);
        if (validation.errors.full_name) throw new Error(validation.errors.full_name);
        throw new Error(`Validation error!`);
    }

    return validation;
};
