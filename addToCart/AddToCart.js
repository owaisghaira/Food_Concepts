import React, { Component } from "react";
import CartButton from './CartButton';
import { connect } from 'react-redux';
import { setToCart, addToCart, addQuantity } from '../src/redux/actions/cartAction';

class AddToCart extends Component {
    constructor(props) {
        super(props);

        let product = this.props.product;

        this.props.setToCart({
            ProductID: product.ProductID,
            VariantID: product.VariantID,
            SellingPrice: product.SellingPrice,
            ComparePrice: product.ComparePrice,
            Name: product.Name,
            Images: product.Images
        });

        this.addToCart = this.addToCart.bind(this);
    }

    addToCart() {
        let product = this.props.product

        let data = {
            ProductID: product.ProductID,
            VariantID: product.VariantID,
            SellingPrice: product.SellingPrice,
            ComparePrice: product.ComparePrice,
            Name: product.Name,
            Images: product.Images,
            IncreaseQuantity: true
        };

        this.props.addToCart(data);
        this.props.addQuantity(data);

        this.props.navigation.navigate("AddToCartModal")

        //ToastService.show("Item has been added to cart");
    }

    getCartItem = () => {
        let { cartItems, product } = this.props;
        return cartItems.find(item => item.ProductID == product.ProductID && item.VariantID == product.VariantID);
    }

    render() {
        let cartItem = this.getCartItem();
        let filled = (cartItem != undefined);
        return (
            <CartButton filled={filled} onAddToCart={this.addToCart} />
        );
    }
}

const mapStateToProps = (state) => {

    return {
        isLoggedIn: state.auth.loggedIn,
        cartItems: state.cart.addedItems
    };
};

const mapDispatchToProps = dispatch => ({
    setToCart: (item) => dispatch(setToCart(item)),
    addToCart: (item) => dispatch(addToCart(item)),
    addQuantity: (item) => dispatch(addQuantity(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddToCart);