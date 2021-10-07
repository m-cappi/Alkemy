import connection from "../database/connection";
import { useCookies } from "react-cookie";
import { userValidation } from "./userValidation";
//import { UserSession } from "../helpers/userSession.js";

export const UserSession = () => {
    const [, setCookie] = useCookies([]);

    //maxAge : 24hs
    const cookieParams = { path: "/", maxAge: 60 * 60 * 24, sameSite: "lax" };

    const registerCookies = (params) => {
        const { token, email, name, is_admin } = params;
        setCookie("token", token, cookieParams);
        setCookie("email", email, cookieParams);
        setCookie("name", name, cookieParams);
        setCookie("is_admin", is_admin, cookieParams);
        if (token) setCookie("auth", 1, cookieParams);
        return;
    };

    const unregisterCookies = () => {
        //??
        setCookie("token", null, cookieParams);
        setCookie("name", null, cookieParams);
        setCookie("email", null, cookieParams);
        setCookie("is_admin", null, cookieParams);
        setCookie("auth", 0, cookieParams);
        return;
    };

    const logIn = async (email, password) => {
        const body = { data: { email: email, password: password } };
        userValidation(body.data)
        const res = await connection.post("auth/login", body);
        if (!res.success) {
            console.log(res);
            throw new Error(res.message);
        } //else console.log(res);
        registerCookies(res.data);
        return res;
    };

    const logOut = () => {
        unregisterCookies();
        return;
    };

    const register = async (email, password, name) => {
        const body = {
            data: { email: email, password: password, full_name: name },
        };
        userValidation(body.data, true)
        const res = await connection.post("auth/register", body);
        if (!res.success) {
            console.log(res);
            throw new Error(res.message);
        } //else console.log(res);
        registerCookies(res.data);
        return res;
    };

    return { logIn, logOut, register };
};
