import React, { Component, PropTypes } from 'react';
import {
    View,
    Image,
    Text,
    TouchableWithoutFeedback,
    TextInput,
    StyleSheet,
    Keyboard,
    Animated,
    ScrollView,
    Alert,
} from 'react-native';
import {
    DrawerNavigator
} from 'react-navigation';

import Button from '../../Component/Button'
import NavBar from '../../Component/NavBar'
import ColorUtil from './../../Util/ColorUtil'
import ViewLine from '../../Component/ViewLine'


var Dimensions = require('Dimensions');
var deviceWidth = Dimensions.get('window').width;
var deviceHeight = Dimensions.get('window').height;
var contentWidth = 346* (deviceWidth/375);
var contentHeight = 355;
// * (deviceHeight/667)
var contentTop = 180;
var bgHeight = 250;


export default class RegisterPage extends Component {

    static navigationOptions = {
        title: '注册',
        headerStyle: {
            backgroundColor: 'transparent',
            borderBottomWidth:0,
            elevation:0,//android 边框阴影 
            shadowOpacity:0,
          },          
    };

    //手机号码icon View
    mobileIconView() {
        return (
            <Image source={require('../../images/user/loginReg/username_icon.png')}
                   style={styles.inputIcon}/>
        );
    }

    //输入框view  登录输入框
    inputPasswordView() {
        return (<View style={styles.inputView}>
            <View style={styles.inputContent}>
                {this.mobileIconView()}
                <TextInput style={styles.input} placeholder="请输入账号" keyboardType='phone-pad' underlineColorAndroid='transparent'
                    placeholderTextColor="#adadad" ref={(input) => {
                        this.passMobile = input;
                    }} onChangeText={(text) => this.setState({ passMobile: text })} />
            </View>
            <View style={styles.inputLine}>
            </View>
            <View style={styles.inputContent}>
                <Image source={require('../../images/user/loginReg/password_icon.png')}
                    style={[styles.inputIcon]} resizeMode="stretch" />
                <TextInput style={styles.input} placeholder="请输入密码" password={true} underlineColorAndroid='transparent'
                    placeholderTextColor="#adadad" onChangeText={(text) => this.setState({ password: text })} />
            </View>
            <View style={styles.inputLine}>
            </View>
            <View style={styles.inputLine}/>
            <View style={styles.inputContent}>
                <Image source={require('../../images/user/loginReg/code_icon.png')}
                       style={[styles.inputIcon, {height: 16}]} resizeMode="stretch"/>
                <TextInput style={[styles.input, {width: 134}]} placeholder="请输入验证码"
                           placeholderTextColor="#adadad" onChangeText={(text) => this.setState({code: text})}/>
                <Button title='获取验证码' textStyle={{color: ColorUtil.styleColor, fontSize: 13,textDecorationLine:'underline'}} onPress={() => console.log("")}/>
            </View>
            <View style={styles.inputLine}/>
            <View style={styles.inputContent}>
                <Image source={require('../../images/user/loginReg/yaoqingma_icon.png')}
                       style={[styles.inputIcon, {height: 16}]} resizeMode="stretch"/>
                <TextInput style={styles.input} placeholder="请输入邀请码"
                           placeholderTextColor="#adadad" onChangeText={(text) => this.setState({password: text})}/>
            </View>
            <View style={styles.inputLine}/>
            <Button title='注册' source={require('../../images/user/loginReg/blue_style_btn_bg.png')}
            imageStyle={styles.loginButton} buttonStyle={styles.loginButton} textStyle={{color:'white',fontSize:18}}
            contentViewStyle={[styles.loginButton]} onPress={()=>this.props.navigation.navigate('Register')}/>


        </View>);
    }

    render() {
        return (//Keyboard.dismiss
            <TouchableWithoutFeedback onPressIn={Keyboard.dismiss}>
                <View style={styles.view}>
                    <Image source={require('../../images/user/loginReg/login_bg.png')} style={styles.loginBackground} resizeMode='stretch'/>
                    <View style={styles.contentView}>
                        
                        <Image source={require('../../images/user/loginReg/login_content_big_bg.png')} 
                        resizeMode='stretch'
                        style={{position: 'absolute',width:contentWidth,height:contentHeight}}>
                        </Image>

                        {this.inputPasswordView()}

                    </View>
                </View>
            </TouchableWithoutFeedback>);
    }
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        alignItems: 'center',
        marginTop:-66,
        backgroundColor:'white'
    },
    contentView: {
        // justifyContent: 'center',
        alignItems: 'center',
        marginTop: contentTop,
        width: contentWidth,
        height: contentHeight,
    },
    closeBtn: {
        width: 20,
        height: 20,
    },
    inputView: {
        // justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        // height: contentHeight,
        // width: contentWidth,
        marginTop: 20,
    },
    input: {
        width: 180,
        height: 55,
        marginLeft: 10,
        fontSize: 16,
        borderWidth: 0,
    },
    inputIcon: {
        width: 16,
        height: 20,
        alignItems: 'flex-start',
        marginLeft: 18,
        marginTop: 18,
    },
    inputLine: {
        backgroundColor: '#E9E9E9',
        width: contentWidth - 80,
        height: 0.6,
        // marginLeft:40,
        alignItems: 'center',
    },
    
    inputContent: {
        flexDirection: 'row',
        marginLeft:40,
        width: contentWidth,
    },
    loginBackground: {
        position: 'absolute',
        width: deviceWidth,
        height: bgHeight,
    },
    loginButton: {
        marginTop:10,
        width: contentWidth-20,
        height: 70,
    }
})