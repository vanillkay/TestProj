import {FC} from 'react';
import {Pressable} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import {COMMON_VALUES} from '@constants';
import {AText} from '@components';

interface AButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
}

export const AButton: FC<AButtonProps> = ({title, onPress, disabled}) => (
  <Pressable
    style={[
      styles.button,
      disabled
        ? {backgroundColor: EStyleSheet.value('$primaryDisabled')}
        : undefined,
    ]}
    onPress={onPress}
    disabled={disabled}>
    <AText
      size={COMMON_VALUES.FONT_SIZE_16}
      color={EStyleSheet.value('$secondaryBg')}>
      {title}
    </AText>
  </Pressable>
);

const styles = EStyleSheet.create({
  button: {
    backgroundColor: '$primaryColor',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: COMMON_VALUES.SIZE_16,
    padding: COMMON_VALUES.SIZE_8,
  },
});
