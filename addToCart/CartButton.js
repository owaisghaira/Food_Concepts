import React, { Component } from "react";
import { IconFill, IconOutline } from "@ant-design/icons-react-native";
import { connect } from 'react-redux';

class CartButton extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.filled) {
            return (
                <IconFill
                    name="shopping"
                    size={this.props.iconSetting.defaultIconSize}
                    color={this.props.iconSetting.primaryColor}
                    onPress={() => this.props.onAddToCart()}
                />
            );
        } else {
            return (
	            <IconOutline
	                name="shopping"
                    size={this.props.iconSetting.defaultIconSize}
                    color={this.props.iconSetting.primaryColor}
	                onPress={() => this.props.onAddToCart()}
	            />
            );
        }
    }
}

const mapStateToProps = (state) => {
    return {
        iconSetting: state.iconSetting
    };
};


export default connect(mapStateToProps)(CartButton);
