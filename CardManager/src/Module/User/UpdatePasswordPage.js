import React, { Component, PropTypes } from 'react';
import {
    View,
    Image,
    Text,
    TouchableHighlight,
    TouchableWithoutFeedback,
    TextInput,
    StyleSheet,
    Keyboard,
    DeviceEventEmitter,
    Animated,
    Alert,
} from 'react-native';
import {
    DrawerNavigator
} from 'react-navigation';

import UserData from '../../Data/Interface/UserData'
import UserInfo from '../../Data/Interface/UserInfo'
import Button from '../../Component/Button'
import ColorUtil from './../../Util/ColorUtil'
import Util from './../../Util/Util'
import ViewLine from '../../Component/ViewLine'
import ToastUtil from '../../Component/ToastUtil'


var Dimensions = require('Dimensions');
var deviceWidth = Dimensions.get('window').width;
var deviceHeight = Dimensions.get('window').height;
var contentViewWidth = deviceWidth - 20;
var contentWidth = contentViewWidth - 40;

var userInfo = new UserInfo();

export default class UpdatePasswordPage extends Component {

    static navigationOptions = {
        title: '修改密码',
    }
    constructor(props) {
        super(props);
        this.state = {
            userInfo: userInfo.getUserInfo(),
        }
    }

    getUserInfoView() {

        return (
            <View style={[styles.inputContentView, { marginTop: 20 }]}>
                {this.getInputView('原密码','请输入原密码',true, this.state.nickName, (text) => {
                    this.setState({ olPass: text });
                })}
                <ViewLine width={contentWidth + 5} />
                {this.getInputView('新密码','请输入新密码',true, this.state.userName, (text) => {
                    this.setState({ newPass: text });
                })}
                <ViewLine width={contentWidth + 5} />
                {this.getInputView('确定新密码','请输入确定密码',true, this.state.userName, (text) => {
                    this.setState({ okNewPass: text });
                })}
            </View>
        );
    }

    getInputView(label,placeholder,isPass, defaultText, changeText) {

        return (
            <View style={{
                width: contentWidth, height: 50, flexDirection: 'row',
                alignItems: 'center', justifyContent: 'center',
                backgroundColor: 'transparent', marginLeft: 0,
            }}>
                <Text style={{ color: ColorUtil.grayTextColor, fontSize: 16 }}>{label}</Text>
                <TextInput style={{ marginLeft: 20, flex: 1 }} placeholder={placeholder}  secureTextEntry={isPass} password={isPass} onChangeText={(text) => changeText(text)} defaultValue={defaultText} />
            </View>
        );
    }

    saveClick() {
        UserData.saveInfo(this.state.mobile, this.state.sex, (res)=>{
            this.props.navigation.goBack();
        },undefined);
    }

    render() {
        return (
            <TouchableWithoutFeedback onPressIn={Keyboard.dismiss}>
            <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'white' }}>
                {this.getUserInfoView()}

                <Button title='修改' source={require('../../images/user/loginReg/blue_style_btn_bg.png')}
                    imageStyle={styles.loginButton} buttonStyle={styles.loginButton} textStyle={{ color: 'white', fontSize: 18 }}
                    contentViewStyle={[styles.loginButton]} onPress={() => this.saveClick()} disabled={this.state.loginBtnDisabled} />
            </View>
            </TouchableWithoutFeedback>
        );
    }


}
const styles = StyleSheet.create({
    inputContentView: {
        shadowColor: ColorUtil.grayColor,
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 0.4,
        shadowRadius: 6,
        borderWidth: 0.3,
        borderColor: ColorUtil.grayColor,
        borderRadius: 6,
        elevation: 3,
        justifyContent: 'center',
        alignItems: 'center',
        width: contentViewWidth,
    },
    loginButton: {
        marginTop: 10,
        width: contentWidth,
        height: 70,
    }
});