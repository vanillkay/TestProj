import {View} from 'react-native';
import {FC, useEffect, useRef} from 'react';
import LottieView from 'lottie-react-native';

import {Todo} from '@types';
import doneAnimation from '@assets/done-animation.json';

export const TodoStatusIcon: FC<Pick<Todo, 'isCompleted'>> = ({
  isCompleted,
}) => {
  const isInitialCompleted = useRef(isCompleted);

  const lottieViewRef = useRef<LottieView | null>(null);

  useEffect(() => {
    if (isCompleted) {
      lottieViewRef.current?.play();
    }
  }, [isCompleted]);

  return (
    <View style={{width: 50, height: 90, marginRight: 16}}>
      <LottieView
        speed={2}
        loop={false}
        ref={lottieViewRef}
        resizeMode="cover"
        renderMode={'SOFTWARE'}
        source={doneAnimation}
        progress={isInitialCompleted.current ? 1 : 0}
        style={{
          flex: 1,
        }}
      />
    </View>
  );
};
