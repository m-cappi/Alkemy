import React from "react";
import { Redirect, Route, Switch } from "react-router";
import AuthHeader from "../components/AuthHeader";
import Footer from "../components/Footer";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
//import TestLogin from "../pages/TestLogin";

const AuthRouter = () => {
    return (
        <main className="min-vw-100 min-vh-100 d-flex flex-column justify-content-between align-content-center  ">
            <AuthHeader />
            <Switch>
                <Route exact path="/auth/signin" component={SignIn} />
                <Route exact path="/auth/signup" component={SignUp} />
                {/* <Route exact path="/auth/test" component={TestLogin} /> */}
                <Redirect to="/auth/signin" />
            </Switch>
            <Footer />
        </main>
    );
};

export default AuthRouter;
