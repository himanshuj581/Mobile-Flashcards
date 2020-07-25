import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import {  white, darkGreen, lightGreen, green, red, grey} from '../utils/app-colors'
import SolidButton from './SolidButton'
import TranslucentButton from './TranslucentButton'

export class Quiz extends Component {
    static navigationOptions = {
        title: 'Quiz'
    }
    state = {
        currentQuestion: 0,
        corrects: 0,
        wrong: 0,
        showingQuestion: true,
        total: 0
    }
    handleAnswer = (question, userAnswer) => {
        const { answer } = question
        if (answer.toLowerCase() == userAnswer) {
            this.setState({
                corrects: this.state.corrects + 1,
            })
        } else {
            this.setState({
                wrong: this.state.wrong + 1,
            })
        }
        this.setState({
            total: this.state.total + 1
        })

        this.setState({
            showingQuestion: true,
            currentQuestion: this.state.currentQuestion + 1,
        })
    }
    resetQuiz = (state) => {
        this.setState({
            currentQuestion: 0,
            corrects: 0,
            wrong: 0,
            showingQuestion: true,
            total: 0
        });
    }

    render() {
        const { deck } = this.props
        const questions = deck.questions;
        const question = questions[this.state.currentQuestion]
        if (questions.length === 0) {
            return (
                <View style={styles.container}>
                    <View style={styles.section}>
                        <Text style={styles.heading}>There are no cards in this Deck.</Text>
                        <TouchableOpacity style={{ marginTop: 40, backgroundColor: darkGreen, padding: 20, borderRadius: 40 }} onPress={() => this.props.navigation.navigate('NewCard', { deck })}>
                            <Text style={{ textAlign: 'center', fontSize: 18, color: white, fontWeight: 'bold' }}>Add Card to deck</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }
        if (this.state.total === questions.length) {
            const { corrects, wrong } = this.state
            const percent = ((corrects/(corrects+wrong))*100).toFixed(0)
            return (
                <View style={styles.container}>
                    <Text style={[styles.heading, {fontWeight: 'bold'}]}>Quiz Result</Text>
                    <View style={styles.section}>
                        <Text style={{ textAlign: 'center', fontSize: 18, marginBottom: 10, color: darkGreen, fontWeight: 'bold' }}>Correct: {corrects}</Text>
                        <Text style={{ textAlign: 'center', fontSize: 18, marginBottom: 10, color: darkGreen, fontWeight: 'bold' }}>Incorrect: {wrong}</Text>
                        <Text style={{ textAlign: 'center', fontSize: 20,padding: 30, marginBottom: 10,marginTop: 20, color: white, fontWeight: 'bold', backgroundColor: darkGreen, borderRadius: 60, alignSelf: 'center' }}>{percent}%</Text>
                    </View>
                    <View>
                        <SolidButton  text={{buttonText: 'Reset quiz'}} action= {() => this.resetQuiz(this.state)} disabled={false}/>
                        <TranslucentButton text={{buttonText: 'Go back to deck'}} action={() => this.props.navigation.goBack()} />
                    </View>
                </View>
            )
        }
        return (
            <View style={styles.container}>
                <View style={{ marginBottom: 10 }}>
                    <Text style={styles.heading}>{deck.title}</Text>
                    <View>
                        <Text style={{ fontSize: 18, color: grey, textAlign: 'center' }}>Card {this.state.currentQuestion + 1}/{questions.length}</Text>
                    </View>
                </View>
                <View>
                    {
                        this.state.showingQuestion === true ?
                            <View style={styles.section}>
                                <Text style={{ fontSize: 18, color: grey, marginBottom: 10, fontWeight: 'bold' }}>Question:</Text>
                                <Text style={styles.question}>{question.question}</Text>
                            </View>
                            :
                            <View style={styles.section}>
                                <Text style={{ fontSize: 18, color: grey, marginBottom: 10, fontWeight: 'bold' }}>Answer:</Text>
                                <Text style={styles.question}>{question.answer}</Text>
                            </View>
                    }
                </View>
                <View style={styles.section}>
                    <TouchableWithoutFeedback onPress={() => this.setState({ showingQuestion: !this.state.showingQuestion })}>
                        {
                            this.state.showingQuestion === true ?
                                <Text style={{fontWeight: 'bold', fontSize: 18, color: '#1b5e20', alignSelf: 'center' }}>Show answer</Text> :
                                <Text style={{fontWeight: 'bold', fontSize: 18, color: '#1b5e20', alignSelf: 'center' }}>Show question</Text>
                        }
                    </TouchableWithoutFeedback>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.correctButton} onPress={() => this.handleAnswer(question, 'true')}>
                        <Text style={styles.buttonText}>Correct</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.wrongButton} onPress={() => this.handleAnswer(question, 'false')}>
                        <Text style={styles.buttonText}>Wrong</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        paddingBottom: 20,
        paddingTop:20,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: white
    },
    section: {
        padding: 20
    },
    question: {
        fontSize: 32,
        color: darkGreen,
        alignSelf: 'stretch',
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 10,
        backgroundColor: lightGreen,
        borderWidth: 4,
        borderColor: darkGreen,
        borderRadius: 15,
    },
    heading: {
        fontSize: 32,
        marginBottom: 10,
        textAlign: 'center',
    },
    buttonContainer: {
        margin: 10,
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    correctButton: {
        backgroundColor: green,
        padding: 20,
        paddingLeft: 30,
        paddingRight: 30,
        borderRadius: 7,
        marginTop: 10,
        marginBottom: 10,
        flex: 1
    },
    wrongButton: {
        backgroundColor: red,
        padding: 20,
        paddingLeft: 30,
        paddingRight: 30,
        borderRadius: 7,
        marginTop: 10,
        marginBottom: 10,
        flex: 1,
    },
    buttonText: {
        color: white,
        textAlign: 'center',
        fontSize: 21
    }
})
function mapStateToProps(state, ownProps) {
    return { deck: ownProps.navigation.state.params.deck };
}

export default connect(mapStateToProps)(Quiz)