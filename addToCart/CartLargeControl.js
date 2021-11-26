import React, { Component } from "react";
import { View, Text, Row, Button, Icon as IconDefault, TextInput, Subtitle, Divider } from '@shoutem/ui';
import Dialog from "react-native-dialog";
import { IconOutline as Icon } from "@ant-design/icons-react-native";
import { connect } from 'react-redux';
import Popup from "./Popup";

class CartLargeControl extends Component {

    constructor(props) {
        super(props);

        this.state = {
            dialogVisible: false,
            Quantity: 0
        };

    }

    componentDidMount() {
        this.setState({ Quantity: this.props.quantity });
    }

    showDialog = () => {
        this.setState({ dialogVisible: true });
    };

    handleCancel = () => {
        this.setState({ dialogVisible: false });
    };

    handleAdd = () => {
        this.setState({ dialogVisible: false });
        this.props.onAddQuantity(this.state.Quantity);
        this.setState({ Quantity: 0 });
    };

    getCartItem = () => {
        let { cartItems, product } = this.props;

        if (product.VariantID > 0) {
            return cartItems.find(item => item.ProductID == product.ProductID && item.VariantID == product.VariantID);
        } else {
            return cartItems.find(item => item.ProductID == product.ProductID);
        }
    }

    increaseQuantity = () => {
        this.props.onIncrement();
        this.props.navigation.navigate('AddToCartModal')
    }

    render() {

        let cartItem = this.getCartItem();

        //console.log(cartItem);

        let quantity = cartItem ? cartItem.Quantity : 0;

        return (
            <View>
                {/* <Row>
                    <View styleName="horizontal space-between">
                        <Subtitle style={{ fontSize: 22 }}>Quantity</Subtitle>
                        <View styleName="horizontal space-between" >
                            <Button styleName="primary">
                                <IconDefault
                                    name="left-arrow"
                                    size="md"
                                    color="white"
                                    onPress={() => this.props.onDecrement()}
                                />
                            </Button>
                            <Text style={{ fontSize: 22 }}>{quantity}</Text>
                            <Button styleName="primary">
                                <IconDefault
                                    name="right-arrow"
                                    size="md"
                                    color="white"
                                    onPress={() => this.props.onIncrement()}
                                />
                            </Button>
                        </View>
                    </View>
                </Row>
                <Divider styleName="line" /> */}

                <Row>
                    <Button styleName="secondary full-width" onPress={() => this.increaseQuantity()}>
                        <Icon name="shopping" size={this.props.iconSetting.smallIconSize} color="white" style={{ paddingRight: 10 }} />
                        <Text style={{ fontSize: 17 }}>ADD TO CART</Text>
                    </Button>
                </Row>
            </View>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        iconSetting: state.iconSetting,
        cartItems: state.cart.addedItems
    };
};


export default connect(mapStateToProps)(CartLargeControl);