import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Dimensions } from 'react-native'
import { addNewCard } from '../actions'
import { addCardToDeck } from '../utils/api'
import { connect } from 'react-redux'
import { grey, white, darkGreen, red } from '../utils/colors'

export class AddCard extends Component {
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
                        <TextInput
                            onChangeText={this.handleAddQuestion}
                            placeholder={'Type your question here...'}
                            style={styles.input}>
                        </TextInput>
                        {
                            this.state.question.length === 0 &&
                            <Text style={styles.alertText}>Question is requirred!!</Text>
                        }
                        <TextInput
                            onChangeText={this.handleAddAnswer}
                            placeholder={'Is it true or false ?'}
                            style={styles.input}>
                        </TextInput>
                        {
                            this.state.answer.length === 0 &&
                            <Text style={styles.alertText}>Answere is requirred!!</Text>
                        }
                    </KeyboardAvoidingView>
                    <TouchableOpacity style={styles.AddCardButton} onPress={this.onPressButton} disabled={this.state.question === '' || this.state.answer === '' ? true : false}>
                        <Text style={styles.AddCardButtonText}>Add Card</Text>
                    </TouchableOpacity>
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
    AddCardButton: {
        backgroundColor: darkGreen,
        padding: 20,
        paddingLeft: 30,
        paddingRight: 30,
        borderRadius: 40,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        margin: 20
    },
    AddCardButtonText: {
        color: white,
        textAlign: 'center',
        fontSize: 21
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
export default connect(null, mapDispatchToProps)(AddCard)