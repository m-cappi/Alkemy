import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import AppRouter from "./AppRouter";
import AuthRouter from "./AuthRouter";
import { useCookies } from "react-cookie";

const IndexRouter = () => {
    const [cookies, setCookie] = useCookies(["auth"]);
    const auth = cookies.auth || 0;
    //console.log("auth en Index Router es:", auth);

    return (
        <>
            <Router>
                <Switch>
                    <Route
                        path="/auth"
                        component={(props) =>
                            auth == 0 ? (
                                <AuthRouter {...props} />
                            ) : (
                                <Redirect to="/home" />
                            )
                        }
                    />
                    <Route
                        path="/"
                        component={(props) =>
                            auth == 1 ? (
                                <AppRouter {...props} />
                            ) : (
                                <Redirect to="/auth/signin" />
                            )
                        }
                    />
                </Switch>
            </Router>
        </>
    );
};

export default IndexRouter;
