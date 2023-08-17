import LottieView from 'lottie-react-native';

import {COMMON_VALUES} from '@constants';
import emptyAnimation from '@assets/empty-animation.json';

export const EmptyTodos = () => (
  <LottieView
    autoPlay
    source={emptyAnimation}
    renderMode={'SOFTWARE'}
    style={{height: COMMON_VALUES.FULL}}
  />
);
