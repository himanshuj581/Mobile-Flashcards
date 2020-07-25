import React, { Component } from 'react'
import { Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Dimensions } from 'react-native'
import { grey, white, darkGreen } from '../utils/app-colors'
import { addNewDeck } from '../redux-store/actions'
import { saveDeck } from '../utils/helper'
import { connect } from 'react-redux'
import CustomInput from './CustomInput'

export class NewDeck extends Component {
    static navigationOptions = {
        title: 'New Deck'
    }
    state = {
        deckTitle: '',
        valid: false
    }
    handleAddTitle = (input) => {
        if (input.length === 0) {
            this.setState({
                valid: false
            })
        }
        this.setState({
            deckTitle: input,
            valid: true
        })
    }
    onPressButton = () => {
        const { deckTitle } = this.state
        this.props.createNewDeck(deckTitle)
        saveDeck(deckTitle)
        this.setState({
            deckTitle: ''
        })
        this.props.navigation.navigate('Home')
    }
    render() {
        return (
            <KeyboardAvoidingView behavior='padding' style={styles.container}>
                <Text style={styles.heading}>New deck</Text>
                <CustomInput action={this.handleAddTitle} placeholder='Name of the new deck'/>
                {
                    !(this.state.valid)  &&
                    <Text style={{fontWeight:'bold'}}>The deck must have a title</Text>
                }
                <TouchableOpacity style={styles.SubmitButton} onPress={this.onPressButton} disabled={!this.state.valid}>
                    <Text style={{color: white, textAlign: 'center', fontSize: 24, fontWeight: 'bold'}}>Add Deck</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        )
    }
}
const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingBottom: 20,
        paddingTop: 20,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: white
    },
    heading: {
        fontSize: 32,
        textAlign: 'center',
        marginBottom: 20,
        fontWeight: 'bold',
    },
    SubmitButton: {
        backgroundColor: darkGreen,
        padding: 15,
        paddingLeft: 30,
        paddingRight: 30,
        borderRadius: 50,
        margin: 15,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    input: {
        padding: 20,
        margin: 15,
        fontSize: 18,
        borderWidth: 2,
        borderColor: grey,
        borderRadius: 40,        
        alignSelf: 'stretch',
        textAlign: 'center'
    }
})

const mapDispatchToProps = dispatch => ({
    createNewDeck: (title) =>
        dispatch(addNewDeck(title))
})
export default connect( null, mapDispatchToProps)(NewDeck)