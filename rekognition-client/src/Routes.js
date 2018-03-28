import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Search from "./containers/Search"
const router = ({ childProps }) => { return (
        <Switch>
            <Route path="/" exact component={Home} props={childProps} />
            <Route path="/Search" exact component={Search} props={childProps} />
                        { /* Finally, catch all unmatched routes */ }
            <Route component={NotFound} />
        </Switch>
    );
}

export default router;