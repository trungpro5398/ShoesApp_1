import React, {useEffect, useState} from 'react';

import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  FlatList,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faXmark} from '@fortawesome/free-solid-svg-icons';
import {useDispatch, useSelector} from 'react-redux';
import {fetchProductById} from './ProductThunks';
import {resetDataProduct} from './ProductSlice';
import Detailproductscreen from './DetailProductScreen';
import Spinnerscreen from '../components/spinner/SpinnerScreen';
import {changeLoading} from '../components/spinner/SpinnerSlice';
import {faHeart} from '@fortawesome/free-solid-svg-icons';
const Productscreen = props => {
  const dispatch = useDispatch();

  const navigation = props.navigation;
  const item = props.route.params.item;
  const category = props.route.params.category;
  const dataProduct = useSelector(state => state.product.dataProduct);
  const iconTune = require('../../assets/images/icon_tune.png');
  const [state, changeState] = useState(0);
  const change = ({nativeEvent}) => {
    const slide = Math.ceil(
      nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width,
    ); // lay index cua hinh anh, toa do x, va khoang cach tu tu 0 cho den toa do keo
    if (slide !== state) {
      changeState(slide);
    }
  };
  useEffect(() => {
    dispatch(changeLoading(true));
    dispatch(resetDataProduct(item.id));
    dispatch(fetchProductById(item.id));
    if (dataProduct.length > 0) {
      dataProduct[0].relatedProducts.map(item => {
        dispatch(fetchProductById(item.id));
      });
    }
    setTimeout(() => {
      dispatch(changeLoading(false));
    }, 500);
  }, []);
  const renderItem = ({item}) => {
    return (
      <View>
        <Image source={{uri: item.image}} style={styles.image} />
        <TouchableOpacity
          onPress={() => {
            props.isLike
              ? dispatch(fetchUserUnLike({id: item.id, token: token}))
              : dispatch(fetchUserLike({id: item.id, token: token}));

            changeCountLke(countLke + 1);
          }}>
          <FontAwesomeIcon
            icon={faHeart}
            size={20}
            color={props.isLike ? 'black' : 'blue'}
            style={{
              width: 16,
              height: 16,
              position: 'absolute',
              right: 10,
              top: 10,
            }}
            fixedWidth
          />
        </TouchableOpacity>
      </View>
    );
  };
  return dataProduct.length > 0 ? (
    <View style={{flex: 1}}>
      <Spinnerscreen />
      <SafeAreaView style={{flex: 1, margin: 20}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <FontAwesomeIcon icon={faXmark} size={20} color="#000" />
          </TouchableOpacity>
          <Text style={{color: 'black', fontSize: 20}}>{category}</Text>
          <Image source={iconTune} style={{width: 20, height: 20}} />
        </View>
        <View style={styles.container}>
          <FlatList
            data={dataProduct}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={renderItem}
            pagingEnabled
            onScroll={change}
          />
          <View style={styles.pagination}>
            {dataProduct.map((i, k) => (
              <Text
                style={
                  k === state ? styles.paginText : styles.pageinActiveText
                }>
                ⬤
              </Text>
            ))}
          </View>
          <Detailproductscreen
            item={state < dataProduct.length ? dataProduct[state] : []}
            ca
            navigation={navigation}
          />
        </View>
      </SafeAreaView>
    </View>
  ) : (
    <View></View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  image: {
    width: 310,
    height: 150,
  },
  pagination: {
    position: 'absolute',
    flexDirection: 'row',
    top: '24%',
    alignSelf: 'center',
  },
  paginText: {
    color: 'black',
    fontSize: 10,
    marginLeft: 10,
  },
  pageinActiveText: {
    color: 'white',
    fontSize: 10,
    marginLeft: 10,
  },
});

export default Productscreen;
