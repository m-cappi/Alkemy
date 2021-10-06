import V from "max-validator";

const numberRule = (value) => {
    if (value && !Number(value)) {
        return "Inappropriate value";
    }
    return true;
};

const conceptRule = (value) => {
    return /^[\w][\w ]{1,43}[\w]$/m.test(value)
        ? true
        : "Concept is invalid. Admits only(3-45): a-Z,0-9, ,_";
};

const transactionSchema = (isRequired = false) => {
    const required = isRequired ? "required|" : "";
    const schema = {
        creation_date: `${required}date`,
        concept: {
            mycustom: conceptRule,
        },
        amount: { mycustom: numberRule },
        fk_category: { mycustom: numberRule },
        fk_type: { mycustom: numberRule },
    };

    if (isRequired) {
        schema.creation_date.required = true;
        schema.concept.required = true;
        schema.amount.required = true;
        schema.fk_category.required = true;
        schema.fk_type.required = true;
    }

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
