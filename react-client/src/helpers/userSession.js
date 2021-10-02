//import React from "react";
import { useCookies } from "react-cookie";
//import { UserSession } from "../helpers/userSession.js";

export const UserSession = () => {
    const [cookies, setCookie] = useCookies([]);
    
    const logIn = (user, password) => {
        if (user && password) {
            //set usuario previo al auth xq me saca
            setCookie("auth", 1, { path: "/" });
        }
        return;
    };

    const logOut = () => {
        setCookie("auth", 0, { path: "/" });
        return;
    };
    return {logIn, logOut };
};

