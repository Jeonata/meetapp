// import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
// import { createStackNavigator } from 'react-navigation-stack';

// import Icon from 'react-native-vector-icons/MaterialIcons';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Subscription from './pages/Subscription';

export default (isSigned = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: createSwitchNavigator({
          SignIn,
          SignUp,
        }),
        App: createBottomTabNavigator(
          {
            Dashboard,
            Subscription,
            Profile,
          },
          {
            resetOnBlur: true,
            tabBarOptions: {
              keyboardHidesTabBar: true,
              activeTintColor: '#fff',
              inactiveTintColor: 'rgba(255,255,255, 0.6)',
              style: {
                borderTopColor: '#2B1A2F',
                backgroundColor: '#2B1A2F',
              },
            },
          }
        ),
      },
      {
        initialRouteName: isSigned ? 'App' : 'Sign',
      }
    )
  );
