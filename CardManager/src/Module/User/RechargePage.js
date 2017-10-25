
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

import UserData from '../../Data/Interface/UserData'
import UserInfo from '../../Data/Interface/UserInfo'
import Button from '../../Component/Button'
import TextField from '../../Component/TextField'
import PickerWidget from '../../Component/PickerWidget'
import ColorUtil from './../../Util/ColorUtil'
import Util from './../../Util/Util'
import CommonStyle from './../../Util/CommonStyle'
import ViewLine from '../../Component/ViewLine'
import ToastUtil from '../../Component/ToastUtil'
import RightIconView from '../../Component/ItemView/RightIconView'
import CardMoneyData from '../../Data/Interface/CardMoneyData'


var Dimensions = require('Dimensions');
var deviceWidth = Dimensions.get('window').width;
var deviceHeight = Dimensions.get('window').height;
var contentViewWidth = deviceWidth - 20;
var contentWidth = contentViewWidth - 30;

var userInfo = new UserInfo();

var __this = undefined;

/**
 * 提现
 */
export default class WithdrawPage extends Component {

    static navigationOptions = {
        title: '充值',
    }
    constructor(props) {
        super(props);
        __this = this;
        this.state = {
            nickName: userInfo.getUserInfo().user_nike,

            selectCard: '招商银行(7890)',
            disabledBtn: false,
        }

    }

    rightBtnClick() {
        this.props.navigation.navigate('BookList', { selectType: CardMoneyData.ConsumeDealType.withdraw });
    }

    cardClick() {
        if (this.refs.pickCardSex) {
            this.refs.pickCardSex.show('bbb', (index) => {
                this.setState({ selectCard: index });
            })
        }

    }

    saveClick() {

    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'white' }}>

                <View style={[CommonStyle.styles.viewBorder, { width: contentViewWidth, alignItems: 'center', justifyContent: 'center', marginTop: 20 }]}>

                    <View style={{ width: contentWidth, height: 180, justifyContent: 'center' }} >

                        <TouchableHighlight activeOpacity={0.6}
                            underlayColor={'transparent'} onPress={() => this.cardClick()} key={"1"} style={{ flex: 1 }}>
                            <View style={{ marginTop: 15, flexDirection: 'row', width: contentWidth, height: 60 }}>
                                <Text style={{ textAlign: 'right', width: 60, color: ColorUtil.grayColor, marginTop: 5 }}>信用卡</Text>
                                <View style={{ marginLeft: 10, marginTop: 4, width: contentWidth - 90 }}>
                                    <Text style={{ fontSize: 15 }}>招商信用卡  (9999)</Text>
                                    <Text style={{ color: ColorUtil.grayColor, marginTop:5 }}>银行单笔限额10000元</Text>
                                </View>
                                <RightIconView style={{ marginTop: 10 }} />
                            </View>
                        </TouchableHighlight>

                        <ViewLine width={contentWidth} />
                        <Text style={{ color: ColorUtil.grayColor, fontSize: 14, marginTop: 10 }}>充值金额</Text>
                        <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center', }}>
                            <Text style={{ fontSize: 28, marginLeft: 75 }}>￥</Text>
                            <TextField style={{ flex: 1, fontSize: 26 }} />
                        </View>

                    </View>
                </View>

                <Button title='两个小时内到账，确认提现' source={require('../../images/user/loginReg/blue_style_btn_bg.png')}
                    buttonStyle={{ width: deviceWidth - 50, height: 65, marginTop: 10, }} textStyle={{ color: 'white', fontSize: 18 }}
                    onPress={() => this.saveClick()} disabled={this.state.disabledBtn} />

                <PickerWidget options={["中国银行(7890)", "招商银行(7890)"]} ref="pickCardSex" defaultVal={this.state.selectCard} />

            </View>
        );
    }

}

const styles = StyleSheet.create({
    loginButton: {
        width: deviceWidth - 50,
        height: 65,
        marginTop: 10,
    }

});