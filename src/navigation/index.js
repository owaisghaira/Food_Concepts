import React from 'react';

import { Switch, Route } from "react-router-dom";
import { Home, Product, TrackOrder, Search, MyCollections ,MyCollectionList,CheckOut} from '../screens';
import {Cart} from '../components'
const Navigation = () => {
    return (
        <Switch>
            <Route path="/track-order">
                <TrackOrder />
            </Route>
            <Route path="/product">
                <Product />
            </Route>
            <Route path="/checkout">
                <CheckOut />
            </Route>
            <Route path="/cart">
                <Cart/>
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