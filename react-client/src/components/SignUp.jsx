import React, { useRef, useState } from "react";
import { UserSession } from "../helpers/userSession.js";

const SignUp = () => {
    const name = useRef(null);
    const email = useRef(null);
    const password = useRef(null);
    const [error, setError] = useState(null);

    const { register } = UserSession();

    const handleSignUp = (e) => {
        e.preventDefault();
        register(
            email.current.value,
            password.current.value,
            name.current.value
        )
            .then(() => {
                setError(null);
            })
            .catch((err) => {
                setError(true);
            });
        return;
    };

    return (
        <div className="d-flex flex-column align-items-center p-5">
            {error && (
                <div className="alert alert-danger" role="alert">
                    Registration invalid!
                </div>
            )}
            <form onSubmit={handleSignUp}>
                <div>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">
                            Full Name{" "}
                        </label>
                        <input
                            ref={name}
                            type="text"
                            className="form-control"
                            id="name"
                            aria-describedby="full name"
                        />
                    </div>
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

                <button className="btn btn-info">SignUp</button>
            </form>
        </div>
    );
};

export default SignUp;
