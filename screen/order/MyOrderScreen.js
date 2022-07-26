import { SafeAreaView, StyleSheet, Text, View, ScrollView, Image } from 'react-native'
import { Button, ActivityIndicator, List, Surface } from 'react-native-paper'
import React, { useEffect, useState } from 'react'
import Header from '../components/header/Header'
import { useSelector } from 'react-redux'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { FlatList } from 'react-native-gesture-handler'
import { FONT } from '../../common/Theme'

const MyOrderScreen = () => {
    MaterialCommunityIcons.loadFont()
    const profileDetail = useSelector(state => state.profile.profileDetail)


    const Item = (props) => (
        <View>
            <Text>{props.name}</Text>
            <Image source={{ uri: props.imgLink }} style={{ width: 50, height: 50, resizeMode: "contain", alignSelf: "center" }} />
        </View>
    )

    const renderItem = ({ item }) => (
        <View style={styles.orderContainer} key={item.id}>
            <View style={styles.orderTitle}>

                <Text style={{ fontFamily: FONT.medium, fontSize: 16, color: "black" }}>{`Order ID: ${item.id}`}</Text>
                <Text style={{ fontFamily: FONT.regular, fontSize: 16, color: "gray", marginLeft: 8 }}>{`Date: ${item.date.split("T")[0]}`}</Text>
            </View>
            {item.orderDetail.map(orderItem => (
                <Item name={orderItem.name} imgLink={orderItem.image} />
            ))}
        </View>
    )


    return (
        <SafeAreaView>
            <Header title={"My Order"} />
            <FlatList
                data={profileDetail.ordersHistory}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />

        </SafeAreaView>
    )
}

export default MyOrderScreen

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    scroll: {
        height: "90%"
    },

    orderContainer: {
        margin: 8,
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "white",
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },

    orderTitle: {
        flexDirection: 'row',


    }
})