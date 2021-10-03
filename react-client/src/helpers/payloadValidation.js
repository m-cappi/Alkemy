import V from "max-validator";

const transactionSchema = (isRequired = false) => {
    const required = isRequired ? "required |" : "";
    if (isRequired)
        return {
            creation_date: `${required}date`,
            concept: {
                required: true,
                mycustom: function (value) {
                    return /^[\w][\w ]{1,43}[\w]$/m.test(value)
                        ? true
                        : "Concept is invalid. Admits only(45): a-Z,0-9, ,_";
                },
            },
            amount: `${required}number`,
            fk_category: `${required}number`,
            fk_type: `${required}number`,
        };
    return {
        creation_date: `${required}date`,
        concept: {
            mycustom: function (value) {
                return /^[\w][\w ]{1,43}[\w]$/m.test(value)
                    ? true
                    : "Concept is invalid. Admits only(45): a-Z,0-9, ,_";
            },
        },
        amount: `${required}number`,
        fk_category: `${required}number`,
        fk_type: `${required}number`,
    };
};

export const validateTransaction = (payload, isRequired = false) => {
    return V.validate(payload, transactionSchema(isRequired));
};
