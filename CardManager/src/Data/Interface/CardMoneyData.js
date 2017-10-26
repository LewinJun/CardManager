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
 * 银行卡管理，提现，充值，消费记录
 */
const CardMoneyData = {

    CardConfig: {
        DeviceEventEmitterAddSuccess:'addCreditSuccess',
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
            if(success){
                success(res);
            }
        }, fail);
        return true;
    },
    /**
     * 获取信用卡列表
     */
    getCreditList: (success, fail) => {
        DataUtil.getCacheAsyncForKey(ApiNames.getCreditList, (value) => {
            if (value && success) {
                success(JSON.parse(value));
            }
        });
        DataUtil.post(ApiNames.getCreditList, {}, (res) => {
            if (res) {
                DataUtil.saveCacheForKeyValue(ApiNames.getCreditList, res.data);
            }
            if (success) {
                success(res.data);
            }
        }, fail);
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
    }

}

export default CardMoneyData;