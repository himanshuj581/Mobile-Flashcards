import React, { Component } from 'react'
import { SafeAreaView, View, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { getAllDecks } from '../redux-store/actions'
import { getDecks } from '../utils/helper'
import { white, darkGreen } from '../utils/app-colors'
import Deck from './Deck'
import { AppLoading } from 'expo'
import { AntDesign } from '@expo/vector-icons'

export class Home extends Component {
  static navigationOptions = {
    title: 'Mobile Flashcards'
  }

  state = {
    isAppStart: false
  }

  componentDidMount() {
    const { dispatch } = this.props
    getDecks()
      .then(decks => dispatch(getAllDecks(decks)))
      .then(() => this.setState(() => ({ isAppStart: true })))      
  }

  navigateToDeckDetail = (deck) => {
    this.props.navigation.navigate('DeckDetails', { deck })
  }

  render() {
    const { decks } = this.props
    const { isAppStart } = this.state
    if (isAppStart === false) {
      return <AppLoading />
    }
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={Object.values(decks)}
          renderItem={({ item }) => <Deck title={item.title} navigateToDeckDetail={this.navigateToDeckDetail} />}
          keyExtractor={(item, index) => `list-item-${index}`}
        />
        <View style={{ paddingHorizontal: 10, alignItems: 'center' }}>
          <TouchableOpacity style={styles.addButton} onPress={() => this.props.navigation.navigate('NewDeck')}>
          <AntDesign name="pluscircleo" size={70} color={white} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: white
  },
  addButton: {
    backgroundColor: darkGreen,
    borderRadius: 50,
    marginBottom: 10,
    position: 'absolute',
    bottom: 0,
    right: 0
  },
});

function mapStateToProps(decks) {
  return {
    decks
  }
}
export default connect(mapStateToProps)(Home)