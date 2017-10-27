import React, { Component, PropTypes } from 'react';
import {
    View,
    Image,
    Text,
    TouchableHighlight,
    StyleSheet,
    Keyboard,
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
import Router from './../../Util/Router'
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

/**
 * 提现
 */
export default class NoticePage extends Component {

    static navigationOptions = {
        title: '公告通知',
    }
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
        };
        __this = this;
    }

    _renderRow(rowData, sectionID: number, rowID: number) {
        return (<NoticeItem rowID={rowID} item={rowData} onPress={(rowID, item) => {
            Router.pushPage(__this, Router.pageNames.NoticeDetailPage,{data:rowData});
        }} />);
    }

    componentDidMount() {
        __this.refs.listView.beginRefresh();
    }

    refresData() {
        UserData.getConfig((res) => { 
            var datas = [];
            if(res.noticeList){
                datas = res.noticeList;
            }
            this.setState({dataSource:datas});
            __this.refs.listView.endRefresh();
        }, (err) => {
          __this.refs.listView.endRefresh();
        });
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <ListViewRefresh ref="listView" dataSource={__this.state.dataSource}
                    renderRow={__this._renderRow}
                    onRefresh={() => {
                        this.refresData();
                    }} onMore={null} style={{ marginTop: 10 }} />
            </View>
        );
    }
}

class NoticeItem extends Component {



    constructor(props) {
        super(props);
        this.itemClick.bind(this);
    }

    itemClick() {
        if (this.props.onPress) {
            this.props.onPress(this.props.rowID, this.props.item);
        }
    }

    render() {
        return (
            <TouchableHighlight activeOpacity={0.6}
                underlayColor={'transparent'} onPress={() => this.itemClick()} key={this.props.rowID}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', height: 160 }}>
                    <View style={[{ width: contentViewWidth, height: 150, alignItems: 'center', justifyContent: 'center' }, CommonStyle.styles.viewBorder]}>
                        <View style={{ width: contentWidth, justifyContent: 'center', height: 140 }}>
                            <View style={{ height: 41, width: contentWidth, justifyContent: 'center' }}>
                                <Text style={{ fontSize: 18, color: '#3b3c3c', fontWeight: 'bold' }}>{this.props.item.title}</Text>
                            </View>
                            <View style={{ height: 59, justifyContent: 'center', width: contentWidth }}>
                                <Text style={{ fontSize: 15, color: '#363838' }}>{this.props.item.content}</Text>
                            </View>
                            <ViewLine width={contentWidth} />
                            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, height: 40 }}>
                                <Text style={{ width: contentWidth - 70, color: ColorUtil.grayColor }}>{Util.formatDate(this.props.item.update_time,'yyyy/MM/dd')}</Text>
                                <Text style={{ color: ColorUtil.styleColor }}>详情查看</Text>
                                <Image source={require('../../images/list_right.png')} style={{ marginLeft: 4, width: 10, height: 15 }} resizeMode='stretch' />
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
        );
    };
}