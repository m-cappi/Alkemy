import connection from "../database/connection";
import { validateTransaction } from "./payloadValidation";
import { getAuthorizationHeader } from "./getAuthorizationHeader";
//import {} from "../helpers/CRUD";
//import { Cookies } from "react-cookie";

// const getToken = () => {
//     const cookie = new Cookies();
//     const token = cookie.get("token");
//     return token && { Authorization: `Bearer ${token}` };
// };

// const getAuthorizationHeader = () => {
//     const token = getToken();
//     const authorization = token ? token : {};
//     console.log("authorization: ", authorization);
//     return authorization;
// };

export const editTransaction = async (payload) => {
    //console.log("Corriendo editTransaction");
    // const validation = validateTransaction(payload, false);
    // if (validation.hasError) {
    //     console.log(validation.errors.concept[0]);
    //     throw new Error(validation.errors.concept[0]);
    // }
    // const token = getToken();
    // const headers = token ? token : {};
    // console.log("headers: ",headers);
    // return await connection.put("transaction", { data: payload }, headers);
    validateTransaction(payload, false);
    const headers = getAuthorizationHeader();
    return await connection.put("transaction", { data: payload }, headers);
};

export const deleteTransaction = async (payload) => {
    // const token = getToken();
    // const headers = token ? token : {};
    const headers = getAuthorizationHeader();
    return await connection.delete("transaction", { data: payload }, headers);
};

export const submitTransaction = async (payload) => {
    //const validation = validateTransaction(payload, true);
    // if (validation.hasError) {
    //     console.log(validation.errors.concept[0]);
    //     throw new Error(validation.errors.concept[0]);
    // }
    // const token = getToken();
    // const headers = token ? token : {};
    validateTransaction(payload, true);
    const headers = getAuthorizationHeader();
    return await connection.post("transaction", { data: payload }, headers);
};

export const loadBalance = async () => {
    // const token = getToken();
    // const headers = token ? token : {};
    const headers = getAuthorizationHeader();
    return await connection.get("view/balance", headers);
};

export const loadCategories = async () => {
    // const token = getToken();
    // const headers = token ? token : {};
    const headers = getAuthorizationHeader();
    return await connection.get("category", headers);
};

export const loadExpense = async ({ endpoint }) => {
    // const token = getToken();
    // const headers = token ? token : {};
    const headers = getAuthorizationHeader();
    return await connection.get(endpoint, headers);
};

export const loadIncome = async ({ endpoint }) => {
    // const token = getToken();
    // const headers = token ? token : {};
    const headers = getAuthorizationHeader();
    return await connection.get(endpoint, headers); //endpoint
};

export const loadTable = async () => {
    // const token = getToken();
    // const headers = token ? token : {};
    const headers = getAuthorizationHeader();
    return await connection.get("view/last10", headers);
};
