import React, { Component } from "react";
import CartLargeControl from './CartLargeControl';
import dataService from '../services/dataService';
import { connect } from 'react-redux';
import { addQuantity, subtractQuantity, addToCart, setQuantity } from '../../redux/actions/cartAction';
import ToastService from '../services/toastService';

class AddToCartLargeControl extends Component {

    constructor(props) {
        super(props);
    }

    addQuantity = (quantity) => {

        if (!this.props.allowChange) {
            ToastService.show(`The selected combination ${this.props.restriction} is not available`);
            return false;
        }

        let cartItem = this.getCartItem();

        let { product } = this.props;

        if (cartItem == undefined) {
            let row = {
                ProductID: product.ProductID,
                VariantID: product.VariantID,
                SellingPrice: product.SellingPrice,
                Quantity: quantity
            };

            this.props.addToCart(row);
            this.props.setQuantity(row);
            ToastService.show(`Item has been added to cart`);
        } else {
            this.props.setQuantity({
                ProductID: product.ProductID,
                VariantID: product.VariantID,
                SellingPrice: product.SellingPrice,
                Quantity: quantity
            });
        }
    }

    increaseQuantity = () => {

        if (!this.props.allowChange) {
            ToastService.show(`The selected combination ${this.props.restriction} is not available`);
            return false;
        }

        let cartItem = this.getCartItem();

        let { product } = this.props;

        if (cartItem == undefined) {
            this.props.addToCart({
                ProductID: product.ProductID,
                VariantID: product.VariantID,
                SellingPrice: product.SellingPrice,
            });
            this.props.addQuantity({
                ProductID: product.ProductID,
                VariantID: product.VariantID,
                SellingPrice: product.SellingPrice,
            });
            //ToastService.show(`Item has been added to cart`);
        } else {

            this.props.addQuantity({
                ProductID: product.ProductID,
                VariantID: product.VariantID,
                SellingPrice: product.SellingPrice,
            });
        }
    }

    getCartItem = () => {
        let { cartItems, product } = this.props;

        if (product.VariantID > 0) {
            return cartItems.find(item => item.ProductID == product.ProductID && item.VariantID == product.VariantID);
        } else {
            return cartItems.find(item => item.ProductID == product.ProductID);
        }
    }

    decreaseQuantity = () => {

        if (!this.props.allowChange) {
            ToastService.show(`The selected combination ${this.props.restriction} is not available`);
            return false;
        }

        let cartItem = this.getCartItem();

        if (cartItem) {
            let quantity = cartItem.Quantity - 1;

            let { product } = this.props;

            if (quantity > 0) {
                this.props.subtractQuantity({
                    ProductID: product.ProductID,
                    VariantID: product.VariantID,
                    SellingPrice: product.SellingPrice,
                });
            }
        }
    }

    render() {
        let cartItem = this.getCartItem();
        let quantity = cartItem ? cartItem.Quantity : 0;
        return <CartLargeControl navigation={this.props.navigation} product={this.props.product} quantity={quantity} onAddQuantity={this.addQuantity} onIncrement={this.increaseQuantity} onDecrement={this.decreaseQuantity} />
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
    addToCart: (item) => dispatch(addToCart(item)),
    setQuantity: (item) => dispatch(setQuantity(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddToCartLargeControl);