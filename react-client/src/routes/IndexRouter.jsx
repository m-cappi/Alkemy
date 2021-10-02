import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import AppRouter from './AppRouter'

const IndexRouter = () => {
    
    //PublicRouter & PrivateRouter here!
    return (
        <>
        <Router>
            <Switch>
                {/* PublicRouter -> AuthRouter */}
                {/* PrivateRouter -> AppRouter */}
                <Route path="/"  component={AppRouter}/>
            </Switch>
        </Router>
        </>
    )
}

export default IndexRouter
