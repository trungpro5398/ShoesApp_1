import React, {useRef} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  SafeAreaView,
  FlatList,
  PanResponder,
  Dimensions,
  Animated,
} from 'react-native';

import {
  PanGestureHandler,
  State,
  RectButton,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {useDispatch, useSelector} from 'react-redux';
import {removeFromCart} from './CartSlice';
const Cartscreen = ({navigation}) => {
  const dispatch = useDispatch();
  const dataProducts = useSelector(state => state.cart.dataProducts);
  const totalPriceProducts = dataProducts.reduce(
    (total, item) => total + item.amount * item.price,
    0,
  );
  const totalProducts = dataProducts.reduce(
    (total, item) => total + item.amount,
    0,
  );
  const renderItem = ({item}) => {
    return (
      <Swipeable
        renderRightActions={(progrees, dragX) => (
          <RightActions
            progress={progrees}
            dragX={dragX}
            onPress={() =>
              dispatch(removeFromCart({id: item.id, size: item.size}))
            }
          />
        )}>
        <View style={{flexDirection: 'row', marginBottom: 15}}>
          <View
            style={{
              width: 140,
              height: 80,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#E3E3E3',
              borderRadius: 10,
            }}>
            <Image
              source={{uri: item.image}}
              style={{width: 100, height: 60}}
            />
          </View>
          <View style={{justifyContent: 'center', marginLeft: 20}}>
            <Text style={styles.name}>{item.name}</Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                marginTop: 10,
                marginBottom: 10,
              }}>
              <Text>{item.category}</Text>
              <Text style={{marginLeft: 10, marginRight: 10}}>|</Text>
              <Text>{item.size}</Text>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
              <Text style={{marginRight: 40}}>${item.price}</Text>
              <Text>x {item.amount}</Text>
            </View>
          </View>
        </View>
      </Swipeable>
    );
  };
  const RightActions = ({progress, dragX, onPress}) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });

    return (
      <TouchableOpacity onPress={onPress}>
        <View style={styles.rightActions}>
          <Animated.Text style={[styles.actionText, {transform: [{scale}]}]}>
            REMOVE ITEM
          </Animated.Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={{margin: 20}}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}>
        <FontAwesomeIcon icon={faArrowLeft} size={30} color="black" />
      </TouchableOpacity>
      <View style={{alignItems: 'center'}}>
        <Text style={{fontSize: 22, fontWeight: 'bold'}}>Cart</Text>
      </View>
      <View style={{height: 280}}>
        <FlatList
          data={dataProducts}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
          renderItem={renderItem}
          pagingEnabled
        />
      </View>
      <View style={styles.line}></View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          margin: 20,
        }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: '500',
            marginRight: 30,
            color: '#88839A',
          }}>
          {totalProducts} {totalProducts > 1 ? 'items' : 'item'}
        </Text>
        <Text style={{fontSize: 20, color: '#ff4590'}}>
          $ {totalPriceProducts}
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  line: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    margin: 20,
  },
  actionText: {
    color: 'white',
    fontSize: 20,
  },
  rightActions: {
    backgroundColor: '#dd2c00',
    justifyContent: 'center',
    alignItems: 'flex-end',
    height: 80,
    paddingHorizontal: 20,
  },
});

export default Cartscreen;
