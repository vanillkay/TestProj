import {FC, PropsWithChildren} from 'react';
import {ViewToken} from 'react-native';
import Animated, {
  withTiming,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

interface AnimatedListItemProps {
  viewableItems: SharedValue<ViewToken[]>;
  item: any;
}

export const AnimatedListItem: FC<PropsWithChildren<AnimatedListItemProps>> = ({
  viewableItems,
  item,
  children,
}) => {
  const rStyle = useAnimatedStyle(() => {
    const isViewable = Boolean(
      viewableItems.value
        .filter(listItem => listItem.isViewable)
        .find(viewableItem => viewableItem.item.id === item.id),
    );

    return {
      opacity: withTiming(isViewable ? 1 : 0),
      transform: [
        {
          scale: withTiming(isViewable ? 1 : 0.6),
        },
      ],
    };
  });

  return <Animated.View style={rStyle}>{children}</Animated.View>;
};
