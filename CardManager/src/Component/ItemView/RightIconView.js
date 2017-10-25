'use strict';  
import React, { Component } from 'react';  
import {  
  StyleSheet,  
  View,  
  Image,  
  TouchableHighlight,  
  Animated,  
  TouchableOpacity,  
} from 'react-native'; 

export default class RightIconView extends Component{
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <Image  {...this.props} source={require('./right_icon.png')} style={[this.props.style,{ width: 10, height: 15 }]} resizeMode='stretch'/>
        );
    }
}

