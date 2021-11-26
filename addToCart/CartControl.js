import React, { Component } from "react";
import { Icon, Text, View } from '@shoutem/ui';
import { IconFill, IconOutline } from "@ant-design/icons-react-native";
import { connect } from 'react-redux';

class CartControl extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View styleName="horizontal space-between">
                <Icon
                    name="left-arrow"
                    onPress={() => this.props.onDecrement()}
                    size={this.props.iconSetting.defaultIconSize}
                    color={this.props.iconSetting.primaryColor}
                />
                <Text styleName="md-gutter-left md-gutter-right">{this.props.quantity}</Text>
                <Icon
                    name="right-arrow"
                    onPress={() => this.props.onIncrement()}
                    size={this.props.iconSetting.defaultIconSize}
                    color={this.props.iconSetting.primaryColor}
                />
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        iconSetting: state.iconSetting
    };
};


export default connect(mapStateToProps)(CartControl);
