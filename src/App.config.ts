const AppConfig = {
  storage: {
    PERSISTENCE_KEY: 'NAVIGATION_STATE',
    PREFERENCE_KEY: 'APP_PREFERENCES',
  },
  maintenance: {
    house: {
      /** Show the notification reminder message x days before */
      days: 7,
    },
    rental: {
      /** Show the notification reminder message x days before */
      days: 7,
    },
  },
};

export default AppConfig;
