import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Alert,
    View
} from 'react-native';

const styles = StyleSheet.create({
    viewBorder:{
        shadowColor: '#b5b6b7', 
        shadowOffset: { width: 5, height: 5 }, 
        shadowOpacity: 0.4, shadowRadius: 6,
        borderWidth: 0.3, 
        borderColor: '#b5b6b7', 
        borderRadius: 6, 
        elevation: 3, 
        backgroundColor: 'white'
    },
    viewBottomBorder:{
        shadowColor: '#b5b6b7', 
        shadowOffset: { width: 5, height: 5 }, 
        shadowOpacity: 0.4, shadowRadius: 6,
        borderBottomWidth: 0.5, 
        borderBottomColor: '#b5b6b7', 
        elevation: 3, 
    },
    viewBottomTop:{
        shadowColor: '#b5b6b7', 
        shadowOffset: { width: 5, height: -5 }, 
        shadowOpacity: 0.4, shadowRadius: 6,
        borderTopWidth: 0.5, 
        borderTopColor: '#EBEBEB', 
        elevation: 3, 
    }
});

export default {styles};
