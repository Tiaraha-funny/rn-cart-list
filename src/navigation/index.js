import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import ItemDetails from '../screens/ItemDetails';
import CurrentList from '../screens/CurrentList';
import {Text} from 'react-native';
import FavoritesList from '../screens/FavoritesList';

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
        <Stack.Screen
          name="FavoriteList"
          component={FavoritesList}
          // options={({ route }) => {
          // return { headerTitle: () => { return <Text>{route.params.item.name}</Text>}}
          //    }
          // }
        />
      </Stack.Navigator>
  );
};

const Tab = createBottomTabNavigator();

const Tabs = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name='Shopping list' component={CurrentListStack} />
                <Tab.Screen name='Favorite List' component={FavoriteListsStack}/>
            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default Tabs;
