import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import { white, grey, darkGreen } from '../utils/colors'
import { clearLocalNotifications, setLocalNotification } from '../utils/notifications'

export class DeckDetails extends Component {
    static navigationOptions = {
        title: 'Deck Details'
    }

    StartQuiz = () => {
        const deck = this.props.deck

        clearLocalNotifications()
            .then(setLocalNotification)
            .then(this.props.navigation.navigate('Quiz', { deck }))

    }
    render() {
        const { deck } = this.props
        return (
            <View style={styles.container}>
                <View style={{marginTop: 30}}>
                    <Text style={{ fontSize: 32, marginTop: 10, marginBottom: 5, textAlign: 'center', fontWeight: 'bold' }}>{deck.title}</Text>
                    <Text style={{ color: grey, fontSize: 18, textAlign: 'center' }}>{deck.questions.length} cards</Text>
                </View>
                <View style={styles.quizButtonView}>
                    <TouchableOpacity style={styles.quizButton} onPress={this.StartQuiz}>
                        <Text style={styles.quizButtonText}>Play a Quiz</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.addButtonView}>
                    <TouchableOpacity style={[styles.quizButton, styles.addCardButton]} onPress={() => this.props.navigation.navigate('AddCard', { deck })}>
                        <Text style={styles.addCardButtonText}>Add a card</Text>
                    </TouchableOpacity>
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
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: white
    },
    quizButton: {
        backgroundColor: darkGreen,
        padding: 15,
        borderRadius: 30,
        margin: 20,
        borderWidth: 5,
        borderColor: white,
    },
    addCardButton: {
        backgroundColor: white,
        borderColor: '#2e7d32',
        borderWidth: 5,
        bottom: 0,
    },
    quizButtonText: {
        color: white,
        textAlign: 'center',
        fontSize: 21,
        fontWeight: 'bold'
    },
    addCardButtonText: {
        color: darkGreen,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 21
    },
    quizButtonView: {
        position: 'absolute',
        bottom: 80,
        left: 0,
        right: 0,
    },
    addButtonView: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
})

function mapStateToProps(state, ownProps) {
    return { deck: state[ownProps.navigation.state.params.deck] };
}
export default connect(mapStateToProps)(DeckDetails)