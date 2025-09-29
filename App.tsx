import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import WorkoutScreen from './screens/WorkoutScreen';
import ProfileScreen from './screens/ProfileScreen';
import AIScreen from './screens/AIScreen';
import WorkoutLogScreen from './screens/WorkoutLogScreen';
import { WorkoutProvider } from './context/WorkoutContext';
import WorkoutHistoryScreen from './screens/WorkoutHistoryScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <WorkoutProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarStyle: { backgroundColor: '#1e293b', height: 60 },
            tabBarLabelStyle: { color: '#fff', fontSize: 12 },
          }}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Workouts" component={WorkoutScreen} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
          <Tab.Screen name="AI" component={AIScreen} />
          <Tab.Screen name="WorkoutLog" component={WorkoutLogScreen} />
          <Tab.Screen name="History" component={WorkoutHistoryScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </WorkoutProvider>
  );
}
