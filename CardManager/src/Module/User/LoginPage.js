import React, { Component, PropTypes } from 'react';
import {
    View,
    Image,
    Text,
    TouchableWithoutFeedback,
    TextInput,
    StyleSheet,
    Keyboard,
    DeviceEventEmitter,
    Animated,
    ScrollView,
    Alert,
} from 'react-native';
import {
    DrawerNavigator
} from 'react-navigation';

import UserData from '../../Data/Interface/UserData'
import Button from '../../Component/Button'
import ColorUtil from './../../Util/ColorUtil'
import Util from './../../Util/Util'
import ViewLine from '../../Component/ViewLine'
import ToastUtil from '../../Component/ToastUtil'


var Dimensions = require('Dimensions');
var deviceWidth = Dimensions.get('window').width;
var deviceHeight = Dimensions.get('window').height;
var contentWidth = 346 * (deviceWidth / 375);
var contentHeight = 265;
// * (deviceHeight/667)
var contentTop = 180;
var bgHeight = 250;


export default class LoginPage extends Component {

    static navigationOptions = {
        header: false
    };

    constructor(props) {
        super(props);
        this.state = {
            loginBtnDisabled:false,
        }
        UserData.getLoginAccount((value)=>{
            if(value){
                this.setState({mobile:value});
            }
        });
    }

    //手机号码icon View
    mobileIconView() {
        return (
            <Image source={require('../../images/user/loginReg/username_icon.png')}
                style={styles.inputIcon} />
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
                    }} onChangeText={(text) => this.setState({ mobile: text })} defaultValue={this.state.mobile}/>
            </View>
            <View style={styles.inputLine}>
            </View>
            <View style={styles.inputContent}>
                <Image source={require('../../images/user/loginReg/password_icon.png')}
                    style={[styles.inputIcon]} resizeMode="stretch" />
                <TextInput style={styles.input} placeholder="请输入密码" secureTextEntry={true} password={true} underlineColorAndroid='transparent'
                    placeholderTextColor="#adadad" onChangeText={(text) => this.setState({ password: text })} />
            </View>
            <View style={styles.inputLine}>
            </View>

            <Button title='登录' source={require('../../images/user/loginReg/blue_style_btn_bg.png')}
                imageStyle={styles.loginButton} buttonStyle={styles.loginButton} textStyle={{ color: 'white', fontSize: 18 }}
                contentViewStyle={[styles.loginButton]} onPress={() => this.loginClick()} disabled = {this.state.loginBtnDisabled}/>

        </View>);
    }

    loginClick() {
        
            this.setState({loginBtnDisabled:true});
            UserData.login(this.state.mobile,this.state.password,(res) => {
                
                this.setState({loginBtnDisabled:false});
                
                this.props.navigation.goBack();
            }, (error) => {
                this.setState({loginBtnDisabled:false});                
            });
        
    }

    render() {
        return (//Keyboard.dismiss
            <TouchableWithoutFeedback onPressIn={Keyboard.dismiss}>
                <View style={styles.view}>
                    <Image source={require('../../images/user/loginReg/login_bg.png')} style={styles.loginBackground} resizeMode='stretch' />
                    <View style={styles.contentView}>

                        <Image source={require('../../images/user/loginReg/login_content_bg.png')}
                            resizeMode='stretch'
                            style={{ position: 'absolute', width: contentWidth, height: contentHeight }}>
                        </Image>

                        {this.inputPasswordView()}

                    </View>

                    <View style={{ flexDirection: 'row', marginTop: 2, width: deviceWidth, height: 50, alignItems: 'center', justifyContent: 'center' }}>
                        <Button title='忘记密码 ?' textStyle={{ color: ColorUtil.styleColor, fontSize: 13, textDecorationLine: 'underline' }} onPress={() => this.props.navigation.navigate('ForgetPassWord')} />
                        <ViewLine lineStyle={{ width: 1, height: 20, marginLeft: 10, marginRight: 10 }} />
                        <Button title='没有账号？点击注册' textStyle={{ color: ColorUtil.styleColor, fontSize: 13, textDecorationLine: 'underline' }} buttonStyle={{ height: 34 }} onPress={() => this.props.navigation.navigate('Register')} />

                    </View>

                    <Button title='' source={require('../../images/btn_close.png')}
                        imageStyle={styles.closeBtn} buttonStyle={{ position: 'absolute', top: 35, left: 20, }}
                        contentViewStyle={styles.closeBtn} onPress={() => this.props.navigation.goBack()} />
                </View>
            </TouchableWithoutFeedback>);
    }
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white'
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
        marginLeft: 40,
        width: contentWidth,
    },
    loginBackground: {
        position: 'absolute',
        width: deviceWidth,
        height: bgHeight,
    },
    loginButton: {
        marginTop: 10,
        width: contentWidth - 20,
        height: 70,
    }
})