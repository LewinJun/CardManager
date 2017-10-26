import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  DeviceEventEmitter,
  TouchableHighlight,
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
import CardMoneyData from '../Data/Interface/CardMoneyData'

var __this = undefined;

var Dimensions = require('Dimensions');
var deviceWidth = Dimensions.get('window').width;
var deviceHeight = Dimensions.get('window').height;
var contentViewWidth = deviceWidth - 20;
var contentWidth = contentViewWidth - 30;

var addEvent = undefined;

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
        { card: '****  ****  ****  ****  9999', cardNo: '1238721382', bg: require('../images/card/jiaotong_card_bg.png'), statement_date: '24', repayment_date: '28', money: '0.00' },
        { card: '****  ****  ****  ****  8765', cardNo: '1238721382', bg: require('../images/card/zhaoshang_card_bg.png'), statement_date: '20', repayment_date: '20', money: '1230.00' },],
    };
    __this = this;
  }

  componentDidMount() {
    __this.refs.listView.beginRefresh();
    addEvent = DeviceEventEmitter.addListener(CardMoneyData.CardConfig.DeviceEventEmitterAddSuccess, () => {
      this.refreshData();
    })
  }

  componentWillUnmount() {
    //移除
    if (addEvent) {
      addEvent.remove();
    }

  }

  refreshData() {
    CardMoneyData.getCreditList((data) => {

      for (var i in data) {
        var item = data[i];
        var cardName = item.credit_card_num;
        if (cardName.length > 4) {
          cardName = cardName.substring(cardName.length - 4, cardName.length);
        }
        cardName = "****  ****  ****  ****  " + cardName;
        item.card = cardName;
        item.bg = require('../images/card/jiaotong_card_bg.png');
        item.money = '10.00';
      }
      this.setState({ dataSource: data });
      __this.refs.listView.endRefresh();
    }, (err) => {
      __this.refs.listView.endRefresh();
    });
  }

  itemClick(rowData) {
    Router.pushPage(this, Router.pageNames.CardDetailPage, { data: rowData, title:'交通银行'});
  }


  renderCardRow(rowData, sectionID: number, rowID: number) {
    return (
      <TouchableHighlight activeOpacity={0.6}
        underlayColor={'transparent'} onPress={() => __this.itemClick(rowData)} key={rowID}>
        <View style={{ flex: 1, width: deviceWidth, height: 155, justifyContent: 'center', alignItems: 'center' }}>

          <View style={{ width: contentWidth, height: 140 }}>
            <Image resizeMode='stretch' source={rowData.bg} style={{ position: 'absolute', width: contentWidth, height: 140 }} />
            <View style={{ marginTop: 50, alignItems: 'center' }}>
              <Text style={{ backgroundColor: 'transparent', color: 'white', fontSize: 21 }}>{rowData.card}</Text>
              <ViewLine lineStyle={{ backgroundColor: 'white', width: contentWidth - 40, marginTop: 10, height: 0.4, opacity: 0.4 }} />

              <View style={{ flexDirection: 'row', width: contentWidth, marginTop: 10 }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ backgroundColor: 'transparent', color: 'white' }}>账单日</Text>
                  <Text style={{ backgroundColor: 'transparent', color: 'white' }}>{rowData.statement_date}</Text>
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ backgroundColor: 'transparent', color: 'white' }}>还款日</Text>
                  <Text style={{ backgroundColor: 'transparent', color: 'white' }}>{rowData.repayment_date}</Text>
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ backgroundColor: 'transparent', color: 'white' }}>还款金额</Text>
                  <Text style={{ backgroundColor: 'transparent', color: 'white' }}>{rowData.money}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
  render() {
    return (
      <View style={styles.container}>
        <ListViewRefresh ref="listView" dataSource={__this.state.dataSource}
          renderRow={__this.renderCardRow}
          onRefresh={() => {
            __this.refreshData();
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
