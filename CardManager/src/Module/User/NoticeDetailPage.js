import React, { Component, PropTypes } from 'react';
import {
    View,
    Image,
    Text,
    TouchableHighlight,
    StyleSheet,
    Keyboard,
    ScrollView,
    DeviceEventEmitter,
    Animated,
    Alert,
} from 'react-native';

import UserData from '../../Data/Interface/UserData'
import UserInfo from '../../Data/Interface/UserInfo'
import Button from '../../Component/Button'
import ListViewRefresh from '../../Component/ListViewRefresh'
import ColorUtil from './../../Util/ColorUtil'
import Util from './../../Util/Util'
import CommonStyle from './../../Util/CommonStyle'
import ViewLine from '../../Component/ViewLine'
import ToastUtil from '../../Component/ToastUtil'


var Dimensions = require('Dimensions');
var deviceWidth = Dimensions.get('window').width;
var deviceHeight = Dimensions.get('window').height;
var contentViewWidth = deviceWidth - 20;
var contentWidth = contentViewWidth - 30;

var userInfo = new UserInfo();

var __this = undefined;

var detailInfo = {};

/**
 * 提现
 */
export default class NoticeDetailPage extends Component {

    static navigationOptions = {
        title: '通知详情',
    }
    constructor(props) {
        super(props);
        detailInfo = this.props.navigation.state.params.data;
        this.state = {
        };
        __this = this;
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <ScrollView horizontal={false} //水平滑动
                    ref="scrollView"
                    pagingEnabled={false}
                    contentContainerStyle={{ flex: 1, alignItems: 'center' }}
                    showsHorizontalScrollIndicator={false}
                    style={{ width: deviceWidth, height: deviceHeight, marginTop: 0 }}//设置大小
                    scrollEventThrottle={100}
                >
                    <View style={[{ width: contentViewWidth, alignItems: 'center', justifyContent: 'center',marginTop:20 }, CommonStyle.styles.viewBorder]}>
                        <View style={{ width: contentWidth, justifyContent: 'center', }}>
                            <View style={{ height: 41, width: contentWidth, justifyContent: 'center' }}>
                                <Text style={{ fontSize: 18, color: '#3b3c3c', fontWeight: 'bold' }}>{detailInfo.title}</Text>
                            </View>
                            <View style={{  justifyContent: 'center',  height: 25 }}>
                                <Text style={{ width: contentWidth - 70, color: ColorUtil.grayColor }}>{Util.formatDate(detailInfo.update_time,'yyyy/MM/dd')}</Text>
                            </View>
                            <View style={{ marginTop: 20, justifyContent: 'center', width: contentWidth }}>
                                <Text style={{ fontSize: 15, color: '#363838', width: contentWidth }}>{detailInfo.content}</Text>
                                <View style={{height:25,backgroundColor: 'transparent'}}/>
                            </View>
                            
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}