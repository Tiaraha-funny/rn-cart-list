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
import {useCurrentList} from '../util/ListManager';

export default ({navigation}) => {
  const { favorite, loading, setFavorite, updateStoreCurrentFavorite } = useCurrentList();

  if (loading) {
    return (
      <SafeAreaView>
        <Text style={{fontSize: 30}}>Loading...</Text>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  console.log('favorite', favorite);

  const removeFavorite = (id) => {
      const filterTheFavorite = favorite.filter(item => item.id === id)
      setFavorite(filterTheFavorite);
      updateStoreCurrentFavorite(filterTheFavorite)
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <KeyboardAvoidingView style={{flex: 1}}>
        <SectionList
          sections={[
            {title: 'favorite', data: favorite},
          ]}
          
          renderSectionHeader={({ section }) => (
            <SectionHeader title={section.title} />
          )}

          renderItem={({item, index}) => (
            <ListItem
              name={item.name}
              onFavouritePress={() => removeFavorite(item.id)}
              isFavourite={index < 2}
              onRowPress={() => {
                navigation.navigate('ItemDetails', {
                  item,
                });
              }}
            />
          )}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={() => <Separator></Separator>}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
