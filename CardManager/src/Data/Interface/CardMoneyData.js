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
var userInfoKey = "user_info";

var userInfo = new UserInfo();

/**
 * 银行卡管理，提现，充值，消费记录
 */
const CardMoneyData = {

}
/**
 * （0刷卡消费，1 快速还款 ，2提现,3充值）
 */
const ConsumeDealType = {
    all: '-1',
    payCard: '0',
    repayment: '1',
    withdraw: '2',
    recharge: '3',
}

export default { CardMoneyData,ConsumeDealType };