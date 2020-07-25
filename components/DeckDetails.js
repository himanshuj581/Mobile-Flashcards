import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { white, grey } from '../utils/app-colors'
import { clearLocalNotifications, setLocalNotification } from '../utils/notifications'
import SolidButton from './SolidButton'
import TranslucentButton from './TranslucentButton'


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
                    <SolidButton text={{buttonText: 'Play a Quiz'}} action= {this.StartQuiz} disabled={false}/>
                </View>
                <View style={styles.addButtonView}>
                    <TranslucentButton text={{buttonText: 'Add a card'}} action= {() => this.props.navigation.navigate('NewCard', { deck })} />                    
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: white
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