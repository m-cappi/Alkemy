import React, { useRef, useState } from "react";
import { UserSession } from "../helpers/userSession.js";
import ErrorWarning from "./ErrorWarning.jsx";

const SignUp = () => {
    const name = useRef(null);
    const email = useRef(null);
    const password = useRef(null);
    const passwordConfirmation = useRef(null);
    const [error, setError] = useState(null);

    const { register } = UserSession();

    const handleSignUp = (e) => {
        e.preventDefault();
        if (password.current.value !== passwordConfirmation.current.value){
            setError({message:"Passwords do not match!"})
            return
        }
        register(
            email.current.value,
            password.current.value,
            name.current.value
        )
            .then(() => {
                setError(null);
            })
            .catch((err) => {
                setError(err);
            });
        return;
    };

    return (
        <div className="d-flex flex-column align-items-center p-5">
            <ErrorWarning error={error} />
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
                            required
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
                            required
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
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label
                            htmlFor="passwordConfirmation"
                            className="form-label"
                        >
                            Password Confirmation
                        </label>
                        <input
                            ref={passwordConfirmation}
                            type="password"
                            className="form-control"
                            id="passwordConfirmation"
                            required
                        />
                    </div>
                </div>

                <button className="btn btn-info">SignUp</button>
            </form>
        </div>
    );
};

export default SignUp;
