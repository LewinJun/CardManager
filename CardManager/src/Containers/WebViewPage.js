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
    WebView,
    View
} from 'react-native';
import {
    DrawerNavigator
} from 'react-navigation';

import Util from '../Util/Util'

let _this = undefined;

let setParamsFunc;

export default class WebViewPage extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.title,
        backTitle:''
    });

    constructor(props) {
        super(props);
        _this = this;

        var uri = '';
        var title = '稳稳卡';

        if (this.props.navigation.state.params) {
            if(!Util.isEmpty(this.props.navigation.state.params.url)){
                uri = this.props.navigation.state.params.url;
            }

            if(Util.isEmpty(this.props.navigation.state.params.title)){
                // setParamsFunc({title:this.props.navigation.state.params.title});
                this.props.navigation.setParams({title:title});
            }
            
        }
        this.state = {
            url:uri,
        }
    }

    onNavigationStateChange = (navState) => {

        this.props.navigation.setParams({title:navState.title});
        // this.setState({
        //   backButtonEnabled: navState.canGoBack,
        //   forwardButtonEnabled: navState.canGoForward,
        //   url: navState.url,
        //   status: navState.title,
        //   loading: navState.loading,
        //   scalesPageToFit: true
        // });
      };
    

    render() {
        return (<WebView
            source={{uri:this.state.url}}
            mixedContentMode='always'
            onNavigationStateChange={this.onNavigationStateChange}
            domStorageEnabled={true}
            javaScriptEnabled = {true}
            style={{flex:1}}
        />);
    }
}