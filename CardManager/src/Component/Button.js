import React, { Component } from 'react';
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

var viewSize = { width: 0, height: 0 };

var _this = undefined;
export default class Button extends Component {


    constructor(props) {
        super(props);
        _this = this;
        var ssss = this.props.buttonStyle;
        var iwidth = 0;
        var iheight = 0;

        if(ssss && ssss.width && ssss.height){
            iwidth = ssss.width;
            iheight = ssss.height;
        }

        this.state = {
            width: iwidth,
            height: iheight,
        };
        
    }
    //
    textView() {
        var buttonText = [];
        if (this.props.iconSource !== null && this.props.iconSource !== undefined) {
            buttonText.push(<Image source={this.props.iconSource} resizeMode="contain" style={this.props.iconStyle} key="myButtonImageIcon" />);
        } if (this.props.title !== null && this.props.title !== undefined && this.props.title.length > 0) {
            buttonText.push(<Text style={[this.props.textStyle, { backgroundColor: 'transparent' }]} key="myButtonTitle">{this.props.title}</Text>);
        } else {
            buttonText.push(<View key="myButtonNullText" />);
        }

        return buttonText;
    }

    buttonText() {

        // if (this.props.source != null) {
        //     var buttonImage = [];
        //     buttonImage.push(<Image resizeMode='center' source={this.props.source} style={[this.props.imageStyle,{position:'absolute',alignItems:'center',justifyContent:'center',width:200}]}  resizeMode="contain" key="myButtonImage">
        //         {this.textView()}
        //     </Image>);
        //     return textView;
        // } else {
        return this.textView();
        // }
    }

    buttonImage() {
        if (this.props.source) {
            
            return <Image resizeMode='stretch' source={this.props.source} style={[{width:this.state.width,height:this.state.height},this.props.imageStyle, { position: 'absolute', flex: 1 }]} key="myButtonImage">
            </Image>;
        }
        return <View />;
    }

    _onLayout(event)
    //使用大括号是为了限制let结构赋值得到的变量的作用域，因为接来下还要结构解构赋值一次
    {
        //获取根View的宽高，以及左上角的坐标值
        let { x, y, width, height } = event.nativeEvent.layout;
        if(_this.state.height < height){
            _this.setState({
                width:width,
                height:height,
            });
        }
        
    }



    pressHandler() {
        if (this.props.onPress === undefined) {
            return;
        }
        if (this.props.keyId !== undefined) {
            this.props.onPress(this.props.keyId);
        } else {
            this.props.onPress();
        }

    }

    render() {
        return (
            <TouchableHighlight style={[this.props.buttonStyle]} activeOpacity={0.6} onLayout={this._onLayout.bind(this)}
                underlayColor={'transparent'} onPress={() => this.pressHandler()} key={this.props.keyId} disabled={this.props.disabled} ref="btnView">
                <View style={[this.props.contentViewStyle, {
                    flex: 1, alignItems: 'center',
                    justifyContent: 'center'
                }]}>
                    {this.buttonImage()}
                    {this.buttonText()}

                </View>
            </TouchableHighlight>
        );
    }
}