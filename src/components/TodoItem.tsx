import {Text, View} from 'react-native';
import {FC, memo, useEffect} from 'react';
import Feather from 'react-native-vector-icons/Feather';
import EStyleSheet from 'react-native-extended-stylesheet';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  withTiming,
  withSpring,
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
} from 'react-native-reanimated';

import {Todo} from '@types';
import {COMMON_VALUES, SCREEN_WIDTH} from '@constants';

import {AText} from './AText';
import {DoneIcon} from './DoneIcon';
import {TodoStatusIcon} from './TodoStatusIcon';

const TRANSLATE_X_THRESHOLD = -SCREEN_WIDTH * 0.15;

const TODO_ITEM_HEIGHT = 70;

interface TodoItemProps {
  todo: Todo;
  onDismiss: (todo: Todo) => void;
  onComplete: (todo: Todo) => void;
}

export const TodoItem: FC<TodoItemProps> = memo(
  ({todo, onDismiss, onComplete}) => {
    const translateX = useSharedValue(0);
    const itemHeight = useSharedValue(TODO_ITEM_HEIGHT);
    const marginVertical = useSharedValue(COMMON_VALUES.SIZE_8);
    const opacity = useSharedValue(1);

    const panGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>(
      {
        onActive: event => {
          if (event.translationX > 0) {
            if (!todo.isCompleted) {
              translateX.value = event.translationX;
            }
            return;
          }
          translateX.value = event.translationX;
        },
        onEnd: () => {
          const isShouldDismissed = translateX.value < TRANSLATE_X_THRESHOLD;

          const isShouldComplete = translateX.value > -TRANSLATE_X_THRESHOLD;

          if (isShouldDismissed) {
            translateX.value = withTiming(-SCREEN_WIDTH);
            itemHeight.value = withTiming(0);
            marginVertical.value = withTiming(0);
            opacity.value = withTiming(0, undefined, isFinished => {
              if (isFinished) {
                runOnJS(onDismiss)(todo);
              }
            });
            return;
          }

          if (isShouldComplete) {
            itemHeight.value = withTiming(0);
            marginVertical.value = withTiming(0);
            translateX.value = withTiming(
              SCREEN_WIDTH,
              undefined,
              isFinished => {
                if (isFinished) {
                  runOnJS(onComplete)(todo);
                }
              },
            );
            return;
          }

          translateX.value =
            translateX.value > 0 ? withSpring(0) : withTiming(0);
        },
      },
    );

    const rTaskStyle = useAnimatedStyle(() => ({
      transform: [
        {
          translateX: translateX.value,
        },
      ],
    }));

    useEffect(() => {
      if (todo.isCompleted && translateX.value !== 0) {
        itemHeight.value = TODO_ITEM_HEIGHT;
        marginVertical.value = COMMON_VALUES.SIZE_8;
        translateX.value = withTiming(0);
      }
    }, [todo.isCompleted]);

    const rTrashIconStyle = useAnimatedStyle(() => ({
      opacity: withTiming(translateX.value < TRANSLATE_X_THRESHOLD ? 1 : 0),
    }));

    const rTaskContainerStyle = useAnimatedStyle(() => ({
      height: itemHeight.value,
      opacity: opacity.value,
      marginVertical: marginVertical.value,
    }));

    return (
      <Animated.View style={[styles.taskContainer, rTaskContainerStyle]}>
        <View style={[styles.iconContainer, {left: '5%'}]}>
          <DoneIcon translateX={translateX} isCompleted={todo.isCompleted} />
        </View>

        <PanGestureHandler
          failOffsetY={[-5, 5]}
          activeOffsetX={[-5, 5]}
          onGestureEvent={panGesture}>
          <Animated.View style={[styles.task, rTaskStyle]}>
            <AText size={COMMON_VALUES.FONT_SIZE_18}>{todo.title}</AText>

            <TodoStatusIcon isCompleted={todo.isCompleted} />
          </Animated.View>
        </PanGestureHandler>

        <Animated.View style={[styles.iconContainer, rTrashIconStyle]}>
          <Feather name="trash" size={COMMON_VALUES.SIZE_28} color="red" />
        </Animated.View>
      </Animated.View>
    );
  },
);

const styles = EStyleSheet.create({
  task: {
    height: TODO_ITEM_HEIGHT,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: COMMON_VALUES.SIZE_18,
    backgroundColor: '$secondaryBg',
    borderRadius: COMMON_VALUES.SIZE_12,
    shadowOpacity: 0.05,
    shadowOffset: {
      width: 0,
      height: COMMON_VALUES.SIZE_18,
    },
    shadowRadius: COMMON_VALUES.SIZE_8,
    elevation: 5,
  },

  taskContainer: {
    paddingHorizontal: COMMON_VALUES.SIZE_16,
  },

  iconContainer: {
    height: TODO_ITEM_HEIGHT,
    width: TODO_ITEM_HEIGHT,
    position: 'absolute',
    right: '5%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -1,
  },
});
