import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Badge } from 'react-native-paper'
import React from 'react'
import { faArrowLeft, faListUl } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { FONT } from '../../../common/Theme'

const ContextButton = (props) => {
    return (
        <TouchableOpacity style={[styles.container]} onPress={props.onPress}>

            <FontAwesomeIcon icon={props.icon} size={props.size} color={props.color} />
            <Text style={styles.buttonText}>{props.text}</Text>


            {!!props.badge && (
                <Badge style={styles.badge} size={30}>{props.badge}</Badge>
            )}
        </TouchableOpacity>
    )
}

export default ContextButton

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 10,
        width: "90%",
        margin: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },

    buttonText: {
        fontFamily: FONT.medium,
        marginLeft: 16,
        fontSize: 16
    },

    badge: {
        position: 'absolute',
        top: "50%",
        bottom: "50%",
        right: 0,
        marginRight: 8

    }
})