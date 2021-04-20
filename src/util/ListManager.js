import { useEffect, useState } from "react";
import AsyncStorage from '@react-native-community/async-storage';
import 'react-native-get-random-values'
import {v4 as uuid} from 'uuid';

const updateStoreCurrentList = list => {
  AsyncStorage.setItem('@@GroceryList/currentList', JSON.stringify(list));
};

const updateStoreCurrentCart = list => {
  AsyncStorage.setItem('@@GroceryList/currentCart', JSON.stringify(list));
};

const updateStoreCurrentFavorite = list => {
  AsyncStorage.setItem('@@GroceryList/currentFavorite', JSON.stringify(list));
};


export const useCurrentList = () => {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [ cart, setCart ] = useState([]);
    const [ favorite, setFavorite ] = useState([]);
  
    const addItem = text => {
      const newList = [{id: uuid(), name: text}, ...list];
      setList(newList);
      updateStoreCurrentList(newList);
    };

    const addToCart = item => {
      removeItem(item.id)
      const newCart = [item, ...cart];
      setCart(newCart);
      updateStoreCurrentCart(newCart)
    };

    const addToFavorite = item => {
      const favoriteList = list.filter(favorited => {
        if(favorited.id === item.id) {
          return item.isFavorite = true
        }
      })
      const newFavorite = [item, ...favorite];
      // setList(favoriteList)
      setFavorite(newFavorite);
      updateStoreCurrentFavorite(newFavorite)
      // updateStoreCurrentList(favoriteList);
    };
  
    const removeItem = id => {
      const newList = list.filter(item => item.id !== id);
      setList(newList);
      updateStoreCurrentList(newList);
    };
  
    useEffect(() => {
      setTimeout(() => {
        Promise.all([
          AsyncStorage.getItem('@@GroceryList/currentList'),
          AsyncStorage.getItem('@@GroceryList/currentCart'),
          AsyncStorage.getItem('@@GroceryList/currentFavorite'),
        ])
          .then(([list, cartItems, isFavorite]) => [JSON.parse(list), JSON.parse(cartItems), JSON.parse(isFavorite)])
          .then(([list, cartItems, isFavorite]) => {
            if (list) {
              setList(list);
            }
            if(cartItems) {
              setCart(cartItems)
            }
            if(isFavorite) {
              setFavorite(isFavorite)
            }
            setLoading(false);
          });
      }, 1000);
    }, []);

    return {
        list,
        loading,
        removeItem,
        addItem,
        cart,
        addToCart,
        favorite,
        addToFavorite,
        setFavorite,
        updateStoreCurrentFavorite
    }
  
}