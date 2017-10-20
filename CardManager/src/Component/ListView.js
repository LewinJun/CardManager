import React, { Component } from 'react';
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

export default class ListView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isRefreshing: false,
            isLoadMore: false,
          };
    }

    render() {
        return (
          <View>
            <ListView
              style={this.props.style}
              dataSource={this.props.dataSource}
              removeClippedSubviews={this.props.removeClippedSubviews}
              renderRow={this.props.renderRow}
              onEndReached={() => {
                this.setState({ isLoadMore: true });
                setTimeout(() => {
                  this.setState({ isLoadMore: false });
                  
                  {/* Alert.alert(
                                    'Alert Title',
                                    'cccc',
                                ) */}
                }, 3000);
              }}
              onEndReachedThreshold={10}
              renderFooter={() => {
                return this.state.isLoadMore ? <Footer /> : <View />;
              }}
              refreshControl={
                <RefreshControl
                  style={{backgroundColor: 'transparent'}}
                  refreshing={this.state.isRefreshing}
                  onRefresh={() => {
                     this.setState({ isRefreshing:true});
                     if(this.props.onRefresh !== undefined){
                        this.props.onRefresh();
                     }

                    setTimeout(() => {
                      this.setState({ dataSource: ds.cloneWithRows(dataSourceArrayInit) ,isRefreshing:false});
                    }, 3000);
                  }}
                  title="Loading..."
                  colors={['#ffaa66cc', '#ff00ddff', '#ffffbb33', '#ffff4444']}
                />
              }
            />
            {this.getMenuView()}
          </View>
        );
      }

}