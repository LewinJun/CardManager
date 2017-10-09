import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import {
    DrawerNavigator
 } from 'react-navigation';

import TabBarItem from '../Component/TabBarItem'

export default class MePage extends Component {
    static navigationOptions = {
        title: '我的',
        tabBarLabel: '我的',
        tabBarIcon: ({ focused, tintColor }) => (
            <TabBarItem
                tintColor={tintColor}
                focused={focused}
                normalImage={require('../images/main/me_tab_unselect.png')}
                selectedImage={require('../images/main/me_tab_select.png')}
            />
        ),
    }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to MePage!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
