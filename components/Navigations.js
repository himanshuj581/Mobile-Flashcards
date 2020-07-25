import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import Home from './Home'
import DeckDetails from './DeckDetails'
import Deck from './Deck'
import NewCard from './NewCard'
import NewDeck from './NewDeck'
import Quiz from './Quiz'
import { darkGreen, white } from '../utils/app-colors'

const Navigations = createStackNavigator({
    Home: {screen: Home},
    DeckDetails: {screen: DeckDetails},
    NewCard: {screen: NewCard},
    Deck: {screen: Deck},
    NewDeck: {screen: NewDeck},
    Quiz: {screen: Quiz}
}, 
    {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: darkGreen,
            height: 80
        },
        headerTintColor: white,
        headerTitleStyle: 'bold',
        headerBackTitle: 'back'
    }
})


export default createAppContainer(Navigations)