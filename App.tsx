import {Provider} from 'react-redux';
import Toast from 'react-native-toast-message';
import EStyleSheet from 'react-native-extended-stylesheet';
import {PersistGate} from 'redux-persist/integration/react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import {Routes} from '@screens';
import {persistor, store} from '@store';
import {COMMON_VALUES} from '@constants';
import {toastConfig} from '@constants/toastConfig';

EStyleSheet.build({
  $primaryBg: '#E0E0E0',
  $secondaryColor: '#263238',
  $primaryColor: '#212121',
  $primarySuccess: '#22A55F',
  $primaryWarning: '#FFC700',
  $secondaryBg: '#FFFFFF',
  $primaryDisabled: '#a19d9d',
});

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <GestureHandlerRootView style={styles.container}>
            <Routes />
            <Toast config={toastConfig} topOffset={55} />
          </GestureHandlerRootView>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}

const styles = EStyleSheet.create({
  container: {
    flex: COMMON_VALUES.FLEX_ONE,
  },
});
