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
import PickerWidget from '../../Component/PickerWidget'
import CommonStyle from './../../Util/CommonStyle'
import ColorUtil from './../../Util/ColorUtil'
import ListViewRefresh from '../../Component/ListViewRefresh'
import ToastUtil from '../../Component/ToastUtil'

var Dimensions = require('Dimensions');
var deviceWidth = Dimensions.get('window').width;
var deviceHeight = Dimensions.get('window').height;
var contentWidth = deviceWidth - 20;

var __this = undefined;

//账单日，还款日
var dayArray = [];
var repaymentArray = ['消费计划', '还款计划'];

var cardInfo = {};

export default class CardPlanPage extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.title,
        headerRight: (<Button
            title='提交计划'
            textStyle={{ color: 'white', fontSize: 16 }}
            buttonStyle={{ width: 70, height: 40 }}
            disabled={navigation.state.disabled}
            onPress={() => __this.rightBtnClick()}
        />),
    });

    constructor(props) {
        super(props);
        cardInfo = this.props.navigation.state.params.data;
        for (var i = 1; i < 32; i++) {
            dayArray.push(i + '');
        }
        this.planList = [];
        this.state = {
            disabledBtn: false,
            repayment_date: '12',
            repayment_type: '',
            repayment_money: '',
            repayment_count: '1',
            dataSource: ['', '', '', '', '', '', '', '', '', '', '', '',],
            planList: [],
            dayDataSource: dayArray,
        };
        __this = this;
    }

    addPlanClick() {
        var type = 1;
        if (this.state.repayment_type === repaymentArray[1]) {
            type = 2;
        }
        var params = CardMoneyData.previewPlan(this.state.repayment_date, type, this.state.repayment_money, cardInfo.credit_card_num, this.state.repayment_count, undefined, undefined);
        if (params) {
            this.planList.push(params);
            this.setState({ planList: this.planList });
            this.refs.listView.endRefresh();
        }

    }

    rightBtnClick() {
        if (this.planList.length === 0) {
            ToastUtil.showError("计划列表为空");
        } else {
            this.props.navigation.setState({ disabled: true });
            CardMoneyData.savePlan(this.planList, cardInfo.credit_card_num,
                this.state.repayment_type, (res) => {
                    this.props.navigation.setState({ disabled: false });
                }, (err) => {
                    this.props.navigation.setState({ disabled: false });
                });
        }
    }

    pickClick(index) {
        var array = dayArray;
        if (index === 1) {
            array = repaymentArray;
        }
        this.refs.pickCardSex.show(index, (value, parent) => {
            // this.setState({ selectCard: index });
            if (parent === 0) {
                this.setState({ repayment_date: value });
            } else {
                this.setState({ repayment_type: value });
            }
        }, array)
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

                    }} refName="m1" editable={false} key='c1' valueStyle={{ textAlign: 'right' }} onPress={() => this.pickClick(0)} />
                    <ViewLine width={contentWidth} />
                    <InputView contentWidth={contentWidth} label='还款类型' placeholder='' defaultText={this.state.repayment_type} changeText={(text) => {

                    }} refName="m2" editable={false} key='c2' valueStyle={{ textAlign: 'right' }} onPress={() => this.pickClick(1)} />
                    <ViewLine width={contentWidth} />
                    <InputView contentWidth={contentWidth} label='还款总金额' placeholder='' defaultText={this.state.repayment_money} changeText={(text) => {
                        this.setState({repayment_money: text});
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
                <Text style={{ width: deviceWidth / 3.0, textAlign: 'left', marginLeft: 5 }}>{rowData.start_date}</Text>
                <Text style={{ flex: 1, textAlign: 'right', marginRight: 5 }}>{repaymentArray[rowData.type]}:￥{rowData.money}</Text>
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
                        <Text style={{ marginLeft: 10 }}>本期未提交计划列表</Text>
                    </View>
                    <View style={{ width: deviceWidth / 2.0, height: 44, alignItems: 'flex-end', justifyContent: 'center' }}>
                        <Button title='清空' textStyle={{ color: ColorUtil.styleColor }} buttonStyle={{ width: 50, height: 30 }} />
                    </View>
                </View>
                <ViewLine width={deviceWidth} />
                <ListViewRefresh ref="listView" dataSource={__this.state.planList}
                
                    renderRow={__this.renderCardRow}
                    onRefresh={() => {
                        __this.refreshData();
                    }} onMore={null} style={{ flex: 1 }} />
            </View>
        );
    }


    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'white', justifyContent: 'center' }}>

                <ScrollView
                    ref="scrollView"
                    contentContainerStyle={{ alignItems: 'center', backgroundColor: 'white' }}>
                    {this.getCardInfoView()}
                    <Button title='新增计划到列表' source={require('../../images/user/loginReg/blue_style_btn_bg.png')}
                        buttonStyle={{ marginTop: 10, width: contentWidth, height: 65, }} textStyle={{ color: 'white', fontSize: 18 }}
                        onPress={() => this.addPlanClick()} disabled={this.state.disabledBtn} />
                    {this.getPlanListView()}
                </ScrollView>
                <PickerWidget options={this.state.dayDataSource} ref="pickCardSex" defaultVal={this.state.selectCard} />
            </View>
        );
    }

}