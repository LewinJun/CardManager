import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Image,
  TouchableHighlight,
  ListView,
  DeviceEventEmitter,
  Alert,
  Text,
  View
} from 'react-native';

import {
  DrawerNavigator
} from 'react-navigation';

import _ from 'lodash'

import TabBarItem from '../Component/TabBarItem'
import NavBar from '../Component/NavBar'
import ViewLine from '../Component/ViewLine'
import ColorUtil from '../Util/ColorUtil'
import UserInfo from '../Data/Interface/UserInfo'
import UserData from '../Data/Interface/UserData'
import Button from '../Component/Button'

var Dimensions = require('Dimensions');
var deviceWidth = Dimensions.get('window').width;
var deviceHeight = Dimensions.get('window').height;

var topViewHeight = 236;

var _this = undefined;

var userInfoManager = new UserInfo();

var loginEvent = undefined;


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
    header: (<NavBar title="我的" leftButtonImage={null}></NavBar>),
    headerStyle: {
      backgroundColor: 'transparent',
    },
  }
  // 初始化模拟数据
  constructor(props) {
    super(props);

    _this = this;

    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    this.state = {
      dataSource: ds.cloneWithRows([{
        key: 'k1', data: [{ title: '基本资料', icon: require('../images/me/user_info.png'), id: '0' },
        { title: '修改密码', icon: require('../images/me/pass_icon.png'), id: '1' },
        { title: '实名认证', icon: require('../images/me/shiming_icon.png'), id: '2' }]
      },
      {
        key: 'k2', data: [
          { title: '公告通知', icon: require('../images/me/tongzhi_icon.png'), id: '3' },
          { title: '用户须知', icon: require('../images/me/xuzhi_icon.png'), id: '4' },
          { title: '版本信息', icon: require('../images/me/version_icon.png'), id: '5' },
          { title: '全国客服电话:400 123-123', icon: require('../images/me/phone_icon.png'), id: '6', hideRight: true }]
      },
      {
        key: 'k3', data: [
          { title: '安全退出', icon: require('../images/me/exit_icon.png'), id: '7', hideRight: true }]
      }
      ]),
      userInfo: userInfoManager.getUserInfo(),
      isLogin: userInfoManager.isLogin(),
      isSetUserName: true,
    }

    
  }

  /**
   * 设置用户信息
   */
  setUserInfo() {
    var info = _.cloneDeep(userInfoManager.getUserInfo());
    if (info) {
      if (!info.user_name) {
        info.user_name = "尚未设置用户名";
        this.setState({ isSetUserName: false });
      }

      if (!info.balance) {
        info.balance = "--";
      }

    }
    this.setState({ userInfo: info,isLogin: userInfoManager.isLogin(), });
  }

  componentDidMount() {
    this.setUserInfo();
    loginEvent = DeviceEventEmitter.addListener('loginSuccess', () => {
      this.setUserInfo();
    })
  }

  componentWillUnmount() {
    //移除
    if (loginEvent) {
      loginEvent.remove();
    }

  }

  /**
   * 用户头像信息，余额
   */
  getTopView() {
    return (
      <View style={{ width: deviceWidth, height: topViewHeight, }}>

        <Image resizeMode='stretch' source={require('../images/me/me_top_bg.png')}
          style={{ width: deviceWidth, height: topViewHeight, position: 'absolute', top: 0 }} />
        <View style={{ marginTop: 64 }}>
          {this.getUserInfoView()}
        </View>
      </View>
    );
  }

  getUserInfoView() {    
    var userNameStyle = this.state.isSetUserName ? {color: 'white'} : {color: ColorUtil.grayColor} 
    if (this.state.isLogin) {
      return (
        <View>
          <View style={{ width: deviceWidth - 20, height: 40, alignItems: 'center', flexDirection: 'row', marginLeft: 20 }}>
            <Image source={require('../images/avatar.png')} style={{ width: 40, height: 40, }} />
            <Text style={[{ backgroundColor: 'transparent', marginLeft: 10, fontSize: 18 }, userNameStyle]}>{this.state.userInfo.user_name}</Text>
          </View>
          <View style={{ width: deviceWidth, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: '#ADEFD0', fontSize: 16, backgroundColor: 'transparent' }}>账户余额(元)</Text>
            <Text style={{ color: 'white', fontSize: 32, backgroundColor: 'transparent', marginTop: 10 }}>{this.state.userInfo.balance}</Text>
          </View>
          <View style={{
            width: deviceWidth, height: 54, backgroundColor: '#4EE2B5',
            marginTop: 10, elevation: 5, borderColor: ColorUtil.grayColor,
            justifyContent: 'center', alignItems: 'center', flexDirection: 'row',
            shadowColor: ColorUtil.grayColor, shadowOffset: { width: 5, height: 5 },
            shadowOpacity: 0.6, shadowRadius: 6, elevation: 5
          }}>
            {this.getTopMenuItemView('提现',()=>{

            })}
            <View style={{ backgroundColor: 'white', width: 1, height: 25 }} />
            {this.getTopMenuItemView('充值',()=>{
              this.props.navigation.navigate('Recharge');
            })}
          </View>
        </View>
      );
    } else {
      return (<View style={{ width: deviceWidth, alignItems: 'center', justifyContent: 'center', marginTop: 20, }}>
        <Button title='登录/注册'
          imageStyle={styles.loginButton} buttonStyle={styles.loginButton} textStyle={{ color: 'white', fontSize: 18 }}
          contentViewStyle={[styles.loginButton]} onPress={() => this.props.navigation.navigate('Login', { transition: 'forVertical' })} />
      </View>);
    }
  }

  /**
   * 提现和充值item
   */
  getTopMenuItemView(text,click) {
    return (
      <TouchableHighlight style={{ flex: 1, height: 54 }} activeOpacity={0.6}
        underlayColor={'transparent'} onPress={() => click()}>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <Image source={require('../images/me/chongzhi_icon.png')} resizeMode='stretch' style={{
            width: 20, height: 20
          }} />
          <Text style={{ marginLeft: 10, backgroundColor: 'transparent', color: 'white', fontSize: 18 }}>{text}</Text>
        </View>
      </TouchableHighlight>
    );
  }

  /**
   * 我的菜单
   * @param {*} data 
   * @param {*} section 
   */
  _renderItemComponent(data, section) {
    console.log(data);
    var itemViews = [];

    var datas = data.data;

    for (var i = 0; i < datas.length; i++) {
      var item = datas[i];
      var contentWidth = deviceWidth - 30;
      itemViews.push(
        <MeItem width={contentWidth} item={item} key={"l" + i} onPress={(item) => { _this.itemClick(item) }} />
      );
      if (i >= 0 && i < datas.length - 1 && datas.length > 1) {
        itemViews.push(<ViewLine width={contentWidth - 14} key={"aa" + i} />);
      }
    }
    //内容view高度
    var height = data.data.length * 48;

    //最外部view高度
    var vheight = height + 20;

    var vWidth = contentWidth + 8;

    return (
      <View style={{ width: vWidth, height: vheight, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
        <View style={{
          width: vWidth, height: height, justifyContent: 'center', alignItems: 'center',
          shadowColor: ColorUtil.grayColor, shadowOffset: { width: 5, height: 5 }, shadowOpacity: 0.4, shadowRadius: 6,
          borderWidth: 0.3, borderColor: ColorUtil.grayColor, borderRadius: 6, elevation: 3, height: height, backgroundColor: 'white'
        }}>
          {itemViews}
        </View>
      </View>
    );
  }

  itemClick(item) {
    if (item && item.id === '7') {
      Alert.alert('温馨提醒', '确定退出吗?', [
        { text: '取消', onPress: () => console.log() },
        { text: '确定', onPress: () => this.loginOut() }
      ])
    }else if(item.id === '0'){
      this.props.navigation.navigate('UserInfo');
    }else if(item.id === '1'){
      this.props.navigation.navigate('UpdatePassword');
    }

  }

  loginOut() {
    UserData.loginOut();
    this.setState({ isLogin: false, userInfo: {} });
  }

  render() {
    return (
      <View style={styles.container}>
        {this.getTopView()}
        <ListView
          style={styles.listView}
          showsVerticalScrollIndicator={false}
          dataSource={this.state.dataSource}
          removeClippedSubviews={false}
          renderRow={this._renderItemComponent} />

      </View>
    );
  }
}

/**
 * cell视图
 */
class MeItem extends Component {
  // 初始化模拟数据
  constructor(props) {
    super(props);
  }

  getRightIcon() {
    if (this.props.item.hideRight) {
      return (<View />);
    }
    return (<Image source={require('../images/list_right.png')} style={{ width: 10, height: 15 }} resizeMode='stretch' />
    );
  }

  render() {
    return (
      <TouchableHighlight activeOpacity={0.6}
        underlayColor={'transparent'} onPress={() => this.props.onPress(this.props.item)} key={this.props.item.id + "1"} style={{ width: this.props.width }}>
        <View style={{ flexDirection: 'row', backgroundColor: 'white', height: 44, alignItems: 'center' }} key={this.props.item.index + "3"}>
          <Image source={this.props.item.icon} style={{ width: 25, height: 25, marginLeft: 10 }} resizeMode='stretch' />
          <Text style={{ marginLeft: 20, color: '#333435', width: this.props.width - 80 }}>{this.props.item.title}</Text>
          {this.getRightIcon()}
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  listView: {
    marginTop: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  loginButton: {
    width: 150,
    height: 50,
    borderRadius: 2,
    backgroundColor: ColorUtil.grayColor,
  }
});
