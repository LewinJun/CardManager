import React, { Component, PropTypes } from 'react';
import {
    View,
    Image,
    Text,
    TouchableHighlight,
    TouchableWithoutFeedback,
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
import PickerWidget from '../../Component/PickerWidget'
import ColorUtil from './../../Util/ColorUtil'
import Util from './../../Util/Util'
import ViewLine from '../../Component/ViewLine'
import ToastUtil from '../../Component/ToastUtil'
import TextField from '../../Component/TextField'
import InputView from '../../Component/InputUtilView'



var Dimensions = require('Dimensions');
var deviceWidth = Dimensions.get('window').width;
var deviceHeight = Dimensions.get('window').height;
var contentViewWidth = deviceWidth - 20;
var contentWidth = contentViewWidth - 40;

var userInfo = new UserInfo();

export default class UserInfoPage extends Component {

    static navigationOptions = {
        title: '基本资料',
    }
    constructor(props) {
        super(props);
        this.state = {
            userInfo: userInfo.getUserInfo(),
            nickName: userInfo.getUserInfo().user_nike,
            sex: userInfo.getUserInfo().user_sex,
            sexStr: userInfo.getUserInfo().user_sex == '1'?'男':'女',
            mobile: userInfo.getUserInfo().user_phone,
            userName: userInfo.getUserInfo().user_name,
            card: userInfo.getUserInfo().user_id_card,
            disabledBtn:false,
        }
    }

    _sexClick(){
        Keyboard.dismiss();
        this.refs.pickSex.show('aaa',(index)=>{
            this.setState({sex:index});
            this.setState({sexStr:index == '1'?'男':'女'});
        })
    }

    getUserInfoView() {

        return (
            <View style={[styles.inputContentView, { marginTop: 20 }]}>
                {this.getInputView('昵称','请输入昵称', this.state.nickName, (text) => {
                    this.setState({ nickName: text });
                })}
                <ViewLine width={contentWidth + 5} />
                <View style={{
                    width: contentWidth, height: 50, flexDirection: 'row',
                    alignItems: 'center', justifyContent: 'center',
                    backgroundColor: 'transparent', marginLeft: 0,
                }}>
                    <Text style={{ color: ColorUtil.grayTextColor, fontSize: 16 }}>性别</Text>
                    <TouchableHighlight style={{ flex: 1 ,marginLeft:20}} activeOpacity={0.6}
                        underlayColor={'transparent'} onPress={() => this._sexClick()} key={this.props.keyId} disabled={this.props.disabled}>
                        <Text style={{ fontSize: 16 }}>{this.state.sexStr}</Text>

                    </TouchableHighlight>
                    <Image source={require('../../images/list_right.png')} style={{ width: 10, height: 15 }} resizeMode='stretch' />

                </View>
                <ViewLine width={contentWidth + 5} />
                {this.getInputView('真实姓名','请输入真实姓名', this.state.userName, (text) => {
                    this.setState({ userName: text });
                })}
            </View>
        );
    }

    getUserCardView() {

        return (
            <View style={[styles.inputContentView, { marginTop: 20 }]}>
           
                <InputView label='身份证' placeholder='请输入身份证号码' defaultText={this.state.card} changeText={(text) => {
                    this.setState({ card: text });
                }}  refName="m6" editable = {false}/>
                <ViewLine width={contentWidth + 5} />
                
                <InputView label='手机号码' placeholder='请输入手机号' defaultText={this.state.mobile} changeText={(text) => {
                    this.setState({ mobile: text });
                }}  refName="m6" editable = {false}/>

            </View>
        );
    }

    getInputView(label,placeHolder, defaultText, changeText,) {

        return (
            <View style={{
                width: contentWidth, height: 50, flexDirection: 'row',
                alignItems: 'center', justifyContent: 'center',
                backgroundColor: 'transparent', marginLeft: 0,
            }}>
                <Text style={{ color: ColorUtil.grayTextColor, fontSize: 16 }}>{label}</Text>
                <TextField style={{ marginLeft: 20, flex: 1 }} placeholder = {placeHolder} onChangeText={(text) => changeText(text)} defaultValue={defaultText} />
            </View>
        );
    }

    saveClick() {
        this.setState({disabledBtn:true});
        UserData.saveInfo(this.state.nickName, this.state.sex, (res)=>{
            this.setState({disabledBtn:false});
            this.props.navigation.goBack();
        },(err)=>{
            this.setState({disabledBtn:false});
        });
    }

    render() {
        return (
            <TouchableWithoutFeedback onPressIn={Keyboard.dismiss}>
            <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'white' }}>
                {this.getUserInfoView()}
                {this.getUserCardView()}

                <Button title='修改' source={require('../../images/user/loginReg/blue_style_btn_bg.png')}
                    imageStyle={styles.loginButton} buttonStyle={styles.loginButton} textStyle={{ color: 'white', fontSize: 18 }}
                    contentViewStyle={[styles.loginButton]} onPress={() => this.saveClick()} disabled={this.state.disabledBtn} />
                <PickerWidget options={["男", "女"]} ref="pickSex" defaultVal = {this.state.sexStr}/>
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
        elevation: 0.6,
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