import { AsyncStorage } from 'react-native'
import { Notifications } from 'expo'
import * as Permissions from 'expo-permissions';

const NOTIFICATION_OF_MOBILE_FLASHCARDS = 'NOTIFICATION_OF_MOBILE_FLASHCARDS'

export function clearLocalNotifications () {
    return AsyncStorage.removeItem(NOTIFICATION_OF_MOBILE_FLASHCARDS)
        .then(Notifications.cancelAllScheduledNotificationsAsync)
        
}

export function createNotification() {
    return {
        title: 'It quiz time!!!',
        body: 'Hey learner, \n Don\'t forget to study today!',
        ios: {
            sound: true
        },
        android: {
            sound: true,
            priority: 'high',
            sticky: false,
            vibrate: true
        }
    }
}

export function setLocalNotification() {
    AsyncStorage.getItem(NOTIFICATION_OF_MOBILE_FLASHCARDS)
        .then(JSON.parse)
        .then((data) => {
            if (data === null) {
                Permissions.askAsync(Permissions.NOTIFICATIONS)
                    .then(({status}) => {
                        if (status === 'granted') {
                            Notifications.cancelAllScheduledNotificationsAsync()

                            let tomorrow = new Date()
                            tomorrow.setDate(tomorrow.getDate() + 1)
                            tomorrow.setHours(12)
                            tomorrow.setMinutes(0)

                            Notifications.scheduleLocalNotificationAsync(
                                createNotification(), 
                                {
                                    time: tomorrow,
                                    repeat: 'day'
                                }
                            )
                            AsyncStorage.setItem(NOTIFICATION_OF_MOBILE_FLASHCARDS, JSON.stringify(true))
                        }
                    })
            }
        })
}