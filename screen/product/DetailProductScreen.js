import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, FlatList, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import {addToCart} from '../cart/CartSlice';
const Detailproductscreen = props => {
  const [amount, changeAmount] = useState(1);
  const dispatch = useDispatch();
  const navigation = props.navigation;
  const item = props.item;
  const category = props.category;
  const item_size = item.size;
  const [isClickedSize, changeIsClickedSize] = useState(null);
  const [isClickedColor, changeIsClickedColor] = useState('grey');
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          changeIsClickedSize(item), changeIsClickedColor('grey');
        }}>
        <View
          style={[
            styles.container__size,
            {backgroundColor: isClickedSize == item ? 'black' : 'white'},
          ]}>
          <Text style={{color: isClickedSize == item ? 'white' : 'black'}}>
            {item}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <Text style={{color: 'black', fontSize: 25}}>{item.name}</Text>
      <Text style={{color: 'black', fontSize: 20}}>${item.price}</Text>
      <Text style={{color: 'black', fontSize: 20}}>Select a size</Text>
      <Text style={{color: isClickedColor, fontSize: 15}}>Required</Text>
      <FlatList
        data={item_size}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        pagingEnabled
      />
      <View style={styles.line}></View>
      <Text
        style={{
          marginTop: 20,
          fontSize: 16,
          fontWeight: '500',
          marginRight: 30,
        }}>
        {item.description}
      </Text>
      <Text style={{fontSize: 16, color: '#E4E3E4', marginTop: -10}}>
        {item.shortDescription}
      </Text>
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <TouchableOpacity
          onPress={() => changeAmount(amount > 1 ? amount - 1 : 1)}>
          <View style={styles.circle}>
            <Text
              style={[styles.amount, {color: amount === 1 ? 'grey' : 'black'}]}>
              -
            </Text>
          </View>
        </TouchableOpacity>
        <View style={styles.not_circle}>
          <Text style={styles.amount}>{amount}</Text>
        </View>

        <TouchableOpacity onPress={() => changeAmount(amount + 1)}>
          <View style={styles.circle}>
            <Text style={styles.amount}>+</Text>
          </View>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => {
          if (isClickedSize !== null) {
            navigation.navigate('Cart');
            dispatch(
              addToCart({
                id: item.id,
                name: item.name,
                price: item.price,
                amount: amount,
                image: item.image,
                category: category,
                size: isClickedSize,
              }),
            );
          } else {
            changeIsClickedColor('red');
          }
        }}>
        <View
          style={{
            backgroundColor: 'black',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
            marginTop: 10,
          }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: '500',
              color: 'white',
              padding: 10,
            }}>
            Add to bag
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    margin: -40,
    marginTop: 10,
    padding: 25,
    borderRadius: 15,
    shadowColor: '#000',
  },
  container__size: {
    margin: 8,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 25,
    borderColor: '#000',
    borderWidth: 1,
  },
  line: {
    borderBottomColor: 'grey',
    borderBottomWidth: 2,
    marginTop: 20,
    shadowColor: '#000',
  },
  amount: {
    fontSize: 30,
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E4E3E4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  not_circle: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Detailproductscreen;
