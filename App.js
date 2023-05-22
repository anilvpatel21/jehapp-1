import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Page0 from './components/entry';
import Page1 from './components/brands';
import Page2 from './components/material';
import Page3 from './components/items';
import Page4 from './components/sizes';
import Page5 from './components/quantity';
import Page6 from './components/showData';
import Page7 from './components/billDetails';

const Stack = createStackNavigator();

export default function App() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Page0" component={Page0} />
          <Stack.Screen name="Page1" component={Page1} />
          <Stack.Screen name="Page2" component={Page2} />
          <Stack.Screen name="Page3" component={Page3} />
          <Stack.Screen name="Page4" component={Page4} />
          <Stack.Screen name="Page5" component={Page5} />
          <Stack.Screen name="Page6" component={Page6} />
          <Stack.Screen name="Page7" component={Page7} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  