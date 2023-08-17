import {useDispatch} from 'react-redux';
import {useCallback, useState} from 'react';
import Toast from 'react-native-toast-message';
import {useNavigation} from '@react-navigation/native';
import {Pressable, SafeAreaView, View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

import {COMMON_VALUES} from '@constants';
import {addTodo} from '@store/slices/todos';
import {AInput, AText, KeyboardDismissView, AButton} from '@components';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const AddTodo = () => {
  const [todoText, setTodoText] = useState<string>('');

  const dispatch = useDispatch();

  const navigation = useNavigation();

  const resetTodoText = useCallback(() => {
    ReactNativeHapticFeedback.trigger('impactMedium');
    setTodoText('');
  }, []);

  const onAddTodo = useCallback(() => {
    ReactNativeHapticFeedback.trigger('notificationSuccess');
    setTodoText('');
    dispatch(addTodo(todoText));

    Toast.show({
      type: 'success',
      text1: 'Todo was added',
    });
  }, [todoText]);

  const goBack = () => navigation.goBack();

  return (
    <KeyboardDismissView style={styles.container}>
      <SafeAreaView style={{flex: COMMON_VALUES.FLEX_ONE}}>
        <View style={styles.content}>
          <Pressable style={styles.goBack} onPress={goBack}>
            <MaterialIcons name="arrow-back-ios" size={COMMON_VALUES.SIZE_32} />
          </Pressable>

          <AText size={COMMON_VALUES.FONT_SIZE_40} bold>
            Write you todo
          </AText>

          <View style={styles.input}>
            <AInput
              multiline
              blurOnSubmit
              value={todoText}
              placeholder="..."
              contextMenuHidden
              autoComplete="off"
              autoCorrect={false}
              returnKeyType="done"
              selectTextOnFocus={false}
              onChangeText={setTodoText}
              rightSlotComponent={
                todoText.length > 0 && (
                  <AnimatedPressable
                    entering={FadeIn}
                    exiting={FadeOut}
                    onPress={resetTodoText}
                    style={styles.clearTodoText}>
                    <MaterialIcons
                      name="cancel"
                      size={COMMON_VALUES.SIZE_32}
                      color={EStyleSheet.value('$secondaryColor')}
                    />
                  </AnimatedPressable>
                )
              }
            />
          </View>

          <AButton
            title="Add Todo"
            onPress={onAddTodo}
            disabled={!todoText.length}
          />
        </View>
      </SafeAreaView>
    </KeyboardDismissView>
  );
};

const styles = EStyleSheet.create({
  container: {
    backgroundColor: '$primaryBg',
    flex: COMMON_VALUES.FLEX_ONE,
    paddingHorizontal: COMMON_VALUES.SIZE_16,
  },

  clearTodoText: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: COMMON_VALUES.FLEX_ONE,
  },

  content: {
    paddingTop: '30%',
    flex: COMMON_VALUES.FLEX_ONE,
    // alignItems: 'center',
  },

  input: {
    marginVertical: COMMON_VALUES.SIZE_32,
    width: COMMON_VALUES.FULL,
  },

  goBack: {
    position: 'absolute',
    top: 10,
    left: 0,
  },
});
