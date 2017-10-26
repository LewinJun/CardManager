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
import CardMoneyData from '../../Data/Interface/CardMoneyData'
import Button from '../../Component/Button'
import InputView from '../../Component/InputUtilView'
import ViewLine from '../../Component/ViewLine'
import CommonStyle from './../../Util/CommonStyle'
import ColorUtil from './../../Util/ColorUtil'

var Dimensions = require('Dimensions');
var deviceWidth = Dimensions.get('window').width;
var deviceHeight = Dimensions.get('window').height;
var contentWidth = deviceWidth - 20;

export default class CardDetailPage extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.title,
        backTitle: ''
    });
    constructor(props) {
        super(props);
        this.state = {
            disabledBtn: false,
            selectIndex: 0,
        };
    }

    selectClick(i) {
        var index = this.state.selectIndex;
        if (i !== index) {
            index = i;
            this.setState({ selectIndex: index });
        }

    }

    getCardInfoView() {
        return (
            <View style={[CommonStyle.styles.viewBottomBorder, {
                justifyContent: 'center',
                alignItems: 'center', width: deviceWidth
            }]}>
                <View style={[{
                    width: contentWidth, justifyContent: 'center',
                    alignItems: 'center',
                }]} key='vv1'>
                    <InputView label='选择还款' placeholder='' defaultText={this.props.navigation.state.params.data.card} changeText={(text) => {

                    }} refName="m1" editable={false} key='c1' />
                    <ViewLine width={contentWidth} />
                    <InputView label='银行名称' placeholder='' defaultText={this.props.navigation.state.params.data.user_true_name} changeText={(text) => {

                    }} refName="m2" editable={false} key='c2' />
                    <ViewLine width={contentWidth} />
                    <InputView label='账单日' placeholder='' defaultText={this.props.navigation.state.params.data.statement_date} changeText={(text) => {

                    }} refName="m3" editable={false} key='c3' />
                    <ViewLine width={contentWidth} />
                    <InputView label='还款日' placeholder='' defaultText={this.props.navigation.state.params.data.repayment_date} changeText={(text) => {

                    }} refName="m4" editable={false} key='c4' />
                    <ViewLine width={contentWidth} />
                    <InputView label='本期账单' placeholder='' defaultText={this.props.navigation.state.params.data.money} changeText={(text) => {

                    }} refName="m5" editable={false} key='c5' />
                    <ViewLine width={contentWidth} />

                    <Button title='新增计划' source={require('../../images/user/loginReg/blue_style_btn_bg.png')}
                        buttonStyle={{ marginTop: 10, width: contentWidth, height: 65, }} textStyle={{ color: 'white', fontSize: 18 }}
                        onPress={() => this.saveClick()} disabled={this.state.disabledBtn} />
                </View>
            </View>
        );
    }

    getCardBottomView() {
        var textS = (this.state.selectIndex === 0) ? { color: ColorUtil.styleColor } : { color: 'black' };
        var borderS = (this.state.selectIndex === 0) ? {
            borderBottomWidth: 2,
            borderBottomColor: ColorUtil.styleColor
        } : {borderBottomWidth: 0,
            borderBottomColor: 'transparent'};
        var textS1 = (this.state.selectIndex === 1) ? { color: ColorUtil.styleColor } : { color: 'black' };
        var borderS1 = (this.state.selectIndex === 1) ? {
            borderBottomWidth: 2,
            borderBottomColor: ColorUtil.styleColor
        } : {borderBottomWidth: 0,
            borderBottomColor: 'transparent'};
        return (
            <View style={{ width: deviceWidth, height: 300 }}>
                <View style={{ height: 44, width: deviceWidth, flexDirection: 'row', backgroundColor: '#F4F4F4' }}>
                    <Button buttonStyle={[{
                        flex: 1,
                    },borderS]} textStyle={[{  fontSize: 18 },textS]} title='消费计划' onPress={()=>{this.selectClick(0)}} key='btn1'/>
                    <Button buttonStyle={[{
                        flex: 1,
                    },borderS1]} textStyle={[{  fontSize: 18 },textS1]} title='还款计划(未执行)' onPress={()=>{this.selectClick(1)}} key='btn2' />
                </View>
            </View>
        );
    }

    render() {
        return (
            <View style={[{ flex: 1, alignItems: 'center', backgroundColor: 'white' }]}>
                <ScrollView
                    ref="scrollView"
                    contentContainerStyle={{ alignItems: 'center', }}>
                    {this.getCardInfoView()}
                    {this.getCardBottomView()}
                </ScrollView>
            </View>
        );
    }

}