import React, { Component, PropTypes } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  ListView,
  ScrollView,
  Animated,
  TouchableWithoutFeedback,
  Image,
  RefreshControl,
  View
} from 'react-native';

import Footer from './Footer'


const propTypes = {
  dataSource: PropTypes.array,
  onRefresh: PropTypes.func,
  onMore: PropTypes.func,
};
const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
export default class ListViewRefresh extends Component {

  static getListView = (__this) => {
    return __this.refs.refreshListView;
  }


  static defaultProps = {
    removeClippedSubviews: false,
    style: { flex: 1 },
    dataSource: [],
    loadingText: '加载中...',
    renderRow: (rowData, sectionID: number, rowID: number) => {
      return (<View />);
    }

  }

  constructor(props) {
    super(props);

    this.state = {
      isRefreshing: false,
      isLoadMore: false,
      dataSource: ds.cloneWithRows(this.props.dataSource),
    };
  }

  // componentDidUpdate(){
  //   this.setState({dataSource:ds.cloneWithRows(this.props.dataSource)});
  // }

  endRefresh() {
    this.setState({ isRefreshing: false, dataSource: ds.cloneWithRows(this.props.dataSource) });
  }
  endMore() {
    this.setState({ isLoadMore: false, dataSource: ds.cloneWithRows(this.props.dataSource) });
  }

  beginRefresh() {
    this.setState({isRefreshing:true});
    if (this.props.onRefresh !== undefined) {
      this.props.onRefresh();
    }
  }

  render() {
    return (
      <View>
        <ListView
          ref="refreshListView"
          style={this.props.style}
          enableEmptySections = {true}
          dataSource={this.state.dataSource}
          removeClippedSubviews={this.props.removeClippedSubviews}
          renderRow={this.props.renderRow}
          onEndReached={() => {
            if (this.props.onMore !== null) {
              this.setState({ isLoadMore: true });
              if (this.props.onMore !== undefined) {
                this.props.onMore();
              }
            }


          }}
          onEndReachedThreshold={10}
          renderFooter={() => {
            if (this.onMore === null) {
              return <View />;
            }
            return this.state.isLoadMore ? <Footer /> : <View />;
          }}
          refreshControl={
            <RefreshControl
              style={{ backgroundColor: 'transparent' }}
              refreshing={this.state.isRefreshing}
              onRefresh={() => {
                this.setState({ isRefreshing: true });
                if (this.props.onRefresh !== undefined) {
                  this.props.onRefresh();
                }
              }}
              title={this.props.loadingText}
              colors={['#ffaa66cc', '#ff00ddff', '#ffffbb33', '#ffff4444']}
            />
          }
        />
      </View>
    );
  }

}

ListViewRefresh.propTypes = propTypes;