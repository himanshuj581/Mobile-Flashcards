import React, { Component } from 'react'
import { View,Text,  StatusBar } from 'react-native'
import { createStore } from 'redux'
import Constants from 'expo-constants'
import { Provider } from 'react-redux'
import reducer from './reducers'
import middleware from './middleware'
import MainNavigation from './components/MainNavigation'
import { lightGreen } from './utils/colors'
import { setLocalNotification } from './utils/notifications'

const store = createStore(reducer, middleware)

export default class App extends Component {
  componentDidMount() {
    setLocalNotification()
  }
  render() {
    return (
      <Provider store={ store }>
        <View style={{ flex: 1 }} >
          <View style={{ backgroundColor: lightGreen, height: Constants.statusBarHeight }}>
            <StatusBar translucent backgroundColor= {lightGreen}  />
          </View>
          <MainNavigation />
        </View>
      </Provider>
    )
  }
}