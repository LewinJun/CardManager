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
import Button from './Button'

var Dimensions = require('Dimensions');
var deviceWidth = Dimensions.get('window').width;
var deviceHeight = Dimensions.get('window').height;
var contentViewWidth = deviceWidth - 20;
var contentWidthD = contentViewWidth - 40;

// label, placeHolder, defaultText, changeText,
// editable,isCode,mobile,method,contentWidth,isBtnAdd
export default class InputView extends Component {

    constructor(props) {
        super(props);
        var ao = 0.9;
        if (this.props.onPress !== undefined) {
            ao = 0.6;
        }
        this.state = {
            activeOpacity: ao,
            value: this.props.defaultText,
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
            return (<View style={{ marginLeft: 10, width: 10, height: 15, backgroundColor: 'transparent' }} />);
        }
        return (<Image source={require('./ItemView/right_icon.png')} style={{ marginLeft: 10, width: 10, height: 15 }} resizeMode='stretch' />
        );
    }

    addClick(type) {
        var sValue = this.state.value;
        if(sValue === '99'){
            return;
        }
        
        if(!sValue){
            sValue = '1';
        }
        var value = parseInt(sValue);
        if (type === 0 && value > 1) {
            value--;
        } else if(type === 1) {
            value++;
        }
        
        this.setState({ value: value.toString() });
        if (this.props.changeText) {
            this.props.changeText(value.toString());
        }
    }

    getContentView() {
        var isEditable = true;
        if (this.props.editable !== undefined) {
            isEditable = this.props.editable;
        }

        if (this.props.isBtnAdd) {
            return (
                <View style={{ marginLeft: 10, flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                    <Button title='-' buttonStyle={{ width: 30, height: 30 }} textStyle={{ color: ColorUtil.styleColor, fontSize: 22 }}
                        onPress={() => this.addClick(0)} />
                    <TextField editable={false} style={[{  width: 25, height: 50, textAlign: 'center', fontSize: 15 }]}
                        placeholder={this.props.placeholder}
                        ref={this.props.refName}
                        onChangeText={(text) => this.props.changeText(text)}

                        defaultValue={this.state.value} />
                    <Button title='+' buttonStyle={{ width: 30, height: 30 }} textStyle={{ color: ColorUtil.styleColor, fontSize: 22 }}
                        onPress={() => this.addClick(1)} />
                </View>
            );
        } else {
            return (<TextField editable={isEditable} style={[{ marginLeft: 10, flex: 1, fontSize: 15 }, this.props.valueStyle]}
                placeholder={this.props.placeholder}
                ref={this.props.refName}
                onChangeText={(text) => this.props.changeText(text)}

                defaultValue={this.props.defaultText} />);
        }
    }

    render() {
        var width = this.props.contentWidth;
        if (this.props.contentWidth === undefined) {
            width = contentWidthD;
        }

        return (

            <TouchableHighlight onPress={this.itemClick.bind(this)} style={{}} activeOpacity={this.state.activeOpacity} underlayColor={'transparent'}>
                <View style={{
                    width: width, height: 50, flexDirection: 'row',
                    alignItems: 'center', justifyContent: 'center',
                    backgroundColor: 'transparent', marginLeft: 0,
                }}>

                    <Text style={{ color: ColorUtil.grayTextColor, width: 75, }}>{this.props.label}</Text>
                    {this.getContentView()}
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
