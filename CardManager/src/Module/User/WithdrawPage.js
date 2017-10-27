
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
import Router from './../../Util/Router'
import CommonStyle from './../../Util/CommonStyle'
import ViewLine from '../../Component/ViewLine'
import ToastUtil from '../../Component/ToastUtil'
import ItemView from '../../Component/ItemView/ItemView'
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
        title: '提现',
        headerRight: (<Button
            title='记录'
            textStyle={{ color: 'white', fontSize: 16 }}
            buttonStyle={{ width: 70, height: 40 }}

            onPress={() => __this.rightBtnClick()}
        />)
    }
    constructor(props) {
        super(props);
        __this = this;
        this.state = {
            nickName: userInfo.getUserInfo().user_nike,
            banlce: userInfo.getUserInfo().balance,
            selectCard: '招商银行(7890)',
            disabledBtn: false,
        }

    }

    rightBtnClick() {
        this.props.navigation.navigate('BookList', { selectType: CardMoneyData.ConsumeDealType.withdraw });
    }

    componentDidMount() {
        this.getCardList();
    }

    getCardList(callBack) {
        this.cardNameList = [];
        this.cardList = [];
        CardMoneyData.getCreditList((res) => {
            this.cardNameList = [];
            this.cardList = [];

            this.cardList = res;
            for (var i in res) {
                var item = res[i];
                var cardName = item.credit_card_num;
                if (cardName.length > 4) {
                    cardName = cardName.substring(cardName.length - 4, cardName.length);
                }
                this.cardNameList.push('招商银行  (' + cardName + ')');
            }
            this.cardInfo = this.cardList[0];
            this.setState({ selectCard: this.cardNameList[0] });
            if (callBack) {
                callBack();
            }
        }, undefined);
    }

    cardClick() {
        if (this.cardNameList.length === 0) {
            this.getCardList(() => {
                this.showSelectCard()
            });
        } else {
            this.showSelectCard()
        }

    }

    showSelectCard() {
        this.refs.pickCardSex.show(0, (value, parent) => {
            this.setState({ selectCard: value });
            for (var i in this.cardNameList) {
                if (this.cardNameList[i] === value) {
                    this.cardInfo = this.cardList[i];
                }
            }
        }, this.cardNameList)
    }

    saveClick() {
        if(parseFloat(this.state.banlce)<=0){
            ToastUtil.showError("没有可用的余额");
        }else{
            
            var isR = CardMoneyData.withdraw(this.cardInfo.credit_card_num, this.state.money, (res) => {
                this.setState({ disabledBtn: false });
                Router.goBack(this);
            }, (err) => {
                this.setState({ disabledBtn: false });
            });
            if (isR) {
                this.setState({ disabledBtn: true });
            }
        }
        
    }

    clickAll() {
        if(parseFloat(this.state.banlce)<=0){
            ToastUtil.showError("没有可用的余额");
        }else{
            this.setState({ money: this.state.banlce+'' })
        }
    }


    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'white' }}>

                <View style={{ marginTop: 10 }}>
                    <ItemView data={[{ title: this.state.selectCard, icon: require('../../images/me/zhaoshang_icon.png'), id: '7' }]} onItemClick={(item) => __this.cardClick(item)} />
                </View>

                <View style={[CommonStyle.styles.viewBorder, { width: contentViewWidth, alignItems: 'center', justifyContent: 'center' }]}>
                    <View style={{ width: contentWidth, height: 150, justifyContent: 'center' }} >
                        <Text style={{ color: ColorUtil.grayColor, fontSize: 14, marginTop: 10 }}>提现金额</Text>
                        <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center', }}>
                            <Text style={{ fontSize: 28 }}>￥</Text>
                            <TextField style={{ flex: 1, fontSize: 26 }} defaultValue={this.state.money}  onChangeText={(text) => this.setState({money:text})}/>
                        </View>
                        <ViewLine width={contentWidth} />
                        <View style={{ height: 54, alignItems: 'center', flexDirection: 'row' }}>
                            <Text style={{ color: ColorUtil.grayColor, fontSize: 16, flex: 1 }}>账户余额：￥{this.state.banlce}</Text>
                            <Button title='全部提现' textStyle={{ color: ColorUtil.styleColor, fontSize: 16 }} onPress={() => this.clickAll()}/>
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