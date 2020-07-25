import { AsyncStorage } from 'react-native'
import { decks } from './_DATA'

export const MOBILE_FLASHCARDS_STORAGE = 'MOBILE_FLASHCARDS_STORAGE';

export function getDecks() {
    return AsyncStorage.getItem(MOBILE_FLASHCARDS_STORAGE)
        .then(result => {
            if (result !== null) {
                return JSON.parse(result)
            } else {
                AsyncStorage.setItem(MOBILE_FLASHCARDS_STORAGE, JSON.stringify(decks))
                return decks;
            }
        })
}
  
export function getDeck(title) {
    return getDecks()
        .then((decks) => decks[title]);
}

export function saveDeck(title) {
    const deck = { title, questions: []}
    return AsyncStorage.mergeItem(MOBILE_FLASHCARDS_STORAGE, JSON.stringify({
        [title]: deck
    }))
}

export function addCardToDeck(title, card) {
    return getDecks()
        .then((decks) => {
            decks[title.title].questions.push(card)
            AsyncStorage.mergeItem(MOBILE_FLASHCARDS_STORAGE, JSON.stringify(decks))
        })
}