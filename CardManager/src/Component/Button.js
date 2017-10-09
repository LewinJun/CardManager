import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    TouchableHighlight,
    Image,
    View
} from 'react-native';

/**
 * 自定义按钮
 * props 参数说明
 * iconSource 按钮图标image source
 * iconStyle icon 样式 style
 * textStyle 按钮文字样式 style
 * source 按钮背景图片 image source
 * imageStyle 按钮背景图片image样式 style
 * onPress 点击事件回调 
 * title 按钮标题 string
 * buttonStyle button TouchableHighlight的样式 style
 * contentViewStyle button内部主View的样式 style
 * keyId button的 key 可以区分点击了哪个按钮起到标记作用 string
 */
export default class Button extends Component {
    constructor(props) {
        super(props);
    }
    //
    textView() {
        var buttonText = [];
        if(this.props.iconSource !== null){
            buttonText.push(<Image source={this.props.iconSource} resizeMode="contain" style={this.props.iconStyle} key="myButtonImageIcon"/>);
        }if (this.props.title != null && this.props.title.length > 0) {
            buttonText.push(<Text style={this.props.textStyle} key="myButtonTitle">{this.props.title}</Text>);
        } else {
            buttonText.push(<View key="myButtonNullText"/>);
        }
        
        return buttonText;
    }

    buttonText() {

        if (this.props.source != null) {
            var buttonImage = [];
            buttonImage.push(<Image source={this.props.source} style={this.props.imageStyle}  resizeMode="contain" key="myButtonImage">
                {this.textView()}
            </Image>);
            return buttonImage;
        } else {
            return this.textView();
        }
    }

    pressHandler(){
        if(this.props.onPress === undefined){
            return;
        }
        if(this.props.keyId !== undefined){
            this.props.onPress(this.props.keyId);
        }else{
            this.props.onPress();
        }
        
    }

    render() {
        return (
            <TouchableHighlight style={this.props.buttonStyle} activeOpacity={0.8}
                                underlayColor={'transparent'} onPress={()=>this.pressHandler()} key={this.props.keyId}>
                <View style={[this.props.contentViewStyle, {flex:1,alignItems: 'center',
                    justifyContent: 'center'}]}>
                    {this.buttonText()}
                </View>
            </TouchableHighlight>
        );
    }
}