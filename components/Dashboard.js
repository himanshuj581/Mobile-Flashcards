import React, { Component } from 'react'
import { SafeAreaView, View, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { getAllDecks } from '../actions'
import { getDecks } from '../utils/api'
import { white, darkGreen } from '../utils/colors'
import Deck from './Deck'
import { AppLoading } from 'expo'
import { AntDesign } from '@expo/vector-icons'

export class Dashboard extends Component {
  static navigationOptions = {
    title: 'Mobile Flashcards'
  }

  state = {
    ready: false
  }

  componentDidMount() {
    const { dispatch } = this.props
    getDecks()
      .then(decks => dispatch(getAllDecks(decks)))
      .then(() => this.setState(() => ({ ready: true })))
  }

  navigateToDeckDetail = (deck) => {
    this.props.navigation.navigate('DeckDetails', { deck })
  }
  render() {
    const { decks } = this.props
    const { ready } = this.state
    if (ready === false) {
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
          <TouchableOpacity style={styles.primaryBtn} onPress={() => this.props.navigation.navigate('AddDeck')}>
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
  primaryBtn: {
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
export default connect(mapStateToProps)(Dashboard)