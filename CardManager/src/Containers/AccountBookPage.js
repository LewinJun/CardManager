import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  ListView,
  Animated,
  RefreshControl,
  TouchableHighlight,
  Image,
  Text,
  View
} from 'react-native';

import {
  DrawerNavigator
} from 'react-navigation';

var Dimensions = require('Dimensions');
var deviceWidth = Dimensions.get('window').width;
var deviceHeight = Dimensions.get('window').height;
var contentWidth = deviceWidth - 40;
var contentItemImgSize = 40;
var contentTitleWidth = (contentWidth - contentItemImgSize) / 2;
var menuViewHeight = 280;
var menuViewWidth = 150;
var currentMenuHeight = 0;

import TabBarItem from '../Component/TabBarItem'
import Button from '../Component/Button'
import Footer from '../Component/Footer'
import ColorUtil from '../Util/ColorUtil'
import Util from '../Util/Util'
import CardMoneyData from '../Data/Interface/CardMoneyData'

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

var dataSourceArrayInit = [
  '展会列表1---展会活动', '展会列表---展会活动', '北京展会', '上海展会', '广州展会', '深圳展会', '哈哈哈', '你话好多疯狂减肥还是的空间划分空间上的空间发挥科技'
];
var dataSourceArray = dataSourceArrayInit.concat();
var _this = undefined;
export default class AccountBookPage extends Component {


  static navigationOptions = {
    title: '账本',
    tabBarLabel: '账本',
    headerRight: (<Button
      title='筛选'
      textStyle={{ color: 'white', fontSize: 16 }}
      buttonStyle={{ width: 70, height: 40 }}

      onPress={() => _this.rightBtnClick()}
    />),
    tabBarIcon: ({ focused, tintColor }) => (
      <TabBarItem
        tintColor={tintColor}
        focused={focused}
        normalImage={require('../images/main/book_tab_unselect.png')}
        selectedImage={require('../images/main/book_tab_select.png')}
      />
    ),


  }

  // 初始化模拟数据
  constructor(props) {
    super(props);
    _this = this;

    var menuViewDataArray = [
      { text: '全部', isSelect: true, type: CardMoneyData.ConsumeDealType.all },
      { text: '刷卡消费', isSelect: false, type: CardMoneyData.ConsumeDealType.payCard },
      { text: '快速还款', isSelect: false, type: CardMoneyData.ConsumeDealType.repayment },
      { text: '提现', isSelect: false, type: CardMoneyData.ConsumeDealType.withdraw },
      { text: '充值', isSelect: false, type: CardMoneyData.ConsumeDealType.recharge }
    ];

    var selectType = CardMoneyData.ConsumeDealType.all;
    if (this.props.navigation.state.params && !Util.isEmpty(this.props.navigation.state.params.selectType)) {
      selectType = this.props.navigation.state.params.selectType;

      for (var i = 0; i < menuViewDataArray.length; i++) {
        menuViewDataArray[i].isSelect = false;
        if (selectType === menuViewDataArray[i].type) {
          menuViewDataArray[i].isSelect = true;
        }
      }
    }

    this.state = {
      dataSource: ds.cloneWithRows(dataSourceArray),
      menuDataSource: ds.cloneWithRows(menuViewDataArray),
      menuDataSourceList: menuViewDataArray,
      menuViewHeight: new Animated.Value(0),
      menuItemSelectIndex: selectType,
      isRefreshing: false,
      isLoadMore: false,
    };

  }

  rightBtnClick() {
    var value = 0;
    if (currentMenuHeight === 0) {
      value = menuViewHeight;
    }
    Animated.timing(
      this.state.menuViewHeight,//初始值
      {
        toValue: value,
        duration: 300,
      }//结束值
    ).start();//开始
    currentMenuHeight = value;
  }

