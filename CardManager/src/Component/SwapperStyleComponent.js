'use strict';

// import React from 'react'
import React, { Component } from 'react';
import {
  View,
  StyleSheet
} from 'react-native';

const dotStyles = StyleSheet.create({
  defaultDot:{
    width: 6,
    height: 6,
    borderRadius: 3,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: -25,
  },
  unSelect:{
    backgroundColor: '#708090',
  },
  select:{
    backgroundColor: '#F8F8FF',
  },

});

class DotDefaultView extends Component {
  render() {
    return(<View style={[dotStyles.defaultDot,dotStyles.unSelect]} />)

  }

}
class DotSelectView extends Component {
  render() {
    return(<View style={[dotStyles.defaultDot,dotStyles.select]} />)
  }
}
export default{
  DotDefaultView,
  DotSelectView
}
