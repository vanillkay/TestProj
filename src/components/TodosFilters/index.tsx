import {useDispatch, useSelector} from 'react-redux';
import {FC, useImperativeHandle, useRef} from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import EStyleSheet from 'react-native-extended-stylesheet';
import Animated, {
  withDelay,
  withTiming,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

import {selectTodosFilters} from '@store';
import {COMMON_VALUES, SCREEN_WIDTH} from '@constants';
import {FILTERS} from '@components/TodosFilters/config';
import {addFilter, removeFilter} from '@store/slices/todos';
import {Filter, TodosFiltersProps} from '@components/TodosFilters/types';

export const TodosFilters: FC<TodosFiltersProps> = ({controlRef}) => {
  const setIsOpen = useRef(false);

  const filters = useSelector(selectTodosFilters);

  const dispatch = useDispatch();

  const translateX = useSharedValue(SCREEN_WIDTH);

  const height = useSharedValue(0);
  const marginTop = useSharedValue(0);

  const getIsActiveFilter = (filter: Filter) => filters.includes(filter);

  const getOnPressCheckbox = (filter: Filter) => (isChecked: boolean) => {
    dispatch(isChecked ? addFilter(filter) : removeFilter(filter));
  };

  const toggleFilter = () => {
    if (setIsOpen.current) {
      translateX.value = withTiming(SCREEN_WIDTH);
      height.value = withDelay(150, withTiming(0));
      marginTop.value = withDelay(150, withTiming(0));
    } else {
      marginTop.value = withTiming(COMMON_VALUES.SIZE_24);
      height.value = withTiming(COMMON_VALUES.SIZE_48);
      translateX.value = withDelay(150, withTiming(0));
    }

    setIsOpen.current = !setIsOpen.current;
  };

  useImperativeHandle(controlRef, () => ({
    toggleFilter,
  }));

  const rStyles = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: translateX.value,
      },
    ],
    height: height.value,
    marginTop: marginTop.value,
  }));

  return (
    <Animated.View style={[styles.wrapper, rStyles]}>
      <BouncyCheckbox
        text="Completed"
        size={COMMON_VALUES.SIZE_32}
        textStyle={styles.checkboxText}
        isChecked={getIsActiveFilter(FILTERS.COMPLETED)}
        onPress={getOnPressCheckbox(FILTERS.COMPLETED)}
        fillColor={EStyleSheet.value('$primarySuccess')}
      />

      <BouncyCheckbox
        text="Not Completed"
        size={COMMON_VALUES.SIZE_32}
        textStyle={styles.checkboxText}
        fillColor={EStyleSheet.value('$primaryWarning')}
        onPress={getOnPressCheckbox(FILTERS.NOT_COMPLETED)}
        isChecked={getIsActiveFilter(FILTERS.NOT_COMPLETED)}
      />
    </Animated.View>
  );
};

const styles = EStyleSheet.create({
  wrapper: {
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: COMMON_VALUES.SIZE_16,
  },

  checkboxText: {
    textDecorationLine: 'none',
    marginLeft: -COMMON_VALUES.SIZE_8,
    fontSize: COMMON_VALUES.FONT_SIZE_18,
    color: '$primaryColor',
  },
});