  _renderRow(rowData, sectionID: number, rowID: number) {
    return (
      <View style={{ width: deviceWidth, height: 100, justifyContent: 'center', alignItems: 'center' }}>
        <Image source={require('../images/book/book_item_bg.png')} style={{ position: 'absolute', flex: 1, width: deviceWidth, height: 100 }} resizeMode='stretch' />

        <View style={{ width: contentWidth, height: 70, flexDirection: 'row', alignItems: 'center' }}>
          <Image source={require('../images/book/kuaisu_huankuan_icon.png')} style={{ width: contentItemImgSize, height: contentItemImgSize }} />
          <View style={{ marginLeft: 10, width: contentTitleWidth }}>
            <Text style={{ width: contentTitleWidth }}>快速还款 ￥430.23</Text>
            <Text style={{ width: contentTitleWidth, marginTop: 4 }}>2016-09-10 12:56</Text>
          </View>
          <View style={{ alignSelf: 'flex-end', justifyContent: 'center', height: 70, width: contentTitleWidth }}>
            <Text style={{ textAlign: 'right', marginRight: 10, width: contentTitleWidth - 10 }}>快速还款 ￥430.23</Text>
            <Text style={{ marginTop: 4, textAlign: 'right', marginRight: 10, width: contentTitleWidth - 10 }}>2016-09-10 12:56</Text>
          </View>
        </View>

      </View>
    );
  }

  menuItemClick(rowID) {
    var array = this.state.menuDataSourceList;
    var selectType = CardMoneyData.ConsumeDealType.all;
    for (var i = 0; i < array.length; i++) {
      array[i].isSelect = false;
      if (rowID === i + '') {
        array[i].isSelect = true;
        selectType = array[i].type;
      }
    }
    console.log('rowID:' + rowID);
    //刷新menuView ListView
    this.setState({ menuDataSource: ds.cloneWithRows(array), menuDataSourceList: array, menuItemSelectIndex: selectType });
    this.rightBtnClick();
  }

  _renderMenuRow(text, sectionID: number, rowID: number) {
    var contentW = menuViewWidth - 30;
    var textStyle = text.isSelect ? { color: 'red' } : { color: 'white' }
    return (
      <TouchableHighlight activeOpacity={0.6}
        underlayColor={'transparent'} onPress={() => _this.menuItemClick(rowID)} key={rowID}>
        <View style={{ width: menuViewWidth, height: 50, alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ width: contentW, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ width: contentW, justifyContent: 'center', height: 48 }}>
              <Text style={[{ color: 'white', fontSize: 16 }, textStyle]}>{text.text}</Text>
            </View>
            <View style={{ backgroundColor: '#72e9c2', width: contentW, height: 1 }} />
          </View>

        </View>
      </TouchableHighlight>
    );
  }


  getMenuView() {
    return (
      <Animated.View style={[styles.menuViewStyle, { height: this.state.menuViewHeight }]}>
        <ListView
          style={{ width: styles.menuViewStyle.width }}
          dataSource={this.state.menuDataSource}
          removeClippedSubviews={false}
          renderRow={this._renderMenuRow}
        />
      </Animated.View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <ListView
          style={styles.listView}
          dataSource={this.state.dataSource}
          removeClippedSubviews={false}
          renderRow={this._renderRow}
          onEndReached={() => {
            this.setState({ isLoadMore: true });
            setTimeout(() => {
              this.setState({ isLoadMore: false });
              dataSourceArray.push('aaa');
              dataSourceArray.push('aaa');
              dataSourceArray.push('aaa');
              dataSourceArray.push('aaa');
              dataSourceArray.push('aaa');
              this.setState({ dataSource: ds.cloneWithRows(dataSourceArray) });
              {/* Alert.alert(
                                'Alert Title',
                                'cccc',
                            ) */}
            }, 3000);
          }}
          onEndReachedThreshold={10}
          renderFooter={() => {
            return this.state.isLoadMore ? <Footer /> : <View />;
          }}
          refreshControl={
            <RefreshControl
              style={{ backgroundColor: 'transparent' }}
              refreshing={this.state.isRefreshing}
              onRefresh={() => {
                this.setState({ isRefreshing: true });
                setTimeout(() => {
                  this.setState({ dataSource: ds.cloneWithRows(dataSourceArrayInit), isRefreshing: false });
                }, 3000);
              }}
              title="Loading..."
              colors={['#ffaa66cc', '#ff00ddff', '#ffffbb33', '#ffff4444']}
            />
          }
        />
        {this.getMenuView()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
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
  menuViewStyle: {
    backgroundColor: ColorUtil.styleColor,
    height: 0,
    width: menuViewWidth,
    position: 'absolute',
    right: 10,
    top: 0,
    elevation: 5,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  }
});
