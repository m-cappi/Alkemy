import React from "react";
import { UserSession } from "../helpers/userSession.js";

const SignOut = () => {
    const {logOut} = UserSession()

    const handleSignOut = () => {
        console.log("tocaste sign out");
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
