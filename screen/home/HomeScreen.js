import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import {
  fetchProducts,
  fetchCategories,
  fetchProductByCategory,
  fetchUserLike,
  fetchUserUnLike,
  fetchProductFavorite,
} from './HomeThunks';
import { callLogin } from '../authentication/AuthThunk';
import { setAccessToken } from '../authentication/AuthSlice';
import { getLocalStorage, removeLocalStorage } from '../../common/LocalStorage';
import { KEY_LOCAL_TOKEN } from '../../common/Constant';
import { changeId, changeProductId } from './HomeSlice';
import { useDispatch, useSelector } from 'react-redux';
import StaggeredList from '@mindinventory/react-native-stagger-view';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

import Spinnerscreen from '../components/spinner/SpinnerScreen';
import { changeLoading } from '../components/spinner/SpinnerSlice';
import { FONT } from '../../common/Theme';
const Homescreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [countLke, changeCountLke] = useState(0);
  const dataProducts = useSelector(state => state.home.dataProducts);
  const dataCategories = useSelector(state => state.home.dataCategories);
  const favoritedProducts = useSelector(state => state.home.favoritedProducts);
  const dataProductsByCategory = useSelector(
    state => state.home.dataProductsByCategory,
  );
  const isClickedId = useSelector(state => state.home.isClickedId);
  const isClickedProductId = useSelector(
    state => state.home.isClickedProductId,
  );

  const likeIcon = require('../../assets/images/like.png');
  const iconClose = require('../../assets/images/icon_close.png');
  const iconTune = require('../../assets/images/icon_tune.png');


  const getUser = () => {

  }
  const user = {
  };

  //token save in state.auth
  const token = useSelector(state => state.auth.accessToken);
  useEffect(() => {
    dispatch(changeLoading(true));
    const fetchData = async () => {
      dispatch(fetchProducts());
      dispatch(fetchCategories());
      setTimeout(() => {
        dispatch(changeLoading(false));
      }, 2000);

    };

    fetchData();
  }, []);

  // dadadadas
  useEffect(() => {
    dispatch(fetchProductByCategory(isClickedId));
  }, [isClickedId]);

  useEffect(() => {
    dispatch(fetchProductFavorite(token));
  }, [token, countLke]);
  const likeOrUnlike = id => {
    return favoritedProducts.includes(id);
  };
  console.log('token', token);
  const renderItem = item => {
    return (
      <TouchableOpacity
        onPress={() => {
          dispatch(changeProductId({ isClickedProductId: item.id })),
            navigation.navigate('Product', {
              item: item,
              category: isClickedId,
              isLike: likeOrUnlike(item.id),
            });
        }}
        key={item.id}
      >
        <View
          style={{
            margin: 8,
            padding: 16,
            backgroundColor: '#fff',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            borderRadius: 15,

            elevation: 5,
          }}>
          <TouchableOpacity
            onPress={() => {
              likeOrUnlike(item.id)
                ? dispatch(fetchUserUnLike({ id: item.id, token: token }))
                : dispatch(fetchUserLike({ id: item.id, token: token }));

              changeCountLke(countLke + 1);
            }}>
            <FontAwesomeIcon
              icon={faHeart}
              size={20}
              color={likeOrUnlike(item.id) ? 'red' : 'gray'}
              style={{
                width: 16,
                height: 16,
                alignSelf: 'flex-end',
              }}
              fixedWidth
            />
          </TouchableOpacity>

          <Image
            source={{ uri: item.image }}
            style={{
              resizeMode: 'contain', // dieu chinh hinh vua voi kich thuoc da cho
              width: '100%',
              height: 100,
              alignSelf: 'center',
            }}
          />
          <Text
            style={{
              fontFamily: FONT.semiBold,
              fontSize: 18,
              fontWeight: '500',
              marginTop: 16,
              marginBottom: 16,
            }}>
            {item.name}
          </Text>
          <Text style={{ fontSize: 16, fontWeight: '500', color: 'gray' }}>
            ${item.price}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  const renderItemCategories = item => (
    <TouchableOpacity
      onPress={() => dispatch(changeId({ isClickedId: item.id }))}>
      <Text
        style={{
          color: isClickedId === item.id ? '#FFF' : 'grey',
          margin: 5,
          fontSize: 18,
          fontWeight: '500',
          marginRight: 20,
        }}>
        {item.category}
      </Text>
    </TouchableOpacity>
  );
  // safearea khong co default flex giong view
  return (
    <View style={{ flex: 1 }}>
      <Spinnerscreen />
      <View
        style={{
          height: 260,
          backgroundColor: 'black',
          width: '100%',
          position: 'absolute',
        }}>
        <Svg width="100%" height={600} viewBox="0 0 1440 320">
          <Path
            fill="black"
            d="M0,224L48,234.7C96,245,192,267,288,245.3C384,224,480,160,576,133.3C672,107,768,117,864,149.3C960,181,1056,235,1152,245.3C1248,256,1344,224,1392,208L1440,192L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          />
        </Svg>
      </View>
      <SafeAreaView style={{ flex: 1, margin: 20 }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>

          <Image source={iconClose} style={{ width: 20, height: 20 }} />
          <Image source={iconTune} style={{ width: 20, height: 20 }} />

        </View>

        <View>
          <FlatList
            data={dataCategories}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => renderItemCategories(item)}
          />
        </View>
        <StaggeredList
          data={isClickedId !== null ? dataProductsByCategory : dataProducts}
          animationType={'FADE_IN_FAST'}
          renderItem={({ item }) => renderItem(item)}
        />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Homescreen;
