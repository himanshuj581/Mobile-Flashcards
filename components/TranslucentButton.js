import React, { Component } from 'react'
import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import { white, darkGreen } from '../utils/app-colors'

export default class SolidButton extends Component{
    render(){
        console.log(this.props.action,typeof(this.props.action))
    return(
        <TouchableOpacity style={styles.Button} onPress={this.props.action}>
            <Text style={styles.buttonText}>{this.props.text.buttonText}</Text>
        </TouchableOpacity>
    )}
}

const styles = StyleSheet.create({
    Button: {
        backgroundColor: darkGreen,
        padding: 15,
        borderRadius: 30,
        margin: 20,
        borderWidth: 5,
        borderColor: white,
        backgroundColor: white,
        borderColor: '#2e7d32',
        borderWidth: 5,
        bottom: 0,
    },
    buttonText:{
        color: darkGreen,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 21
    }
})