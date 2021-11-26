import React, { Component } from "react";
import CartControl from './CartControl';
import dataService from '../services/dataService';
import { connect } from 'react-redux';
import { addQuantity, subtractQuantity } from '../../redux/actions/cartAction';

class AddToCartControl extends Component {

    constructor(props) {
        super(props);
    }

    increaseQuantity = () => {
        this.props.addQuantity({
            ProductID: this.props.product.ProductID,
            VariantID: this.props.product.VariantID,
            Quantity: 1,
            IncreaseQuantity: true
        });
    }

    getCartItem = () => {
        let { cartItems, product } = this.props;
        return cartItems.find(item => item.ProductID == product.ProductID && item.VariantID == product.VariantID);
    }

    decreaseQuantity = () => {

        let cartItem = this.getCartItem();

        let quantity = cartItem.Quantity - 1;

        if (quantity > 0) {
            this.props.subtractQuantity({
                ProductID: this.props.product.ProductID,
                VariantID: this.props.product.VariantID,
                Price: this.props.price
            });
        }
    }

    render() {
        let cartItem = this.getCartItem();
        let quantity = cartItem ? cartItem.Quantity : 1;
        return <CartControl quantity={quantity} onIncrement={this.increaseQuantity} onDecrement={this.decreaseQuantity} />
    }
}

const mapStateToProps = (state) => {

    return {
        isLoggedIn: state.auth.loggedIn,
        cartItems: state.cart.addedItems
    };
};

const mapDispatchToProps = dispatch => ({
    addQuantity: (item) => dispatch(addQuantity(item)),
    subtractQuantity: (item) => dispatch(subtractQuantity(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddToCartControl);