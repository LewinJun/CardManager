/**
 * cell视图
 */
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Image,
  TouchableHighlight,
  Alert,
  Text,
  View
} from 'react-native';

class ItemCellView extends Component {
    // 初始化模拟数据
    constructor(props) {
      super(props);
    }
  
    getRightIcon() {
      if (this.props.item.hideRight) {
        return (<View />);
      }
      return (<Image source={require('./right_icon.png')} style={{ width: 10, height: 15 }} resizeMode='stretch' />
      );
    }
  
    render() {
      return (
        <TouchableHighlight activeOpacity={0.6}
          underlayColor={'transparent'} onPress={() => this.props.onItemClick(this.props.item)} key={this.props.item.title + "1"} style={{ width: this.props.width }}>
          <View style={{ flexDirection: 'row', backgroundColor: 'white', height: 44, alignItems: 'center' }} key={this.props.item.index + "3"}>
            <Image source={this.props.item.icon} style={{ width: 25, height: 25, marginLeft: 10 }} resizeMode='stretch' />
            <Text style={{ marginLeft: 20, color: '#333435', width: this.props.width - 80 }}>{this.props.item.title}</Text>
            {this.getRightIcon()}
          </View>
        </TouchableHighlight>
      );
    }
  }

  module.exports = ItemCellView;