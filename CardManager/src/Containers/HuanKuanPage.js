import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  Alert,
  View
} from 'react-native';

import {
  DrawerNavigator
} from 'react-navigation';

import TabBarItem from '../Component/TabBarItem'
import ListViewRefresh from '../Component/ListViewRefresh'
import ViewLine from '../Component/ViewLine'
import Button from '../Component/Button'
import Router from '../Util/Router'

var __this = undefined;

var Dimensions = require('Dimensions');
var deviceWidth = Dimensions.get('window').width;
var deviceHeight = Dimensions.get('window').height;
var contentViewWidth = deviceWidth - 20;
var contentWidth = contentViewWidth - 30;

export default class HuanKuan extends Component {
  static navigationOptions = {
    title: '还款',
    tabBarLabel: '还款',
    headerRight: (<Button
      title='添加'
      textStyle={{ color: 'white', fontSize: 16 }}
      buttonStyle={{ width: 70, height: 40 }}

      onPress={() => __this.rightBtnClick()}
    />),
    tabBarIcon: ({ focused, tintColor }) => (
      <TabBarItem
        tintColor={tintColor}
        focused={focused}
        normalImage={require('../images/main/tab_huankuan_unselect.png')}
        selectedImage={require('../images/main/tab_huankuan_select.png')}
      />
    ),
    headerStyle: {
      backgroundColor: 'transparent',
    },
  }

  rightBtnClick() {
    Router.pushPage(this, Router.pageNames.AddCardPage);
  }

  constructor(props) {
    super(props);

    this.state = {
      dataSource: [
        { card: '****  ****  ****  ****  9999', cardNo: '1238721382', bg: require('../images/card/jiaotong_card_bg.png'), zhangDan: '24', huanKuan: '28', money: '0.00' },
        { card: '****  ****  ****  ****  8765', cardNo: '1238721382', bg: require('../images/card/zhaoshang_card_bg.png'), zhangDan: '20', huanKuan: '20', money: '1230.00' },],
    };
    __this = this;
  }

  renderCardRow(rowData, sectionID: number, rowID: number) {
    return (
      <View style={{ flex: 1, width: deviceWidth, height: 155, justifyContent: 'center', alignItems: 'center' }}>

        <View style={{ width: contentWidth, height: 140 }}>
          <Image resizeMode='stretch' source={rowData.bg} style={{ position: 'absolute', width: contentWidth, height: 140 }} />
          <View style={{ marginTop: 50, alignItems: 'center' }}>
            <Text style={{ backgroundColor: 'transparent', color: 'white' }}>{rowData.card}</Text>
            <ViewLine lineStyle={{ backgroundColor: 'white', width: contentWidth - 40, marginTop: 10, height: 0.4, opacity: 0.4 }} />

            <View style={{ flexDirection: 'row', width: contentWidth, marginTop: 10 }}>
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ backgroundColor: 'transparent', color: 'white' }}>账单日</Text>
                <Text style={{ backgroundColor: 'transparent', color: 'white' }}>{rowData.zhangDan}</Text>
              </View>
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ backgroundColor: 'transparent', color: 'white' }}>还款日</Text>
                <Text style={{ backgroundColor: 'transparent', color: 'white' }}>{rowData.huanKuan}</Text>
              </View>
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ backgroundColor: 'transparent', color: 'white' }}>还款金额</Text>
                <Text style={{ backgroundColor: 'transparent', color: 'white' }}>{rowData.money}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
  render() {
    return (
      <View style={styles.container}>
        <ListViewRefresh ref="listView" dataSource={__this.state.dataSource}
          renderRow={__this.renderCardRow}
          onRefresh={() => {
            setTimeout(() => {
              __this.refs.listView.endRefresh();
            }, 3000);
          }} onMore={null} style={{ marginTop: 10 }} />
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
