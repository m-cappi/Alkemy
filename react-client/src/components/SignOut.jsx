import React from "react";
import { UserSession } from "../helpers/userSession.js";

const SignOut = () => {
    const {logOut} = UserSession()
    const handleSignOut = () => {
        logOut();
        return;
    };

    return (
        <>
            <button
                className="btn btn-outline-danger btn-sm"
                onClick={handleSignOut}
            >
                SignOut
            </button>
        </>
    );
};

export default SignOut;
