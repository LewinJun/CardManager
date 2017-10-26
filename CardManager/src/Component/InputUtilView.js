import React, { Component, PropTypes } from 'react';
import {
    View,
    Image,
    Text,
    TouchableHighlight,
    TouchableWithoutFeedback,
    StyleSheet,
    ScrollView,
    Keyboard,
    DeviceEventEmitter,
    Animated,
    Alert,
} from 'react-native';

import ColorUtil from './../Util/ColorUtil'
import MobileCodeView from './../Module/User/MobileCodeView'
import TextField from './TextField'

var Dimensions = require('Dimensions');
var deviceWidth = Dimensions.get('window').width;
var deviceHeight = Dimensions.get('window').height;
var contentViewWidth = deviceWidth - 20;
var contentWidthD = contentViewWidth - 40;

// label, placeHolder, defaultText, changeText,
// editable,isCode,mobile,method,contentWidth
export default class InputView extends Component {

    constructor(props) {
        super(props);
        var ao = 0.9;
        if (this.props.onPress !== undefined) {
            ao = 0.6;
        }
        this.state = {
            activeOpacity: ao,            
        };
        // this.itemClick.bind(this);
    }

    itemClick() {
        if (this.props.onPress) {
            this.props.onPress();
        }
    }

    getRightIcon() {
        if (this.props.onPress === undefined) {
            return (<View />);
        }
        return (<Image source={require('./ItemView/right_icon.png')} style={{ width: 10, height: 15 }} resizeMode='stretch' />
        );
    }

    render() {
        var width = this.props.contentWidth;
        if (this.props.contentWidth === undefined) {
            width = contentWidthD;
        }
        var isEditable = true;
        if (this.props.editable !== undefined) {
            isEditable = this.props.editable;
        }
        return (

            <TouchableHighlight onPress={this.itemClick.bind(this)} style={{}} activeOpacity={this.state.activeOpacity} underlayColor={'transparent'}>
                <View style={{
                    width: width, height: 50, flexDirection: 'row',
                    alignItems: 'center', justifyContent: 'center',
                    backgroundColor: 'transparent', marginLeft: 0,
                }}>

                    <Text style={{ color: ColorUtil.grayTextColor, fontSize: 16 ,width:70,}}>{this.props.label}</Text>
                    <TextField editable={isEditable} style={{ marginLeft: 10, flex: 1 ,}}
                        placeholder={this.props.placeholder}
                        ref={this.props.refName}
                        onChangeText={(text) => this.props.changeText(text)}

                        defaultValue={this.props.defaultText} />
                    {getCodeInput(this.props.isCode, this.props.mobile, this.props.method)}
                    {this.getRightIcon()}
                </View>
            </TouchableHighlight>
        );
    }
}
const getCodeInput = (isCode, mobile, method) => {
    if (isCode) {
        return (<MobileCodeView mobile={mobile} method={method} />);
    } else {
        return (<View />);
    }
}
