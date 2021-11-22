import React from 'react';

import { Switch, Route } from "react-router-dom";
import { Home, Product, Explore, Search, MyCollections ,MyCollectionList} from '../screens';

const Navigation = () => {
    return (
        <Switch>
            <Route path="/explore">
                <Explore />
            </Route>
            <Route path="/product">
                <Product />
            </Route>
            <Route path="/my-collection">
                <MyCollections />
            </Route>
            <Route path="/my-collection-list">
                <MyCollectionList />
            </Route>
            <Route path="/search/:type/:term">
                <Search />
            </Route>
            <Route path="/">
                <Home />
            </Route>
        </Switch>
    );
}

export default Navigation