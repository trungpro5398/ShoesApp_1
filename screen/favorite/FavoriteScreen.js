import { faHeartBroken } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, SafeAreaView, FlatList, Image } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useSelector } from 'react-redux';
import { FONT } from '../../common/Theme';

const Favoritescreen = () => {
  const favoritedProducts = useSelector(state => state.home.favoritedProducts)
  const dataProducts = useSelector(state => state.home.dataProducts)
  const dataProductsFiltered = dataProducts.filter(item => favoritedProducts.includes(item.id))
  const isFocus = useIsFocused()
  const [render, setRender] = useState(0)
  const forceUpdate = () => {
    setRender(render + 1)
  }
  const renderItem = ({ item }) => {
    return (
      <View style={styles.itemContainer}>
        <Text style={{ fontFamily: FONT.medium, fontSize: 14 }}>{item.name}</Text>
        <Image source={{ uri: item.image }} style={{
          resizeMode: 'contain', // dieu chinh hinh vua voi kich thuoc da cho
          width: '100%',
          height: 100,
          alignSelf: 'center',
        }} />
      </View>
    )
  }

  // useEffect(() => {
  //   forceUpdate()
  //   console.log('render')
  // }, [isFocus])

  if (!!dataProductsFiltered && dataProductsFiltered.length === 0) {
    return (
      <SafeAreaView style={styles.noFavoriteContainer}>
        {/* <Text style={[styles.title, { color: 'black' }]}>Favorites</Text> */}

        <FontAwesomeIcon icon={faHeartBroken} size={36} style={{ marginBottom: 16 }} />
        <Text style={{ fontFamily: FONT.semiBold, fontSize: 24, textAlign: 'center' }}>No favorite product</Text>
      </SafeAreaView>
    )
  } else return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Favorites</Text>
      <View style={{
        height: 260,
        backgroundColor: 'black',
        width: '100%',
        position: 'absolute',
      }}>

        <Svg width="100%" height={600} viewBox="0 0 1440 320">
          <Path fill="black"
            d="M0,224L48,234.7C96,245,192,267,288,245.3C384,224,480,160,576,133.3C672,107,768,117,864,149.3C960,181,1056,235,1152,245.3C1248,256,1344,224,1392,208L1440,192L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z" />

        </Svg>

      </View>
      <FlatList
        data={dataProductsFiltered}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,


  },

  title: {
    textAlign: 'center',
    fontFamily: FONT.semiBold,
    alignSelf: 'center',
    fontSize: 24,
    marginVertical: 8,
    color: "white",
    zIndex: 1
  },


  itemContainer: {
    width: "45%",
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

  },

  noFavoriteContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }

});

export default Favoritescreen;
