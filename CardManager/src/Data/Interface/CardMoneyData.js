/**
 * 用户业务数据类，注册，获取验证码，登录，修改用户信息等
 */
import React, { Component, PropTypes } from 'react';
import {
    View,
    Platform,
    DeviceEventEmitter,
    AsyncStorage,
} from 'react-native';
import DataUtil from './DataUtil'
import NetworkManager from '../Network/NetworkManager'
import ToastUtil from '../../Component/ToastUtil'
import Util from '../../Util/Util'
import UserInfo from './UserInfo'
import ApiNames from './DataApiName'
var userInfoKey = "user_info";

var userInfo = new UserInfo();

/**
 * 16
card
:
"****  ****  ****  ****  3123"
credit_card_num
:
"123123123"
id
:
28
money
:
"10.00"
repayment_date
:
"20150626"
state
:
0
statement_date
:
"20150602"
user_id
:
28
user_id_card
:
"111122222222222222222"
user_true_name
:
"欧阳小米"
 */

/**
 * 银行卡管理，提现，充值，消费记录
 */
const CardMoneyData = {

    CardConfig: {
        DeviceEventEmitterAddSuccess: 'addCreditSuccess',
        DeviceEventEmitterLoginSuccess: 'loginSuccess',
    },

    /**
     * 添加信用卡
     */
    addCredit: (cardNum: String, cvn: String, time: String, statement: String, repayment: String, phone: String, success: Function, fail: Function) => {
        if (cardNum === undefined || cardNum.length !== 16) {
            ToastUtil.showError('信用卡号码为16位');
            return false;
        }
        if (Util.isEmpty(time)) {
            ToastUtil.showError('信用卡有效时间不能为空');
            return false;
        }
        if (Util.isEmpty(statement)) {
            ToastUtil.showError('账单日不能为空');
            return false;
        }
        if (Util.isEmpty(repayment)) {
            ToastUtil.showError('还款日不能为空');
            return false;
        }
        if (Util.isEmpty(phone)) {
            ToastUtil.showError('电话号码不嫩为空');
            return false;
        }
        var params = {
            credit_card_num: cardNum,
            cvn2: cvn,
            expiry_time: time,
            statement_date: statement,
            repayment_date: repayment,
            user_phone: phone,
        };
        DataUtil.postWithTip(ApiNames.addCredit, params, (res) => {
            DeviceEventEmitter.emit(CardMoneyData.CardConfig.DeviceEventEmitterAddSuccess);
            if (success) {
                success(res);
            }
        }, fail);
        return true;
    },
    /**
     * 获取信用卡列表
     */
    getCreditList: (success, fail) => {
        if (!userInfo.isLogin()) {
            if (success) {
                success([]);
            }
            return;
        }
        DataUtil.getCacheAsyncForKey(ApiNames.getCreditList, (value) => {
            if (value && success) {

                success(JSON.parse(value));
            }
        });
        if (userInfo.isLogin()) {
            DataUtil.post(ApiNames.getCreditList, {}, (res) => {
                if (res) {
                    DataUtil.saveCacheForKeyValue(ApiNames.getCreditList, res.data);
                }
                if (success) {
                    success(res.data);
                }
            }, fail);
        }
    },

    /**
     * 保存信用卡计划
     */
    savePlan: (data: Array, creditNum: String, type: Number, success: Function, fail: Function) => {
        if (Util.isEmpty(data)) {
            ToastUtil.showError("预览计划不能为空");
            return false;
        }

        if (Util.isEmpty(creditNum)) {
            ToastUtil.showError("还款金额不能为空");
            return false;
        }

        if (Util.isEmpty(type)) {
            ToastUtil.showError("还款类型不能为空");
            return false;
        }
        var params = {
            data: data,
            type: type,
            credit_card_num: creditNum,
        }
        DataUtil.postWithTip(ApiNames.planSave, params, success, fail);
        return true;
    },
    getOrderList: (type, success, fail) => {
        if (!userInfo.isLogin()) {
            if (success) {
                success([]);
            }
            return;
        }
        var params = {};
        if (type !== CardMoneyData.ConsumeDealType.all) {
            params.type = type;
        }
        DataUtil.post(ApiNames.orderList, params, success, fail);
    },
    /**
     * 预览信用卡计划
     */
    previewPlan: (planDate: String, type: Number, money: String, creditNum: String, planNum: Number, success: Function, fail: Function) => {
        if (Util.isEmpty(planDate)) {
            ToastUtil.showError("计划日期不能为空");
            return undefined;
        }
        if (Util.isEmpty(type)) {
            ToastUtil.showError("还款类型不能为空");
            return undefined;
        }
        if (Util.isEmpty(money)) {
            ToastUtil.showError("还款金额不能为空");
            return undefined;
        }
        // if (Util.isEmpty(creditNum)) {
        //     ToastUtil.showError("信用卡号不能为空");
        //     return false;
        // }
        if (Util.isEmpty(planNum)) {
            ToastUtil.showError("计划笔数不能为空");
            return undefined;
        }
        var params = {
            plan_date: planDate,
            type: type,
            money: money,
            credit_card_num: creditNum,
            plan_num: planNum,
        }
        // DataUtil.postWithTip(ApiNames.planPreview, params, success, fail);

        return params;
    },
    recharge: (credit_card_num, money, success, fail) => {
        if (Util.isEmpty(credit_card_num)) {
            ToastUtil.showError("充值卡号不能为空");
            return false;
        }

        if (Util.isEmpty(money)) {
            ToastUtil.showError("充值金额不能为空");
            return false;
        }
        var params = {
            credit_card_num: credit_card_num,
            money: money
        }
        DataUtil.postWithTip(ApiNames.recharge, params, (res) => {
            if (success) {
                success(res);
            }
            if (!userInfo.getUserInfo().balance) {
                userInfo.getUserInfo().balance = money;
            } else {
                userInfo.getUserInfo().balance = parseFloat(userInfo.getUserInfo().balance) + parseFloat(money);
            }

            DeviceEventEmitter.emit("loginSuccess");
        }, fail);
        return;
    },
    withdraw: (credit_card_num, money, success, fail) => {
        if (Util.isEmpty(credit_card_num)) {
            ToastUtil.showError("提现卡号不能为空");
            return false;
        }

        if (Util.isEmpty(money)) {
            ToastUtil.showError("提现金额不能为空");
            return false;
        }
        if (parseFloat(userInfo.getUserInfo().balance) < parseFloat(money)) {
            ToastUtil.showError("提现金额已超出余额");
            return false;
        }
        var params = {
            credit_card_num: credit_card_num,
            trade_money: money
        }
        DataUtil.postWithTip(ApiNames.withdraw, params, success, fail);
        return;
    },
    /**
     * （0刷卡消费，1 快速还款 ，2提现,3充值）
     */
    ConsumeDealType: {
        all: '-1',
        payCard: '0',
        repayment: '1',
        withdraw: '2',
        recharge: '3',
    },
    ConsumeData: [
        { title: '纯消费', img: '../images/book/chun_xiaofei_icon.png' },
        { title: '快速还款', img: '../images/book/kuaisu_huankuan_icon.png' },
        { title: '提现', img: '../images/book/huankuan_icon.png' },
        { title: '充值', img: '../images/book/kuaisu_huankuan_icon.png' }
    ],

}

export default CardMoneyData;