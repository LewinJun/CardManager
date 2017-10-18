import React, {Component} from 'react';
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

var contentX = 0;

export default class BannerView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 0,
            style:{},
            imageStyle:{},
        }
    }

    componentWillMount(){
        // if(this.props.style !== undefined){
        //     this.setState({style:this.props.style});
        // }
        // if(this.props.imageStyle !== undefined){
        //     this.setState({imageStyle:this.props.imageStyle});
        // }
    }

    onAnimationEnd(e) {
        var offSetX = e.nativeEvent.contentOffset.x;
        var currentPage = Math.floor(offSetX / deviceWidth);
        // this.setState({currentPage: currentPage});
    }

    getItem(){
        var imageViews=[];
        contentX = deviceWidth*(this.props.images.length - 1);
        for(var i=0;i<this.props.images.length;i++){
          var imgUrl = this.props.images[i]+'';
          
            imageViews.push(
               <TouchableWithoutFeedback onPress = {() => this.props.itemClick(this.key+'a')}
               key={i} ref="swiper">
                  <Image
                      key={i}
                      resizeMode='cover'
                      style={{flex:1,backgroundColor:'red'}}
                      source={{uri:imgUrl}}
                      />
              </TouchableWithoutFeedback>
            );
        }
        return imageViews;
    }

    getTestView(){
        var imageViews=[];
        imageViews.push(<TouchableWithoutFeedback style={{width:deviceWidth,height:100,backgroundColor:'black'}}>
        <View style={{width:deviceWidth,height:100,backgroundColor:'black'}}/>
        </TouchableWithoutFeedback>);
        imageViews.push(<View style={{width:deviceWidth,height:100,backgroundColor:'blue'}}/>);
        return imageViews;

    }

    render() {
        return (
            <View style={{flex:1}}>
            <ScrollView horizontal={true} //水平滑动
                                    ref="scrollView"
                                    pagingEnabled={true}
                                    showsHorizontalScrollIndicator={false}
                                    style={[{width: deviceWidth, height: 200,marginTop:0,flexDirection:'row',backgroundColor:'red'},this.props.style]}//设置大小
                                    onScroll={Animated.event(
                                        [{nativeEvent: {contentOffset: {x: deviceWidth}}}]//把contentOffset.x绑定给this.state.xOffset
                                    )}
                                    scrollEventThrottle={100}
                                    onMomentumScrollEnd={this.onAnimationEnd.bind(this)}>
                                    
                                    {this.getTestView()}
                                    
                        </ScrollView>
                        </View>
        );
    }
}