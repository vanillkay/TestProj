import EStyleSheet from 'react-native-extended-stylesheet';
import {BaseToast, ToastConfig} from 'react-native-toast-message';

import {COMMON_VALUES} from '@constants';

export const toastConfig: ToastConfig = {
  success: props => (
    <BaseToast {...props} style={styles.toast} text1Style={styles.toastText} />
  ),
};

const styles = EStyleSheet.create({
  toast: {
    backgroundColor: '$primarySuccess',
    borderRadius: COMMON_VALUES.SIZE_8,
    borderLeftWidth: 0,
  },

  toastText: {
    color: '$secondaryBg',
    fontSize: COMMON_VALUES.FONT_SIZE_16,
  },
});
