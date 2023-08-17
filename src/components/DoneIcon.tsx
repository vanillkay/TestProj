import {FC} from 'react';
import LottieView from 'lottie-react-native';
import Animated, {
  interpolate,
  SharedValue,
  Extrapolation,
  useAnimatedProps,
} from 'react-native-reanimated';

import {COMMON_VALUES, SCREEN_WIDTH} from '@constants';
import checkAnimation from '@assets/check-animation.json';

const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);

export const DoneIcon: FC<{
  translateX: SharedValue<number>;
  isCompleted: boolean;
}> = ({translateX, isCompleted}) => {
  const animatedProps = useAnimatedProps(() => ({
    progress: isCompleted
      ? 0
      : interpolate(
          translateX.value,
          [SCREEN_WIDTH * 0.1, SCREEN_WIDTH * 0.25],
          [0, 1],
          Extrapolation.CLAMP,
        ),
  }));

  return (
    <AnimatedLottieView
      loop={false}
      source={checkAnimation}
      renderMode={'SOFTWARE'}
      animatedProps={animatedProps}
      style={{width: COMMON_VALUES.FULL, height: COMMON_VALUES.FULL}}
    />
  );
};
