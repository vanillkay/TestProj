import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {Home} from './Home';
import {AddTodo} from './AddTodo';

const Stack = createStackNavigator();

export const Routes = () => (
  <NavigationContainer>
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen key="Home" name="Home" component={Home} />
      <Stack.Screen key="AddTodo" name="AddTodo" component={AddTodo} />
    </Stack.Navigator>
  </NavigationContainer>
);
