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
import ListViewRefresh from '../../Component/ListViewRefresh'

var Dimensions = require('Dimensions');
var deviceWidth = Dimensions.get('window').width;
var deviceHeight = Dimensions.get('window').height;
var contentWidth = deviceWidth - 20;

var __this = undefined;

//账单日，还款日
var dayArray = [];

export default class CardPlanPage extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.title,
        backTitle: ''
    });

    constructor(props) {
        super(props);
        for(var i=1;i<32;i++){
            dayArray.push(i+'');
        }
        this.state = {
            disabledBtn: false,
            repayment_date: '12',
            repayment_type: '',
            repayment_money: '',
            repayment_count: '1',
            dataSource: ['', '', '', '', '', '', '', '', '', '', '', '',],
            dayDataSource:dayArray;
        };
        __this = this;
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
                    <InputView contentWidth={contentWidth} label='还款日期' placeholder='' defaultText={this.state.repayment_date} changeText={(text) => {

                    }} refName="m1" editable={false} key='c1' valueStyle={{ textAlign: 'right' }} onPress={() => console.log('')} />
                    <ViewLine width={contentWidth} />
                    <InputView contentWidth={contentWidth} label='还款类型' placeholder='' defaultText={this.state.repayment_type} changeText={(text) => {

                    }} refName="m2" editable={false} key='c2' valueStyle={{ textAlign: 'right' }} onPress={() => console.log('')} />
                    <ViewLine width={contentWidth} />
                    <InputView contentWidth={contentWidth} label='还款总金额' placeholder='' defaultText={this.state.repayment_money} changeText={(text) => {

                    }} refName="m3" key='c3' valueStyle={{ textAlign: 'right' }} />
                    <ViewLine width={contentWidth} />
                    <InputView contentWidth={contentWidth} label='拆分笔数' placeholder='' defaultText={this.state.repayment_count} changeText={(text) => {

                    }} refName="m4" editable={false} key='c4' isBtnAdd={true} />


                </View>

            </View>
        );
    }

    renderCardRow(rowData, sectionID: number, rowID: number) {
        return (
            <View style={{ height: 44, width: deviceWidth - 10, alignItems: 'center', flexDirection: 'row' }}>
                <Text style={{ width: deviceWidth / 3.0, textAlign: 'left',marginLeft:5 }}>2017-09-11</Text>
                <Text style={{ flex: 1, textAlign: 'right',marginRight:5 }}>快速还款:￥400.00</Text>
            </View>
        );
    }

    getPlanListView() {
        return (
            <View style={[CommonStyle.styles.viewBottomBorder, {
                justifyContent: 'center',
                marginTop: 35,
                alignItems: 'center', width: deviceWidth
            }]}>
                <View style={[{ flexDirection: 'row', height: 44, backgroundColor: 'white' }, CommonStyle.styles.viewBottomTop]}>
                    <View style={{ width: deviceWidth / 2.0, height: 44, alignItems: 'flex-start', justifyContent: 'center' }}>
                        <Text style={{marginLeft:10}}>本期未提交计划列表</Text>
                    </View>
                    <View style={{ width: deviceWidth / 2.0, height: 44, alignItems: 'flex-end', justifyContent: 'center' }}>
                        <Button title='清空' textStyle={{ color: ColorUtil.styleColor }} buttonStyle={{width:50,height:30}}/>
                    </View>
                </View>
                <ViewLine width={deviceWidth} />
                <ListViewRefresh ref="listView" dataSource={__this.state.dataSource}
                    renderRow={__this.renderCardRow}
                    onRefresh={() => {
                        __this.refreshData();
                    }} onMore={null} style={{ flex: 1 }} />
            </View>
        );
    }

    render() {
        return (
            <TouchableWithoutFeedback onPressIn={Keyboard.dismiss}>
            <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'white', justifyContent: 'center' }}>

                <ScrollView
                    ref="scrollView"
                    contentContainerStyle={{ alignItems: 'center', backgroundColor: 'white' }}>
                    {this.getCardInfoView()}
                    <Button title='新增计划到列表' source={require('../../images/user/loginReg/blue_style_btn_bg.png')}
                        buttonStyle={{ marginTop: 10, width: contentWidth, height: 65, }} textStyle={{ color: 'white', fontSize: 18 }}
                        onPress={() => this.saveClick()} disabled={this.state.disabledBtn} />
                    {this.getPlanListView()}
                </ScrollView>
                <PickerWidget options={this.state.dayDataSource} ref="pickCardSex" defaultVal={this.state.selectCard} />
                </View>

            </TouchableWithoutFeedback>
        );
    }

}