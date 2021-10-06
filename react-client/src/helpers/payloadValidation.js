import V from "max-validator";

const transactionSchema = (isRequired = false) => {
    const required = isRequired ? "required|" : "";
    const schema = {
        creation_date: `${required}date`,
        concept: {
            mycustom: function (value) {
                return /^[\w][\w ]{1,43}[\w]$/m.test(value)
                    ? true
                    : "Concept is invalid. Admits only(3-45): a-Z,0-9, ,_";
            },
        },
        amount: `${required}numeric`,
        fk_category: `${required}numeric`,
        fk_type: `${required}numeric`,
    };

    if (isRequired) schema.concept.required = true;

    return schema;
};

export const validateTransaction = (payload, isRequired = false) => {
    const validation = V.validate(payload, transactionSchema(isRequired));
    if (validation.hasError) {
        console.log("Validation error: ", validation.errors.concept[0]);
        throw new Error(`Validation error: ${validation.errors.concept[0]}`);
    }

    return validation;
};
