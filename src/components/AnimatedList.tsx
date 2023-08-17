import {useCallback} from 'react';
import {useSharedValue} from 'react-native-reanimated';
import EStyleSheet from 'react-native-extended-stylesheet';
import {LinearGradient} from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {FlatListProps, FlatList, ViewToken, SafeAreaView} from 'react-native';

import {COMMON_VALUES} from '@constants';

import {AnimatedListItem} from './AnimatedListItem';

const GRADIENT_COLOR = EStyleSheet.value('$primaryBg');

const GRADIENT = [GRADIENT_COLOR, `${GRADIENT_COLOR}00`];

export const AnimatedList = <T,>({
  data,
  renderItem,
  ...rest
}: FlatListProps<T>) => {
  const viewableItems = useSharedValue<ViewToken[]>([]);

  const insets = useSafeAreaInsets();

  const onViewableItemsChanged = useCallback(
    ({viewableItems: items}: {viewableItems: ViewToken[]}) =>
      (viewableItems.value = items),
    [],
  );

  return (
    <SafeAreaView style={styles.flexOne}>
      <LinearGradient style={styles.upGradient} colors={GRADIENT} />

      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        renderItem={listItem => (
          <AnimatedListItem viewableItems={viewableItems} item={listItem.item}>
            {renderItem?.(listItem)}
          </AnimatedListItem>
        )}
        {...rest}
      />

      <LinearGradient
        style={[styles.bottomGradient, {bottom: insets.bottom}]}
        colors={[...GRADIENT].reverse()}
      />
    </SafeAreaView>
  );
};

const styles = EStyleSheet.create({
  flexOne: {
    flex: COMMON_VALUES.FLEX_ONE,
  },

  upGradient: {
    top: COMMON_VALUES.SIZE_8,
    left: 0,
    right: 0,
    zIndex: 2,
    position: 'absolute',
    height: COMMON_VALUES.SIZE_40,
  },

  bottomGradient: {
    left: 0,
    right: 0,
    zIndex: 2,
    bottom: 0,
    position: 'absolute',
    height: COMMON_VALUES.SIZE_40,
  },
});
