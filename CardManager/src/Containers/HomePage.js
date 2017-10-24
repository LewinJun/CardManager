import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    Image,
    Alert,
    StatusBar,
    Animated,
    ScrollView,
    View
} from 'react-native';
import {
    DrawerNavigator
} from 'react-navigation';

import TabBarItem from '../Component/TabBarItem'
import BannerView from '../Component/BannerView'
import Button from '../Component/Button'
import BannerImages from '../Component/BannerImages'
import NavBar from '../Component/NavBar'
import ViewLine from '../Component/ViewLine'
import ColorUtil from '../Util/ColorUtil'
import Router from '../Util/Router'
import UserData from '../Data/Interface/UserData'

var Dimensions = require('Dimensions');
var deviceWidth = Dimensions.get('window').width;
var deviceHeight = Dimensions.get('window').height;
var heightFlex = deviceHeight / 667;
var bannerHeight = 238;
var menuHeight = 90;
var menuMarginBottom = 15;
var cardHeight = 250;

var Platform = require('Platform');
var viewMarginTop = 0;
// if (Platform.OS === 'android') {  
//     //todo 
//     viewMarginTop = -66; 
// }else{  
//     //todo  
// }  



var IMGS = [
    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1508051186391&di=41f6f14edd72d8e1e115be4c6f87924f&imgtype=0&src=http%3A%2F%2Fg.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2Fcdbf6c81800a19d8aaae3d7639fa828ba61e4617.jpg',
    'http://h.hiphotos.baidu.com/image/h%3D220/sign=a67cd12f9582d158a4825eb3b00b19d5/aa18972bd40735fa91b8197897510fb30e2408a2.jpg',
    'http://img.showguide.cn/uploads/try/1478743652EXPOPARTES1111.jpg',
    'http://img.showguide.cn/uploads/try/1478743652EXPOPARTES1111.jpg',
];
IMGS = [
    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1508055597889&di=3c020e1d1e58c11b2f6b70307c813052&imgtype=0&src=http%3A%2F%2Ff.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2Fb7fd5266d016092446517fdadd0735fae7cd34ff.jpg',
    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1508055597887&di=d5f4ca84fc5ef1c0cebb18093c80ae73&imgtype=0&src=http%3A%2F%2Fa.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2F95eef01f3a292df550d847d5b5315c6035a873d3.jpg',
];

export default class HomePage extends Component {

    static navigationOptions = {
        title: '首页',
        header: (<NavBar title="首页" leftButtonImage={require('../images/main/scane_icon.png')} rightButtonImage={require('../images/main/message_right_icon.png')}></NavBar>
        ),
        tabBarLabel: '首页',
        tabBarIcon: ({ focused, tintColor }) => (
            <TabBarItem
                tintColor={tintColor}
                focused={focused}
                normalImage={require('../images/main/home_tab_unselect.png')}
                selectedImage={require('../images/main/home_tab_select.png')}
            />
        )


    };



