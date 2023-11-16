import messaging from '@react-native-firebase/messaging';

export class PushNotificationService {
  static async requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }

    return enabled;
  }

  /**
   * Retrieve FCM token
   */
  static async getToken() {
    const token = await messaging().getToken();

    return token;
  }

  static applyListener() {
    messaging().onNotificationOpenedApp(message => {
      console.log('Notification caused app to open from background-state:', message.notification);
    });

    messaging()
      .getInitialNotification()
      .then(msg => {
        if (!msg) return;
        console.log('Notification caused app to open from quit state:', msg.notification);
      });

    messaging().setBackgroundMessageHandler(async msg => {
      console.log('Received an msg during background', msg.notification);
    });

    messaging().onMessage(async msg => {
      console.log('Notification on foreground', msg.notification);
    });
  }
}
