import React from 'react';

import {
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  ActivityIndicator,
  SectionList,
} from 'react-native';

// import AsyncStorage from '@react-native-community/async-storage';
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
    addToFavorite,
    favorite,
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
  console.log('favorite', favorite);

  return (
    <SafeAreaView style={{flex: 1}}>
      <KeyboardAvoidingView style={{flex: 1}}>
        <SectionList
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
              // onFavouritePress={() => alert('todo: on favourite press')}
              onFavouritePress={() => addToFavorite(item)}
              isFavourite={item.isFavourite}
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
