import React, {useEffect, useState} from 'react';

import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  FlatList,
  KeyboardAvoidingView,
  ActivityIndicator,
  SectionList,
} from 'react-native';

// import AsyncStorage from '@react-native-community/async-storage';
import nachos from '../data/nachos';
import ListItem, {SectionHeader, Separator} from '../components/ListItem';
import AddItem from '../components/AddItem';
import {useCurrentList} from '../util/ListManager';

export default ({navigation}) => {
  const {
    list,
    loading,
    addItem,
    removeItem,
    addToCart,
    cart,
  } = useCurrentList();

  if (loading) {
    return (
      <SafeAreaView>
        <Text style={{fontSize: 30}}>Loading...</Text>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  console.log('cart', cart);

  return (
    <SafeAreaView style={{flex: 1}}>
      <KeyboardAvoidingView style={{flex: 1}}>
        <SectionList
          // data={list}
          sections={[
            {title: 'list', data: list},
            {title: 'cart', data: cart},
          ]}
          
          renderSectionHeader={({ section }) => (
            <SectionHeader title={section.title} />
          )}

          renderItem={({item, index}) => (
            <ListItem
              name={item.name}
              onFavouritePress={() => alert('todo: on favourite press')}
              isFavourite={index < 2}
              onAddedSwipe={() => addToCart(item)}
              onDeleteSwipe={() => removeItem(item.id)}
              onRowPress={() => {
                navigation.navigate('ItemDetails', {
                  item,
                });
              }}
            />
          )}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={() => <Separator></Separator>}
          ListHeaderComponent={() => {
            return (
              <AddItem
                onSubmitEditing={({nativeEvent: {text}}) => addItem(text)}
              />
            );
          }}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