    constructor(props) {
        super(props);
        this.state = {
            swiperShow: false,
            dataSource: {},
            bannerUrls: [],
        };

        if (deviceWidth < 375) {
            bannerHeight = bannerHeight * heightFlex - 10;
            menuHeight = menuHeight * heightFlex - 10;
            menuMarginBottom = menuMarginBottom * heightFlex - 4;
        }
        if (deviceHeight < 667) {
            cardHeight = cardHeight * heightFlex;
        }

        UserData.initData();

        console.log("aaaa:"+JSON.stringify(this.props.navigation.state));

    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({ swiperShow: true });
        }, 0);
        UserData.getConfig((res) => {
            let bannerJson = res.bannerList;
            let banners = [];
            for (var i = 0; i < bannerJson.length; i++) {
                banners.push(bannerJson[i].banner_img);
            }
            this.setState({ dataSource: res, bannerUrls: banners });
        }, undefined);
    }

    componentWillReceiveProps(){
        console.log("aaaa:"+JSON.stringify(this.props.navigation.state));
    }
    
    bannerSelect(index){
        var bannerList = this.state.dataSource.bannerList;
        if(index < bannerList.length){
            let bannerInfo = bannerList[index];
            Router.pushPage(this,bannerInfo.banner_url,{title:bannerInfo.banner_name});
            // this.props.navigation.navigate('WebViewPage',{url:bannerInfo.banner_url,title:bannerInfo.banner_name});
        }
        

    }

    renderSwiper() {
        if (this.state.bannerUrls.length > 0) {
            return (
                <BannerView images={this.state.bannerUrls} itemClick={(key) => this.bannerSelect(key)} style={{ height: bannerHeight }} />
            );
        } else {
            return <View style={{ height: bannerHeight, width: deviceWidth }}>
                <Image
                    key={"aaa"}
                    resizeMode='cover'
                    style={{ flex: 1 }}
                    source={{ uri: IMGS[0] }}
                />
            </View>;
        }
    }

    //首页中间功能菜单
    getMenuCenter() {
        var itemDataSource = [
            { icon: require('../images/main/home_item_baoxian.png'), title: '保险' },
            { icon: require('../images/main/home_item_daikuan.png'), title: '贷款' },
            { icon: require('../images/main/home_item_card.png'), title: '银行卡' },
            { icon: require('../images/main/home_item_mobile.png'), title: '手机充值' }
        ];
        var menuItemW = deviceWidth / itemDataSource.length;

        var itemViews = [];
        for (var i = 0; i < itemDataSource.length; i++) {
            var titleStr = itemDataSource[i].title;
            var icon = itemDataSource[i].icon;
            var keyStr = 'menuItem' + i;
            itemViews.push(<Button key={keyStr} keyId={keyStr} onPress={(str) => this.props.navigation.navigate('Login', { transition: 'forVertical' })} title={titleStr} iconSource={icon} iconStyle={{ width: 40, height: 40, marginBottom: menuMarginBottom }} textStyle={{ color: '#333435', fontSize: 14, }} buttonStyle={{ height: menuHeight, width: menuItemW }} />);
        }

        return (<View style={{ flexDirection: 'row', height: menuHeight + 25, alignItems: 'center' }}>
            {itemViews}
        </View>);
    }

    onAnimationEnd(e) {
        var offSetX = e.nativeEvent.contentOffset.x;

    }

    getCardView() {
        return (
            <View style={{ width: 299, height: 189, marginRight: 20, justifyContent: 'center', alignItems: 'center' }}>
                <Image source={require('../images/main/card_demo.png')} resizeMode='contain' style={{ width: 299, height: 189, position: 'absolute' }} />
                {/* <View style={{justifyContent:'center',alignItems:'center',backgroundColor:'transparent',width:299}}>
                    <Text style={{justifyContent:'center',backgroundColor:'transparent',fontSize:22}}>1242 3423 2342 3423</Text>
                </View> */}
            </View>
        );
    }

    getCardCenter() {
        var titleView = (<View style={{ flexDirection: 'row', marginLeft: 10, alignItems: 'center', height: 50, width: deviceWidth, alignItems: 'center' }}>
            <Text style={{ color: 'black', backgroundColor: 'transparent', fontSize: 16 }}>信用卡中心</Text>
            <Button title='申请' textStyle={{ color: ColorUtil.styleColor, fontSize: 16 }} buttonStyle={{ height: 34, width: 90, position: 'absolute', right: 0 }} onPress={() => console.log('')} />
        </View>);

        return (
            <View style={{ height: 250, flex: 1 }}>
                {titleView}
                <ScrollView horizontal={true} //水平滑动
                    ref="scrollView"
                    pagingEnabled={false}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    style={{ width: deviceWidth, height: 200, marginTop: 0 }}//设置大小
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { x: 620 } } }]//把contentOffset.x绑定给this.state.xOffset
                    )}
                    scrollEventThrottle={100}
                    onMomentumScrollEnd={this.onAnimationEnd.bind(this)}>
                    <View style={{ width: 30 }} />

                    {this.getCardView()}
                    {this.getCardView()}
                </ScrollView>
            </View>
        );
    }
    /**
     onScroll={Animated.event([{nativeEvent: {contentOffset: {y: 1200}}}]//把contentOffset.x绑定给this.state.xOffset)}
     */
    render() {
        return (
            <View style={styles.container}>

                <StatusBar barStyle={'light-content'} backgroundColor={ColorUtil.styleColor} />

                <ScrollView horizontal={false} //水平滑动
                    ref="scrollView"
                    pagingEnabled={false}
                    showsHorizontalScrollIndicator={false}
                    style={{ width: deviceWidth, height: deviceHeight, marginTop: 0 }}//设置大小
                    scrollEventThrottle={100}
                >
                    {/* bannerVView*/}
                    {this.renderSwiper()}
                    {/* 功能菜单View*/}
                    {this.getMenuCenter()}
                    <ViewLine />
                    {/* 功信用卡中心View*/}
                    {this.getCardCenter()}
                </ScrollView>

                {/* navBarView,放最底部，显示在最上面*/}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        marginTop: viewMarginTop,
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
    banner: {
        width: deviceWidth,
        height: 100,
    },
});
