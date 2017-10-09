import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    TouchableHighlight,
    Image,
    Alert,
    View
} from 'react-native';

var Dimensions = require('Dimensions');
var deviceWidth = Dimensions.get('window').width;
/**
 * 自定义分割线
 */
export default class ViewLine extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: deviceWidth,
            height: 0.7,
            color: '#EBEBEB',
            lineStyle:{},
        }
    }
    initProps() {
        if (this.props.width !== undefined) {
            this.setState({ width: this.props.width });
        }
        if (this.props.color !== undefined) {
            this.setState({ color: this.props.color });
        }
        if (this.props.lineStyle !== undefined) {
            this.setState({ lineStyle: this.props.lineStyle });
        }

    }
    componentDidMount() {
        this.initProps()
    }
    render() {
        return (
            <View style={[{ width: this.state.width, height: this.state.height, backgroundColor: this.state.color },this.state.lineStyle]} />
        )
    }
}