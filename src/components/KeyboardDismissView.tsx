import {FC, PropsWithChildren} from 'react';
import {
  View,
  Keyboard,
  ViewProps,
  TouchableWithoutFeedback,
} from 'react-native';

export const KeyboardDismissView: FC<PropsWithChildren<ViewProps>> = ({
  children,
  ...viewProps
}) => (
  <TouchableWithoutFeedback accessible={false} onPress={Keyboard.dismiss}>
    <View {...viewProps}>{children}</View>
  </TouchableWithoutFeedback>
);
