import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    Image,
    Alert,
    StatusBar,
    View
} from 'react-native';
import {
    DrawerNavigator
} from 'react-navigation';

import TabBarItem from '../Component/TabBarItem'
import BannerImages from '../Component/BannerImages'
import NavBar from '../Component/NavBar'

var Dimensions = require('Dimensions');
var deviceWidth = Dimensions.get('window').width;

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
        header:false,
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
        
            swiperShow:false,
            
        };
    }
    componentDidMount(){
        setTimeout(()=>{
            this.setState({swiperShow:true});
        },0);
    }

    renderSwiper(){
        if(this.state.swiperShow){
            return (
                <BannerImages images={IMGS} itemClick={(key) => Alert.alert(
                    'Alert Title',
                    key,
                )} />
            );
        }else {
            return <View style={{height:185}}></View>;
        }
    }

    getMenuCenter(){
        var itemDataSource=[
            {icon:require('../images/activity/activity_menu_my.png'),title:'我的活动'},
            {icon:require('../images/activity/activity_menu_line.png'),title:'线下'},
            {icon:require('../images/activity/activity_menu_sign.png'),title:'签到赢奖'},
            {icon:require('../images/activity/activity_menu_other.png'),title:'其他'}
          ];
          var menuItemW = menuWidth/itemDataSource.length;
          var itemViews = [];
          for(var i = 0; i < itemDataSource.length; i++){  
            var titleStr = itemDataSource[i].title;
            var icon = itemDataSource[i].icon;
            var keyStr = 'menuItem'+i;
            itemViews.push(<Button key={keyStr} keyId={keyStr} onPress={(str)=>Alert.alert(
              'Alert Title',
              str,
          )} title={titleStr} iconSource={icon} iconStyle={{width:40,height:40,marginBottom:6}} textStyle={{color:'#333435',fontSize:14,}}  buttonStyle={{height:menuHeight,width:menuItemW}}/>);  
          }  
        return(
            <View style={{height:80,flex:1}}>
                
            </View>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                
                <StatusBar barStyle={'light-content'} backgroundColor={'#009DF0'} />
                {this.renderSwiper()}
                <Text style={styles.welcome}>
                    Welcome to HomePage!
                </Text>
                <Text style={styles.instructions}>
                    To get started, edit index.ios.js
                </Text>
                <Text style={styles.instructions}>
                    Press Cmd+R to reload,{'\n'}
                    Cmd+D or shake for dev menu
                </Text>
                <NavBar title="首页" leftButtonImage={require('../images/main/scane_icon.png')} rightButtonImage={require('../images/main/message_right_icon.png')}></NavBar>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0ad1ff',
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
