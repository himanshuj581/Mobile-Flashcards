import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Dimensions } from 'react-native'
import { addNewCard } from '../redux-store/actions'
import { addCardToDeck } from '../utils/helper'
import { connect } from 'react-redux'
import { grey, white, red } from '../utils/app-colors'
import SolidButton from './SolidButton'
import CustomInput from './CustomInput'


export class NewCard extends Component {
    static navigationOptions = {
        title: 'Add Card'
    }
    state = {
        question: '',
        answer: ''
    }
    handleAddQuestion = (input) => {
        this.setState({
            question: input
        })
    }
    handleAddAnswer = (input) => {
        this.setState({
            answer: input
        })
    }
    onPressButton = () => {
        const { question, answer } = this.state

        const deckId = this.props.navigation.state.params.deck
        this.props.createNewCard(deckId, { question, answer })
        addCardToDeck(deckId, { question, answer })
        this.setState({
            question: '',
            answer: ''
        })
        this.props.navigation.navigate('DeckDetails', deckId)
    }
    render() {
        return (
                <View style={styles.container}>
                    <Text style={styles.heading}>Add a New Card</Text>
                    <KeyboardAvoidingView behavior='padding'>
                        
                        <CustomInput action={this.handleAddQuestion} placeholder='Type your question here...'/>
                        {
                            this.state.question.length === 0 &&
                            <Text style={styles.alertText}>Question is requirred!!</Text>
                        }
                        <CustomInput action={this.handleAddAnswer} placeholder='Is it true or false ?'/>
                        {
                            this.state.answer.length === 0 &&
                            <Text style={styles.alertText}>Answere is requirred!!</Text>
                        }
                    </KeyboardAvoidingView>
                    <View style={styles.buttonView}>
                    <SolidButton text={{buttonText: 'Add Card'}} action= {this.onPressButton} disabled={this.state.question === '' || this.state.answer === '' ? true : false}/> 
                    </View>
                </View>
        )
    }
}

const { width } = Dimensions.get('window')
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        paddingBottom: 20,
        marginTop: 20,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: white
    },
    heading: {
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 10,
        marginTop: 10,
        fontWeight: 'bold',
    },
    buttonView: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
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
    alertText: {
        textAlign: 'right',
        marginBottom: 20,
        marginTop: 5,
        marginRight: 15, 
        fontSize: 16, 
        fontWeight: 'bold', 
        color: red
    },
})
const mapDispatchToProps = dispatch => ({
    createNewCard: (deckId, question, answer) =>
        dispatch(addNewCard(deckId, question, answer))
})
export default connect(null, mapDispatchToProps)(NewCard)