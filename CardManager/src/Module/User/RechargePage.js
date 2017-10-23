import React, { Component, PropTypes } from 'react';
import {
    View,
    Image,
    Text,
    TouchableHighlight,
    TouchableWithoutFeedback,
    TextInput,
    StyleSheet,
    ScrollView,
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
import PickerWidget from '../../Component/PickerWidget'
import ColorUtil from './../../Util/ColorUtil'
import Util from './../../Util/Util'
import ViewLine from '../../Component/ViewLine'
import ToastUtil from '../../Component/ToastUtil'
import InputView from '../../Component/InputUtilView'
import MobileCodeView from './../../Module/User/MobileCodeView'


var Dimensions = require('Dimensions');
var deviceWidth = Dimensions.get('window').width;
var deviceHeight = Dimensions.get('window').height;
var contentViewWidth = deviceWidth - 20;
var contentWidth = contentViewWidth - 40;

var userInfo = new UserInfo();

export default class RechargePage extends Component {

    static navigationOptions = {
        title: '充值',
    }
    constructor(props) {
        super(props);
        this.state = {
            userInfo: userInfo.getUserInfo(),
            nickName: userInfo.getUserInfo().user_nike,
            sex: userInfo.getUserInfo().user_sex,
            mobile: userInfo.getUserInfo().user_phone,
            userName: userInfo.getUserInfo().user_name,
            card: userInfo.getUserInfo().user_id_card,
            disabledBtn: false,
        }
    }

    getMoneyView() {

        return (
            <View style={[styles.inputContentView, { marginTop: 20 }]}>
                <InputView label='提取金额' placeholder='请输入昵称' defaultText={this.state.money} changeText={(text) => {
                    this.setState({ money: text });
                }} refName="m1" />
                <ViewLine width={contentWidth + 5} />


                <InputView label='充值金额' placeholder='请输入充值金额' defaultText={this.state.recharge} changeText={(text) => {
                    this.setState({ recharge: text });
                }}  refName="m2" />
            </View>
        );
    }

    getUserCardView() {

        return (
            <View style={[styles.inputContentView, { marginTop: 20 }]}>

                <InputView label='信用卡号' placeholder='请输入信用卡号' defaultText={this.state.card} changeText={(text) => {
                    this.setState({ card: text });
                }}  refName="m3"/>
                <ViewLine width={contentWidth + 5} />

                <InputView label='CVN2' placeholder='请输入信用卡背后三位CVN2' defaultText={this.state.cvn} changeText={(text) => {
                    this.setState({ cvn: text });
                }}  refName="m4"/>
                <ViewLine width={contentWidth + 5} />

                <InputView label='有效期' placeholder='有效期(月/年)' defaultText={this.state.time} changeText={(text) => {
                    this.setState({ time: text });
                }}  refName="m5"/>

            </View>
        );
    }

    getMobileView() {

        return (
            <View style={[styles.inputContentView, { marginTop: 20 }]}>

                <InputView label='手机号' placeholder='请输入手机号码' defaultText={this.state.mobile} changeText={(text) => {
                    this.setState({ mobile: text });
                }}  refName="m6" />

                <ViewLine width={contentWidth + 5} />

                <InputView label='验证码' placeholder='请输入验证码' defaultText={this.state.mobileCode} changeText={(text) => {
                    this.setState({ mobileCode: text });
                }} isCode={true} mobile={this.state.mobile} 
                method={MobileCodeView.getCodeType.recharge}  refName="m7" />

            </View>
        );
    }

    saveClick() {
        this.setState({ disabledBtn: true });
        UserData.saveInfo(this.state.mobile, this.state.sex, (res) => {
            this.setState({ disabledBtn: false });
            this.props.navigation.goBack();
        }, (err) => {
            this.setState({ disabledBtn: false });
        });
    }

    render() {
        return (
            <TouchableWithoutFeedback onPressIn={Keyboard.dismiss}>
                <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'white',justifyContent:'center' }}>
                    <ScrollView
                        ref="scrollView"
                        contentContainerStyle={{ flex: 1 ,alignItems: 'center'}}>
                        {this.getMoneyView()}
                        {this.getUserCardView()}
                        {this.getMobileView()}

                        <Button title='两个小时内到账，确认充值' source={require('../../images/user/loginReg/blue_style_btn_bg.png')}
                            buttonStyle={styles.loginButton} textStyle={{ color: 'white', fontSize: 18 }}
                            contentViewStyle={[styles.loginButton]} onPress={() => this.saveClick()} disabled={this.state.disabledBtn} />
                    </ScrollView>
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
        height: 65,
    }
});