import React, { Component,PropTypes } from 'react';
import {
  View,
  Image,
  TouchableWithoutFeedback,
  Text,
  StyleSheet
} from 'react-native';
import Button from './Button'


var Dimensions = require('Dimensions');
var deviceWidth = Dimensions.get('window').width;

var Platform = require('Platform');  
var marginTop = 20;
if (Platform.OS === 'android') {  
    //todo 
    marginTop = 0; 
}else{  
    //todo  
}  

export default class NavBar extends Component {

    constructor(props) {
        super(props);
        //leftButtonImage
        //rightButtonImage
        //navBarStyle
        //titleStyle
        //title
    }

    getLeftButton(){
        if(this.props.leftButtonImage === undefined){
            return (<View/>);
        }
        return(
            <Button title='' source={this.props.leftButtonImage}
            imageStyle={{width:20,height:20}} buttonStyle={{width:40,height:44}}
            contentViewStyle={{width:44,height:44,marginLeft:4}} onPress={()=>this.leftClick()}/>
        );
    }

    leftClick(){
        if(this.props.leftButtonClick !== undefined){
            this.props.leftButtonClick();
        }
    }

    getRightButton(){
        if(this.props.rightButtonImage === undefined){
            return (<View/>);
        }
        return(
            <Button title='' source={this.props.rightButtonImage}
            imageStyle={{width:20,height:20}} buttonStyle={{width:40,height:44}}
            contentViewStyle={{width:44,height:44,marginLeft:5}} onPress={()=>this.rightClick()}/>
        );
    }

    rightClick(){
        if(this.props.rightButtonClick !== undefined){
            this.props.rightButtonClick();
        }
    }

    render() {
        return (
            <View style={[this.props.navBarStyle,{flexDirection:'row',height:44,width:deviceWidth,marginTop:marginTop,position: 'absolute',top: 0,}]}>
                <View style={{flex:1,height:44,flexDirection:'row'}}>
                    {this.getLeftButton()}
                </View>
                <View style={{flex:5,height:44,justifyContent:'center',alignItems:'center'}}>
                    <Text style={[{color:'white',fontSize:20,backgroundColor:'transparent'},this.props.titleStyle]}>{this.props.title}</Text>
                </View>
                <View style={{flex:1,height:44,flexDirection:'row'}}>
                    {this.getRightButton()}
                </View>

            </View>
        );
    }
}