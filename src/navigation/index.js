import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import FavoritesList from '../screens/FavoritesList';
import ItemDetails from '../screens/ItemDetails';
import CurrentList from '../screens/CurrentList';

import {Text, Image, Platform} from 'react-native';

const Stack = createStackNavigator();

const CurrentListStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Shopping List!!" component={CurrentList} />
      <Stack.Screen
        name="ItemDetails"
        component={ItemDetails}
        options={({route}) => {
          return {
            headerTitle: () => {
              return <Text>{route.params.item.name}</Text>;
            },
          };
        }}
      />
    </Stack.Navigator>
  );
};

const FavoriteListsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="FavoriteList" component={FavoritesList} />
    </Stack.Navigator>
  );
};

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({ color, focused }) => {
            let image;
            const routeName = route.name;

            if(routeName === 'Shopping list') {
                image = Platform.select({
                    ios: require('../assets/icons/ios-list.png'),
                    android: require('../assets/icons/md-list.png')
                })
            } else if( routeName === 'Favorite List') {
                image = Platform.select({
                    ios: focused
                    ? require('../assets/icons/ios-star.png')
                    : require('../assets/icons/md-star-outline.png'),
                    android: focused
                    ? require('../assets/icons/ios-star.png')
                    : require('../assets/icons/ios-star-outline.png')
                })
            }
            return (
              <Image
                source={image}
                resizeMode="contain"
                style={{width: 25, tintColor: color}}
              />
            );
          },
        })}>
        <Tab.Screen name="Shopping list" component={CurrentListStack} />
        <Tab.Screen name="Favorite List" component={FavoriteListsStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Tabs;
