'use strict';

// import React from 'react'
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  View
} from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';

/**
 * 界面对象 开始
 */
import AccountBookPage from './Containers/AccountBookPage'
import HomePage from './Containers/HomePage'
import MePage from './Containers/MePage'
import HuanKuan from './Containers/HuanKuanPage'
import WebViewPage from './Containers/WebViewPage'

//用户模块
import LoginPage from './Module/User/LoginPage'
import RegisterPage from './Module/User/RegisterPage'
import UserInfoPage from './Module/User/UserInfoPage'
import ForgetPassWordPage from './Module/User/ForgetPassWordPage'
import UpdatePasswordPage from './Module/User/UpdatePasswordPage'
import RechargePage from './Module/User/RechargePage'
import WithdrawPage from './Module/User/WithdrawPage'
import NoticePage from './Module/User/NoticePage'
import NoticeDetailPage from './Module/User/NoticeDetailPage'
//信用卡模块
import AddCardPage from './Module/Card/AddCardPage'


import ColorUtil from './Util/ColorUtil'

import Router from './Util/Router'

import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';
const TransitionConfiguration = () => ({
  screenInterpolator: (sceneProps) => {
    const { scene } = sceneProps;
    const { route } = scene;
    const params = route.params || {};
    const transition = params.transition || 'forHorizontal';
    return CardStackStyleInterpolator[transition](sceneProps);
  },
});

const TabContainer = TabNavigator(
  {
    Main: { screen: HomePage },
    HuanKuan: { screen: HuanKuan },
    Book: { screen: AccountBookPage },
    Me: { screen: MePage }
  },
  {
    lazy: true,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: ColorUtil.styleColor,
      inactiveTintColor: '#999999',
      showIcon: true,
      style: {
        backgroundColor: '#fff'
      },
      indicatorStyle: {
        opacity: 0
      },
      tabStyle: {
        padding: 0
      }
    }
  }
);

const App = StackNavigator(
  {
    Home: {
      screen: TabContainer,
      navigationOptions: {
        headerLeft: null
      }
    },
    Login: { screen: LoginPage },
    ForgetPassWord: { screen: ForgetPassWordPage },
    Register: { screen: RegisterPage },
    UserInfo: { screen: UserInfoPage },
    UpdatePassword: { screen: UpdatePasswordPage },
    Recharge: { screen: RechargePage },
    WithdrawPage: { screen: WithdrawPage },
    BookList: { screen: AccountBookPage },
    WebViewPage: { screen: WebViewPage },
    NoticePage: { screen: NoticePage },
    NoticeDetailPage: { screen: NoticeDetailPage },
    AddCardPage: { screen: AddCardPage },
  },
  {
    headerMode: 'screen',
    navigationOptions: {
      headerStyle: {
        backgroundColor: ColorUtil.styleColor
      },
      headerTitleStyle: {
        color: '#fff',
        fontSize: 20
      },
      headerTintColor: '#fff'
    },
    transitionConfig: TransitionConfiguration
  }
);

export default App;