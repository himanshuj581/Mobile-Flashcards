import React, { Component } from 'react'
import { StyleSheet, TextInput } from 'react-native'
import { grey } from '../utils/app-colors'

export default class SolidButton extends Component{
    render(){
    return(
        <TextInput
            onChangeText={this.props.action}
            placeholder={this.props.placeholder}
            style={styles.input} />
    )}
}

const styles = StyleSheet.create({   
    input: {
        padding: 20,
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10,
        fontSize: 18,
        borderWidth: 3,
        borderColor: grey,
        borderRadius: 7,
        alignSelf: 'stretch',
        textAlign: 'center'
    },
})