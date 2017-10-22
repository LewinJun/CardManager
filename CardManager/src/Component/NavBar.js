import React, { Component, PropTypes } from 'react';
import {
    View,
    Image,
    TouchableWithoutFeedback,
    Text,
    StyleSheet
} from 'react-native';
import Button from './Button'

import {
    DrawerNavigator
} from 'react-navigation';


var Dimensions = require('Dimensions');
var deviceWidth = Dimensions.get('window').width;

var Platform = require('Platform');
var marginTop = 0;
var titleAlign = 'center';
if (Platform.OS === 'android') {
    //todo 
    marginTop = 0;
    titleAlign = 'left';
} else {
    //todo  
}

export default class NavBar extends Component {

    constructor(props) {
        super(props);
        //leftButtonImage
        //rightButtonImage
        //navBarStyle
        //titleStyle
        //title
        this.state = {
            height: { height: 66 },
        };
    }

    getLeftButton() {
        var leftImageSource = this.props.leftButtonImage;
        var leftImageStyle = {};
        if (this.props.leftButtonImage === null) {
            return (<View />);
        }

        if (this.props.leftButtonImage === undefined) {
            leftImageSource = require('../images/back.png');
            leftImageStyle = { width: 30, height: 30 };

        }
        return (
            <Button title='' source={leftImageSource}
                imageStyle={[{ width: 20, height: 20 }, leftImageStyle]} buttonStyle={{ width: 40, height: 44 }}
                contentViewStyle={{ width: 44, height: 44, marginLeft: 4 }} onPress={() => this.leftClick()} />
        );
    }

    leftClick() {
        if (this.props.leftButtonClick !== undefined) {
            this.props.leftButtonClick();
        } else
            if (this.props.leftButtonImage === undefined) {
                this.props.navigation.goBack();
            }
    }

    getRightButton() {
        if (this.props.rightButtonImage === undefined) {
            return (<View />);
        }
        return (
            <Button title='' source={this.props.rightButtonImage}
                imageStyle={{ width: 20, height: 20 }} buttonStyle={{ width: 40, height: 44 }}
                contentViewStyle={{ width: 44, height: 44, marginLeft: 5 }} onPress={() => this.rightClick()} />
        );
    }

    rightClick() {
        if (this.props.rightButtonClick !== undefined) {
            this.props.rightButtonClick();
        }
    }

    componentDidMount() {
        if (Platform.OS === 'android') {
            this.setState({ height: { height: 44 } });
        }
    }

    getTitleView() {
        if (Platform.OS === 'android') {
            return (
                <View style={{ flex: 5, height: 44, marginTop: this.state.height.height - 44, justifyContent: 'center' }}>
                    <Text style={[{ color: 'white', fontSize: 22, backgroundColor: 'transparent' }, this.props.titleStyle]}>{this.props.title}</Text>
                </View>
            );
        } else {
            return (
                <View style={{ flex: 5, height: 44, marginTop: this.state.height.height - 44, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={[{ color: 'white', fontSize: 22, backgroundColor: 'transparent' }, this.props.titleStyle]}>{this.props.title}</Text>
                </View>
            );
        }
    }

    render() {
        return (
            <View style={[this.props.navBarStyle, this.state.height, { flexDirection: 'row', width: deviceWidth, marginTop: marginTop, position: 'absolute', top: 0, }]}>

                <View style={{ flex: 1, height: 44, marginTop: this.state.height.height - 44, flexDirection: 'row' }}>
                    {this.getLeftButton()}
                </View>
                {this.getTitleView()}
                <View style={{ flex: 1, height: 44, marginTop: this.state.height.height - 44, flexDirection: 'row' }}>
                    {this.getRightButton()}
                </View>

            </View>
        );
    }
}