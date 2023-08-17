import {FC, ReactNode} from 'react';
import {TextInput, TextInputProps, View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import {COMMON_VALUES} from '@constants';

interface AInputProps extends TextInputProps {
  rightSlotComponent?: ReactNode;
}

export const AInput: FC<AInputProps> = ({
  rightSlotComponent,
  ...inputProps
}) => (
  <View style={styles.inputWrapper}>
    <TextInput
      style={styles.input}
      selectionColor={EStyleSheet.value('$secondaryColor')}
      placeholderTextColor={EStyleSheet.value('$secondaryColor')}
      {...inputProps}
    />

    <View style={styles.rightSlotWrapper}>{rightSlotComponent}</View>
  </View>
);

const styles = EStyleSheet.create({
  inputWrapper: {
    width: COMMON_VALUES.FULL,
    padding: COMMON_VALUES.SIZE_8,
    borderWidth: COMMON_VALUES.SIZE_2,
    borderRadius: COMMON_VALUES.SIZE_8,
    borderColor: '$secondaryColor',
    justifyContent: 'center',
  },

  input: {
    fontSize: COMMON_VALUES.FONT_SIZE_30,
    minHeight: COMMON_VALUES.SIZE_40,
    paddingRight: COMMON_VALUES.SIZE_40,
  },

  rightSlotWrapper: {
    width: COMMON_VALUES.SIZE_40,
    right: COMMON_VALUES.FONT_SIZE_14,
    height: COMMON_VALUES.SIZE_40,
    position: 'absolute',
  },
});
