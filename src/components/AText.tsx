import {FC, PropsWithChildren} from 'react';
import {Text, TextProps} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import {setIfTrue} from '@helpers';
import {COMMON_VALUES} from '@constants';

interface ATextProps extends TextProps {
  bold?: boolean;
  size?: number;
  color?: string;
}

export const AText: FC<PropsWithChildren<ATextProps>> = ({
  bold = false,
  size = COMMON_VALUES.FONT_SIZE_14,
  children,
  color = EStyleSheet.value('$primaryColor'),
  ...props
}) => (
  <Text
    style={[{fontSize: size, color}, setIfTrue(bold, {fontWeight: 'bold'})]}
    {...props}>
    {children}
  </Text>
);
