/**
 * Banner 活动页组件  基于react-native-swiper封装
 *
 * @type {Object}
 */
import React, { Component,PropTypes } from 'react';
import {
  View,
  Image,
  TouchableWithoutFeedback,
  StyleSheet
} from 'react-native';

import Swiper from 'react-native-swiper';
import SwapperStyleComponent from './SwapperStyleComponent';

export default class BannerImages extends Component {
  // 初始化模拟数据
  constructor(props) {
    super(props);
    
  }
  static propTypes = {
    //参数，图片路径集合
    images : PropTypes.array,
    itemClick : PropTypes.func,
  }
  componentWillMount(){
    if(this.props.height === undefined){
      this.props.height = 238;
    }
  }
  renderImg(){
        var imageViews=[];
        for(var i=0;i<this.props.images.length;i++){
          var imgUrl = this.props.images[i]+'';
          
            imageViews.push(
               <TouchableWithoutFeedback onPress = {() => this.props.itemClick(this.key+'a')}
               key={i} ref="swiper">
                  <Image
                      key={i}
                      resizeMode='cover'
                      style={{flex:1}}
                      source={{uri:imgUrl}}
                      />
              </TouchableWithoutFeedback>
            );
        }
        return imageViews;
    }
    
  render() {
    return (
      
      <View style={{height:this.props.height,}}>
       
      <Swiper height={this.props.height}

            loop={true}
            autoplayDirection={true}
            index={0}
            autoplay={true}
            horizontal={true}
            activeDot = {<SwapperStyleComponent.DotSelectView/>}
            dot = {<SwapperStyleComponent.DotDefaultView/>}
            >
         {this.renderImg()}
     </Swiper>
     </View>
    );
  }
}
