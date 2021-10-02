import React, { useState } from "react";
import { Redirect, Route, Switch } from "react-router";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ExpenseScreen from "../pages/ExpenseScreen";
import HomeScreen from "../pages/HomeScreen";
import IncomeScreen from "../pages/IncomeScreen";
//import TestScreen from "../pages/TestScreen";
import { CategoryFilterContext } from "../contexts/CategoryFilterContext";
import { RefreshContext } from "../contexts/RefreshContext";
import NotFoundScreen from "../pages/NotFoundScreen";
//import ReactAsync from "../pages/ReactAsync";

const AppRouter = () => {
    const [categoryFilter, setCategoryFilter] = useState(null);
    const [refresh, setRefresh] = useState(null);

    return (
        <CategoryFilterContext.Provider
            value={{ categoryFilter, setCategoryFilter }}
        >
            <RefreshContext.Provider value={{ refresh, setRefresh }}>
                <main className="min-vw-100 min-vh-100 d-flex flex-column justify-content-between align-content-center ">
                    <Header />
                    <Switch>
                        <Route exact path="/home" component={HomeScreen} />
                        <Route
                            exact
                            path="/expense"
                            component={ExpenseScreen}
                        />
                        <Route exact path="/income" component={IncomeScreen} />
                        {/* <Route exact path="/test" component={TestScreen} /> */}
                        <Route exact path="/404" component={NotFoundScreen} />
                        <Redirect to="/404" />
                    </Switch>
                    <Footer />
                </main>
            </RefreshContext.Provider>
        </CategoryFilterContext.Provider>
    );
};

export default AppRouter;
