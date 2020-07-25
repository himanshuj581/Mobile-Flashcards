import React, { Component } from 'react'
import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import { white, darkGreen } from '../utils/app-colors'

export default class SolidButton extends Component{
    render(){
    return(
        <TouchableOpacity style={styles.Button} onPress={this.props.action} disabled={this.props.disabled}>
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
    },
    buttonText:{
        color: white,
        textAlign: 'center',
        fontSize: 21,
        fontWeight: 'bold'
    }
})