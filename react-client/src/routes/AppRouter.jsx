import React from "react";
import { Redirect, Route, Switch } from "react-router";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ExpenseScreen from "../pages/ExpenseScreen";
import HomeScreen from "../pages/HomeScreen";
import IncomeScreen from "../pages/IncomeScreen";

const AppRouter = () => {
    return (
        <div className="min-vw-100 min-vh-100 d-flex flex-column justify-content-between align-content-center  ">
            <Header />
            <Switch>
                <Route exact path="/home" component={HomeScreen} />
                <Route exact path="/expense" component={ExpenseScreen} />
                <Route exact path="/income" component={IncomeScreen} />
                <Redirect to="/home" />
            </Switch>
            <Footer />
        </div>
    );
};

export default AppRouter;
