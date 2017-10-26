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

const UserData = {
    /**
     * 注册
     * params : 手机号，密码，验证码，邀请码，成功回调，失败回调
     */
    register: (mobile, password, mobileCode, code, success, fail) => {

        if (mobile === undefined || mobile.length < 0) {
            ToastUtil.showError("请输入手机号");
            return false;
        }
        if (password === undefined || password.length < 6) {
            ToastUtil.showError("请输入密码至少6位");
            return false;
        }
        if (mobileCode === undefined || mobileCode.length < 1) {
            ToastUtil.showError("请输入验证码");
            return false;
        }
        if (code === undefined || code.length < 1) {
            ToastUtil.showError("请输入邀请码");
            return false;
        }

        var params = { "user_phone": mobile, "verification_code": mobileCode, "user_password": password };
        params["register_code"] = code;
        DataUtil.getWithTip(DataUtil.GetUrl('register'), params, success, fail);
        return true;

    },
    /**
     * 获取验证码 method 运用到的接口名称:注册用 register
     * 
     */
    getMobileCodeMethod: (mobile, method, success, fail) => {
        DataUtil.getWithTip(DataUtil.GetUrl('getVerificationCode'), { 'user_phone': mobile, 'method': method }, success, fail);
    },
    /**
     * 注册获取验证码
     */
    getMobileCode: (mobile, success, fail) => {
        UserData.getMobileCodeMethod(mobile, ApiNames.register, success, fail);
    },
    /**
     * 忘记密码获取验证码
     */
    getMobileCodeForgetPW: (mobile, success, fail) => {
        UserData.getMobileCodeMethod(mobile, ApiNames.forgetPassword, success, fail);
    },
    /**
     * 登录，mobile:手机号, password:密码
     */
    login: (mobile: string, password: string, success, fail) => {

        if (Util.isEmpty(mobile)) {
            ToastUtil.showError("手机号不能为空");
        } else if (Util.isEmpty(password) || password.length < 6) {
            ToastUtil.showError("密码不能为空(长度不能小于6)");
        } else {
            DataUtil.postWithTip('login', { 'user_account': mobile, 'user_password': password }, (res) => {
                saveUserInfo(res);
                if (success) {
                    success(res);
                }
            }, fail);
        }
    },
    /**
     * 重置密码  mobile:手机号  password：密码 mobileCode:验证码
     */
    reSetPassword: (mobile, password, mobileCode, success, fail) => {
        if (Util.isEmpty(mobile)) {
            ToastUtil.showError("手机号不能为空");
        } else if (Util.isEmpty(password) || password.length < 6) {
            ToastUtil.showError("请输入密码至少6位");
        } else if (Util.isEmpty(mobileCode)) {
            ToastUtil.showError("请输入验证码");
        } else {
            DataUtil.getWithTip('forgetPassword', { 'user_phone': mobile, 'user_password': password, 'verification_code': mobileCode }, success, fail);
        }
    },
    saveInfo: (nickName, sex, success, fail) => {
        if (Util.isEmpty(sex)) {
            ToastUtil.showError("请选择性别");
            return false;
        } else if (Util.isEmpty(nickName)) {
            ToastUtil.showError("请输入昵称");
            return false;
        } else {
            var user_sex = 1;
            if (sex === '女' || sex == '0') {
                user_sex = 0;
            }
            DataUtil.postWithTip('user/editUserInfo', { 'user_nike': nickName, 'user_sex': user_sex }, (res) => {
                saveUserInfo(res);
                if (success) {
                    success(res);
                }
            }, fail);
            return true;
        }
    },
    updatePassword: (oldPass, newPass, okPass, success, fail) => {
        if (Util.isEmpty(oldPass) || oldPass.length < 6) {
            ToastUtil.showError("请输入原密码至少6位");
            return false;
        } else if (Util.isEmpty(newPass) || newPass.length < 6) {
            ToastUtil.showError("请输入新密码至少6位");
            return false;
        } else if (Util.isEmpty(okPass) || okPass.length < 6) {
            ToastUtil.showError("请输入确定密码至少6位");
            return false;
        } else if (okPass !== newPass) {
            ToastUtil.showError("新密码和确认密码不一致");
            return false;
        } else {
            DataUtil.postWithTip('user/editPassword', { 'user_password': okPass, 'old_password': oldPass }, success, fail);
            return true;
        }

    },
    getConfig: (success,fail) => {
        DataUtil.getCacheAsyncForKey('appConfig',(value)=>{
            if(value && success){
                success(JSON.parse(value));
            }
        });
        DataUtil.post('getAppConfig', {}, (res)=>{
            if(success){
                success(res.data);
            }
            DataUtil.saveCacheForKeyValue('appConfig',res.data);
        }, fail);        
    },
    /**
     * 初始化数据
     */
    initData: () => {
        getUserInfo();
    },
    /**
     * 退出登录
     */
    loginOut: () => {
        userInfo.setUserInfo({});
    },
    /**
     * 获取上次登录的账户
     */
    getLoginAccount: (callBack) => {
        AsyncStorage.getItem("loginAccount").then((value) => {

            if (callBack) {
                callBack(value);
            }
        });
    }

}

const saveUserInfo = (res) => {
    try {
        var uInfo = userInfo.getUserInfo();

        if(uInfo === undefined){
            uInfo = {};
        }
        
        for(var key in res.data){
            uInfo[key] = res.data[key];
        }
        userInfo.setUserInfo(uInfo);
        DeviceEventEmitter.emit("loginSuccess");
        AsyncStorage.setItem("loginAccount", uInfo.user_account);
        AsyncStorage.setItem(userInfoKey, JSON.stringify(uInfo));
    } catch (error) {
        console.log(error);
    }
}

const getUserInfo = (callBack) => {
    try {
        return AsyncStorage.getItem(userInfoKey).then((value) => {
            var jsonValue = JSON.parse(value);
            if (jsonValue === null || jsonValue === undefined) {
                jsonValue = {};
            }
            userInfo.setUserInfo(jsonValue);
            if (callBack) {
                callBack(jsonValue);
            }
        });
    } catch (error) {
        console.log(error);
    }
}


export default UserData;