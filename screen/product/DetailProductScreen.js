import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, FlatList, TouchableOpacity} from 'react-native';

const Detailproductscreen = props => {
  const item = props.item;
  console.log(item);
  const item_size = item.size;
  const [isClickedSize, changeIsClickedSize] = useState('');
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity onPress={() => changeIsClickedSize(item)}>
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
      <TouchableOpacity>
        <View
          style={{
            backgroundColor: 'black',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
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
});

export default Detailproductscreen;
