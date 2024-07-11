import React from 'react';
import {SafeAreaView} from 'react-native';
import Home from './src/screens/Home';
import {ThemeProvider} from './theme/ThemeProvider';
import {ThemeToggle} from './src/components/ThemeToggle';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
