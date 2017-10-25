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
import ItemCellView from '../../Component/ItemView/ItemCellView'
import MobileCodeView from './../../Module/User/MobileCodeView'


var Dimensions = require('Dimensions');
var deviceWidth = Dimensions.get('window').width;
var deviceHeight = Dimensions.get('window').height;
var contentViewWidth = deviceWidth - 20;
var contentWidth = contentViewWidth - 40;

var userInfo = new UserInfo();

//账单日，还款日
var dayArray = [];
//发卡银行
var bankName = ['中国银行','招商银行','交通银行','建设银行','华夏银行'];

export default class AddCardPage extends Component {

    static navigationOptions = {
        title: '添加信用卡',
    }
    constructor(props) {
        super(props);
        for(var i=1;i<32;i++){
            dayArray.push(i+'');
        }
        this.state = {
            userInfo: userInfo.getUserInfo(),
            nickName: userInfo.getUserInfo().user_nike,
            sex: userInfo.getUserInfo().user_sex,
            mobile: userInfo.getUserInfo().user_phone,
            userName: userInfo.getUserInfo().user_name,
            card: userInfo.getUserInfo().user_id_card,
            disabledBtn: false,
            pickDataSource:dayArray,
        }
        
    }

    pickClick(index){
        if(index === 0){
            this.setState({pickDataSource:bankName});
        }else{
            this.setState({pickDataSource:dayArray});
        }
        this.refs.pickCardSex.show('bbb'+index, (index,parent) => {
            // this.setState({ selectCard: index });
        })
    }

    getContentView() {

        return (
            <View style={[styles.inputContentView, { marginTop: 20 }]}>
                <InputView label='姓名' placeholder='请输入姓名' defaultText={this.state.money} changeText={(text) => {
                    this.setState({ money: text });
                }} refName="m1" />
                <ViewLine width={contentWidth + 5} />


                <InputView label='身份证' placeholder='请输入身份证号码' defaultText={this.state.recharge} changeText={(text) => {
                    this.setState({ recharge: text });
                }} refName="m2" />

                <ViewLine width={contentWidth + 5} />

                <InputView label='信用卡号' placeholder='请输入信用卡号' defaultText={this.state.card} changeText={(text) => {
                    this.setState({ card: text });
                }} refName="m3" />
                <ViewLine width={contentWidth + 5} />

                <InputView label='CVN2' placeholder='请输入信用卡背后三位CVN2' defaultText={this.state.cvn} changeText={(text) => {
                    this.setState({ cvn: text });
                }} refName="m4" />
                <ViewLine width={contentWidth + 5} />

                <InputView label='有效期' placeholder='有效期(月/年)' defaultText={this.state.time} changeText={(text) => {
                    this.setState({ time: text });
                }} refName="m5" />
                <ViewLine width={contentWidth + 5} />
                <ItemCellView titleStyle={{color:ColorUtil.grayTextColor,fontSize:16}} width={contentWidth} item={{ title: '发卡银行' }} key={"l1"} onItemClick={(item) => this.pickClick(0)} />
                <ViewLine width={contentWidth + 5} />
                <ItemCellView titleStyle={{color:ColorUtil.grayTextColor,fontSize:16}} width={contentWidth} item={{ title: '账单日' }} key={"l2"} onItemClick={(item) => this.pickClick(1)} />
                <ViewLine width={contentWidth + 5} />
                <ItemCellView titleStyle={{color:ColorUtil.grayTextColor,fontSize:16}} width={contentWidth} item={{ title: '还款日' }} key={"l3"} onItemClick={(item) => this.pickClick(2)} />
                <ViewLine width={contentWidth + 5} />

                <InputView label='手机号' placeholder='请输入手机号码' defaultText={this.state.mobile} changeText={(text) => {
                    this.setState({ mobile: text });
                }} refName="m6" />

                <ViewLine width={contentWidth + 5} />

                <InputView label='验证码' placeholder='请输入验证码' defaultText={this.state.mobileCode} changeText={(text) => {
                    this.setState({ mobileCode: text });
                }} isCode={true} mobile={this.state.mobile}
                    method={MobileCodeView.getCodeType.recharge} refName="m7" />
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
                <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'white', justifyContent: 'center' }}>
                    <ScrollView
                        ref="scrollView"
                        contentContainerStyle={{ flex: 1, alignItems: 'center' }}>
                        {this.getContentView()}
                        <Text style={{color:'red',backgroundColor:'transparent',fontSize:10,marginTop:10}}>注：添加信用卡即做一笔10元的消费交易作为验证信用卡的正确性</Text>
                        <Button title='添加信用卡' source={require('../../images/user/loginReg/blue_style_btn_bg.png')}
                            buttonStyle={styles.loginButton} textStyle={{ color: 'white', fontSize: 18 }}
                            onPress={() => this.saveClick()} disabled={this.state.disabledBtn} />
                    </ScrollView>
                    <PickerWidget options={this.state.pickDataSource} ref="pickCardSex" defaultVal={this.state.selectCard} />
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