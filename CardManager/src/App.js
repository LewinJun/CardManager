'use strict';

// import React from 'react'
import React, {Component} from 'react';
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
import ColorUtil from './Util/ColorUtil'

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
      Main: { screen: HomePage},
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
            
          },
    //   Login: { screen: UserLoginPage },
    //   ExDetail:{screen: ExhibitionDetail},
    //   Register: { screen: UserRegisterPage }
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