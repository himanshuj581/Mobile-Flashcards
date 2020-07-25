import React, { Component } from 'react'
import { View, StatusBar } from 'react-native'
import { Provider } from 'react-redux'
import Navigations from './components/Navigations'
import { lightGreen } from './utils/app-colors'
import { setLocalNotification } from './utils/notifications'
import { createStore } from 'redux'
import reducer from './redux-store/reducer'
import middleware from './redux-store/middleware'

const reduxStore = createStore(reducer, middleware)

export default class App extends Component {
  componentDidMount() {
    setLocalNotification()
  }

  render() {
    return (
      <Provider store={ reduxStore }>
        <View style={{ flex: 1 }} >
          <View style={{ backgroundColor: lightGreen, height: 20 }}>
            <StatusBar translucent backgroundColor= {lightGreen}  />
          </View>
          <Navigations />
        </View>
      </Provider>
    )
  }
}