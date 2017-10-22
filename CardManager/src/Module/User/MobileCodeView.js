import React, { Component, PropTypes } from 'react';
import {
    View,
    Image,
    Text,
    TouchableWithoutFeedback,
    TextInput,
    StyleSheet,
    Keyboard,
    Animated,
    ScrollView,
    Alert,
} from 'react-native';
import Button from '../../Component/Button'
import ToastUtil from '../../Component/ToastUtil'
import UserData from '../../Data/Interface/UserData'
import ColorUtil from './../../Util/ColorUtil'

var codeTime = 60;//秒
var codeTitle = "获取验证码";

export default class MobileCodeView extends Component {

    /**
     * register 注册
     * forgetPass 忘记密码
     * recharge 
     */
    static getCodeType = {register:'register',
    forgetPass:'forgetPassword',
    recharge:'recharge'};

    constructor(props) {
        super(props);
        this.state = {
            codeTitle: codeTitle,
            codeTime: codeTime,
            codeTitleColor: ColorUtil.styleColor,
            codeBtnDisable: false,
            registerBtnDisable: false,
        };
    }

    getSuccess(isSuccess) {
        if (this.props.callBack) {
            this.props.callBack(isSuccess);
        }
    }

    /**
     * 获取验证码方法
     */
    getMobileCode() {
        var method = this.props.method;
        if(method === undefined){
            ToastUtil.showError("method不能为空");
        }
        else if (this.props.mobile === undefined && this.props.mobile.length === 0){
            ToastUtil.showError("手机号码不能为空");
        }else if (!this.state.isGetCoding && this.state.codeTitle === codeTitle) {
            this.setState({ isGetCoding: true });
            UserData.getMobileCodeMethod(this.props.mobile,this.props.method, (res) => {
                this.setState({ isGetCoding: false });
                this._runCodeTime();
                this.getSuccess(true);
            }, (error) => {
                this.getSuccess(false);
                this.setState({ isGetCoding: false });
            });
        }
    }
    /**
     * 验证码获取计时器
     */
    _runCodeTime() {
        this.setState({ codeBtnDisable: true });
        this._timer = setInterval(function () {
            this.setState({ codeTime: this.state.codeTime - 1 });
            this.setState({ codeTitle: this.state.codeTime + "s后重发", codeTitleColor: ColorUtil.grayColor });

            if (this.state.codeTime == 1) {
                _this._stopCodeTime();
                this.setState({ codeTitle: codeTitle, codeTitleColor: ColorUtil.styleColor, codeBtnDisable: false });
            }
        }.bind(this), 1000);
    }
    //停止验证码获取时间计时
    _stopCodeTime() {
        clearInterval(this._timer);
    }

    componentWillUnmount() {
        this._stopCodeTime();
    }
    render() {
        return (
            <View style={{}}>
                <Button title={this.state.codeTitle} disabled={this.state.codeBtnDisable}
                    buttonStyle={{ borderWidth: 1, borderRadius: 2, borderColor: this.state.codeTitleColor, width: 90, height: 30 }}
                    textStyle={{ color: this.state.codeTitleColor, fontSize: 13 }}
                    onPress={() => this.getMobileCode()} />
            </View>
        )
    };
}
