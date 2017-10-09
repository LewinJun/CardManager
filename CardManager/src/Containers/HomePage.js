import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    StatusBar,
    View
} from 'react-native';
import {
    DrawerNavigator
} from 'react-navigation';

import TabBarItem from '../Component/TabBarItem'

export default class HomePage extends Component {

    static navigationOptions = {
        title: '首页',
        tabBarLabel: '首页',
        tabBarIcon: ({ focused, tintColor }) => (
            <TabBarItem
                tintColor={tintColor}
                focused={focused}
                normalImage={require('../images/main/home_tab_unselect.png')}
                selectedImage={require('../images/main/home_tab_select.png')}
            />
        ),


    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle={'light-content'} backgroundColor={'#009DF0'} />
                <Text style={styles.welcome}>
                    Welcome to HomePage!
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
