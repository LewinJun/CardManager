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

import ItemCellView from './ItemCellView'

var Dimensions = require('Dimensions');
var deviceWidth = Dimensions.get('window').width;
var deviceHeight = Dimensions.get('window').height;

var _this = undefined;

class ItemView extends Component {
    // 初始化模拟数据
    constructor(props) {
        super(props);
        _this = this;
    }

    itemClick(item){
        if(this.props.onItemClick !== undefined){
            this.props.onItemClick(item);
        }
    }

    getViews() {
        var itemViews = [];

        var datas = this.props.data;

        var contentWidth = deviceWidth - 20;

        if (this.props.width != undefined) {
            contentWidth = this.props.width;
        }

        for (var i = 0; i < datas.length; i++) {
            var item = datas[i];

            itemViews.push(
                <ItemCellView width={contentWidth - 10} item={item} key={"l" + i} onItemClick={this.itemClick.bind(this, item)} />
            );
            if (i >= 0 && i < datas.length - 1 && datas.length > 1) {
                itemViews.push(<View style={{ width: contentWidth - 14, height: 0.6, backgroundColor: '#EBEBEB' }} key={"aa" + i} />);
            }
        }
        //内容view高度
        var height = datas.length * 48;

        //最外部view高度
        var vheight = height + 20;

        return (
            <View style={{ width: contentWidth, height: vheight, justifyContent: 'center', 
            alignItems: 'center', backgroundColor: 'transparent' }} {...this.props}>
                <View style={{
                    width: contentWidth, height: height, justifyContent: 'center', alignItems: 'center',
                    shadowColor: '#b5b6b7', shadowOffset: { width: 5, height: 5 }, shadowOpacity: 0.4, shadowRadius: 6,
                    borderWidth: 0.3, borderColor: '#b5b6b7', borderRadius: 6, elevation: 3, height: height, backgroundColor: 'white'
                }}>
                    {itemViews}
                </View>
            </View>
        );

    }

    render() {
        return (
            <View>
                {this.getViews()}
            </View>

        );
    }
}

module.exports = ItemView;