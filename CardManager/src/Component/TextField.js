import React, { Component, PropTypes } from 'react';
import {
    View,
    
    TouchableWithoutFeedback,
    TextInput,
    StyleSheet,
    Keyboard,
    DeviceEventEmitter,
    Animated,
    Alert,
} from 'react-native';

export default class TextField extends Component {  
    render() {  
        return(  
            <TextInput underlineColorAndroid='transparent' {...this.props} />  
        )  
    }  
}

