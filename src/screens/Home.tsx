import {useCallback, useMemo, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import {Pressable, SafeAreaView, View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import {
  AText,
  AButton,
  TodoItem,
  EmptyTodos,
  AnimatedList,
  TodosFilters,
} from '@components';
import {Todo} from '@types';
import {sortTodos} from '@helpers';
import {COMMON_VALUES} from '@constants';
import {selectTodos, selectTodosFilters} from '@store';
import {Controls} from '@components/TodosFilters/types';
import {completeTodo, removeTodo} from '@store/slices/todos';
import {FILTERS_VALUES} from '@components/TodosFilters/config';

export const Home = () => {
  const todos = useSelector(selectTodos);

  const filters = useSelector(selectTodosFilters);

  const dispatch = useDispatch();

  const navigation = useNavigation();

  const onRemoveTodo = (todoToRemove: Todo) =>
    dispatch(removeTodo(todoToRemove.id));

  const onCompleteTodo = (todoToComplete: Todo) =>
    dispatch(completeTodo(todoToComplete.id));

  const filtersRef = useRef<Controls | null>(null);

  const todosForRender = useMemo(() => {
    const filtersValues = filters.map(filter => FILTERS_VALUES[filter]);

    const filteredTodos = !filters.length
      ? todos
      : todos.filter(({isCompleted}) => filtersValues.includes(isCompleted));

    return sortTodos(filteredTodos);
  }, [filters, todos]);

  const renderItem = useCallback(
    ({item}: {item: Todo}) => (
      <TodoItem
        key={item.id}
        todo={item}
        onDismiss={onRemoveTodo}
        onComplete={onCompleteTodo}
      />
    ),
    [],
  );

  // @ts-ignore
  const onAddTodoPress = () => navigation.navigate('AddTodo');

  return (
    <View style={styles.container}>
      <View style={styles.contentPadding}>
        <SafeAreaView>
          <AText size={COMMON_VALUES.FONT_SIZE_40} bold>
            What's your plans for today ?
          </AText>

          <View style={styles.inputWrapper}>
            <View style={styles.flexOne}>
              <AButton title="Add todo" onPress={onAddTodoPress} />
            </View>

            <Pressable
              style={styles.filter}
              onPress={() => filtersRef.current?.toggleFilter()}>
              <Feather
                name="filter"
                size={COMMON_VALUES.SIZE_32}
                color={EStyleSheet.value('$primaryColor')}
              />
            </Pressable>
          </View>
        </SafeAreaView>
      </View>

      <TodosFilters controlRef={filtersRef} />

      <AnimatedList
        data={todosForRender}
        renderItem={renderItem}
        style={styles.listStyle}
        ListEmptyComponent={<EmptyTodos />}
        contentContainerStyle={styles.listContainerStyle}
      />
    </View>
  );
};

const styles = EStyleSheet.create({
  container: {
    flex: COMMON_VALUES.FLEX_ONE,
    backgroundColor: '$primaryBg',
    paddingTop: COMMON_VALUES.SIZE_18,
  },

  filter: {
    marginLeft: COMMON_VALUES.SIZE_18,
  },

  contentPadding: {
    paddingHorizontal: COMMON_VALUES.SIZE_16,
    position: 'relative',
  },

  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: COMMON_VALUES.SIZE_16,
  },

  flexOne: {
    flex: COMMON_VALUES.FLEX_ONE,
  },

  listStyle: {
    flex: COMMON_VALUES.FLEX_ONE,
    marginTop: COMMON_VALUES.SIZE_8,
  },

  listContainerStyle: {
    flexGrow: COMMON_VALUES.FLEX_ONE,
    paddingVertical: COMMON_VALUES.SIZE_16,
  },
});
