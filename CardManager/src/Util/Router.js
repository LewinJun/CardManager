import React, { Component, PropTypes } from 'react';


const pushPage = (_this, pageName, param) => {
   
    var params = {};
    if (param) {
        params = param;
    }
    if (pageName.indexOf('http') === 0) {
        params.url = pageName;
        _this.props.navigation.navigate('WebViewPage', params);
    } else {
        _this.props.navigation.navigate(pageName, params);
    }
    _this.props.commOut = true;
}

/**
 * 
 */
const pageNames = {
    login: 'Login',
    webView: 'WebViewPage',
    ForgetPassWord: 'ForgetPassWord',
    UserInfo: 'UserInfo',
    UpdatePassword: 'UpdatePassword',
    Recharge: 'Recharge',
    WithdrawPage: 'WithdrawPage',
    BookList: 'BookList',
    NoticePage:'NoticePage',
    NoticeDetailPage:'NoticeDetailPage',
    AddCardPage:'AddCardPage',
    CardDetailPage:'CardDetailPage',
    CardPlanPage:'CardPlanPage',
};

export default {
    pushPage,
    pageNames,
};