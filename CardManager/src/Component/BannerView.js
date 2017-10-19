import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    TouchableHighlight,
    ScrollView,
    Animated,
    TouchableWithoutFeedback,
    Image,
    View
} from 'react-native';

var Dimensions = require('Dimensions');
var deviceWidth = Dimensions.get('window').width;
var contentHeight = 200;
var contentWidth = deviceWidth;

var pointSize = 6;

var contentX = 0;

export default class BannerView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 0,
            style: {},
            imageStyle: {},
        }
        this._max = 0;
        this._currentPage = 0;
    }

    onAnimationEnd(e) {
        var offSetX = e.nativeEvent.contentOffset.x;
        var currentPage = Math.floor(offSetX / contentWidth);
        this.setState({currentPage: currentPage});
    }

    getItem() {
        if(this.props.images === undefined || this.props.images === null){
            return (<View/>);
        }
        this._max = this.props.images.length;
        var imgWidth = deviceWidth;
        var imgHeight = contentHeight;
        if (this.props.style !== undefined && this.props.style.width !== undefined) {
            imgWidth = this.props.style.width;
        } if (this.props.style !== undefined && this.props.style.height !== undefined) {
            imgHeight = this.props.style.height;
        }
        var imageViews = [];
        contentX = deviceWidth * (this.props.images.length - 1);
        for (var i = 0; i < this.props.images.length; i++) {
            var imgUrl = this.props.images[i] + '';

            imageViews.push(
                <TouchableWithoutFeedback onPress={() => this.props.itemClick(this.state.currentPage + 'a')}
                    key={i} ref="swiper">
                    <Image
                        key={i}
                        resizeMode='cover'
                        style={{ width: imgWidth, height: imgHeight}}
                        source={{ uri: imgUrl }}
                    />
                </TouchableWithoutFeedback>
            );
        }
        return imageViews;
    }

    getPagePointView() {
        if(this.props.images === undefined || this.props.images === null){
            return (<View/>);
        }
        var pointViews = [];
        for (var i = 0; i < this.props.images.length; i++) {
            style = (i === this.state.currentPage) ? {backgroundColor: '#53e3a4'} : {backgroundColor: 'white'}            
            pointViews.push(
                <View style={[styles.normalPoint,style]} key={i} />
            );
        }

        return pointViews;
    }

    _onTouchStart(){
        // 当手指按到scrollview时停止定时任务
        clearInterval(this._timer);
    }

    _onTouchEnd(){
        // 先滑动到指定index位置，再开启定时任务
        // this._scrollView.scrollTo({x:this._currentPage * contentWidth},true);
        // 重置小圆点指示器
        this._refreshFocusIndicator();
        this._runFocusImage();
        
    }

    _runFocusImage(){
        if(this._max <= 1){ // 只有一个则不启动定时任务
            return;
        }
        this._timer = setInterval(function () {
            this._currentPage++;
            if(this._currentPage >= this._max){
                this._currentPage = 0;
            }
            this._scrollView.scrollTo({x:this._currentPage * contentWidth},true);
            // 重置小圆点指示器
            this._refreshFocusIndicator();
        }.bind(this), 3000);
    }

    _stopFocusImage(){
        clearInterval(this._timer);
    }

    _refreshFocusIndicator(){
        this.setState({currentPage:this._currentPage});
    }
    // 组件装载完成
    componentDidMount(){
        this._runFocusImage();
    }

    // 组件即将卸载
    componentWillUnmount(){
        clearInterval(this._timer);
    }

    // 组件接收到新属性
    componentWillReceiveProps(nextProps) {
    }
//onMomentumScrollEnd={this.onAnimationEnd.bind(this)}
//onScroll={this.onAnimationEnd.bind(this)}
/*
onScrollBeginDrag={()=>this._onTouchStart()}
onScrollEndDrag={()=>this._onTouchEnd()}
*/
    render() {
        return (
            <View style={{ flex: 1 }}>
                <ScrollView horizontal={true} //水平滑动
                    ref={(scrollView) => { this._scrollView = scrollView;}}
                    pagingEnabled={true}
                    onScrollBeginDrag={()=>this._onTouchStart()}
                    onScrollEndDrag={()=>this._onTouchEnd()}
                    showsHorizontalScrollIndicator={false}
                    style={[{ width: contentWidth, height: contentHeight, marginTop: 0, flexDirection: 'row' }, this.props.style]}//设置大小
                    onScroll={Animated.event(
                                        [{nativeEvent: {contentOffset: {x: deviceWidth}}}]//把contentOffset.x绑定给this.state.xOffset
                                    )}
                    scrollEventThrottle={100}
                    onMomentumScrollEnd={this.onAnimationEnd.bind(this)}
                    >

                    <Animated.View style={{flexDirection:'row'}}>{this.getItem()}</Animated.View>

                </ScrollView>
                <Animated.View style={{position:'absolute',flexDirection:'row',bottom:4,width:contentWidth,alignItems:'center',justifyContent:'center'}}>
                    {this.getPagePointView()}
                </Animated.View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    normalPoint: {
        width: pointSize,
        height: pointSize,
        backgroundColor: 'white',
        marginLeft: 2,
        marginRight: 2,
        borderRadius: pointSize/2.0
    },
    selectPoint: {
        width: pointSize,
        height: pointSize,
        marginLeft: 2,
        marginRight: 2,
        backgroundColor: '#EBEBEB',
        borderRadius: pointSize/2.0
    }

});
