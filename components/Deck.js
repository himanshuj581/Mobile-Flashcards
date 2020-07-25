import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import { connect } from 'react-redux'
import { darkGreen, lightGreen } from '../utils/colors'

export class Deck extends Component {    
    render() {
        const { deck } = this.props
        return (
            <TouchableWithoutFeedback onPress={() => this.props.navigateToDeckDetail(deck.title)}>
                <View style={[styles.container, styles.deck]}>
                    <Text style={{ fontSize: 32, marginTop: 10, marginBottom: 5, color: darkGreen }}>{deck.title}</Text>
                    <Text style={{ color: darkGreen, fontSize: 18 }}>{deck.questions.length} cards</Text>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 20,
    },
    deck: {
        borderWidth: 5,
        borderColor: darkGreen,
        backgroundColor: lightGreen,
        margin: 15,
        borderRadius: 25
    },
})

function mapStateToProps(state, title) {
    const deck = state[title.title]
    return { deck }
}
export default connect(mapStateToProps)(Deck)