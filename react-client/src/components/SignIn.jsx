import React, { useRef } from "react";
import { UserSession } from "../helpers/userSession.js";

const SignIn = () => {
    const email = useRef(null);
    const password = useRef(null);

    const {logIn} = UserSession()

    const handleSignIn = (e) => {
        e.preventDefault();
        logIn(email.current.value, password.current.value);
        return;
    };

    return (
        <div className="d-flex flex-column align-items-center p-5">
            <form onSubmit={handleSignIn}>
                <div>
                    <div className="mb-3">
                        <label
                            htmlFor="exampleInputEmail1"
                            className="form-label"
                        >
                            Email address
                        </label>
                        <input
                            ref={email}
                            type="email"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                        />
                        <div id="emailHelp" className="form-text">
                            We'll never share your email with anyone else.
                        </div>
                    </div>
                    <div className="mb-3">
                        <label
                            htmlFor="exampleInputPassword1"
                            className="form-label"
                        >
                            Password
                        </label>
                        <input
                            ref={password}
                            type="password"
                            className="form-control"
                            id="exampleInputPassword1"
                        />
                    </div>
                </div>

                <button className="btn btn-outline-success">SignIn</button>
            </form>
        </div>
    );
};

export default SignIn;
