import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { faArrowLeft, faListUl } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

const ContextButton = (props) => {
    return (
        <TouchableOpacity style={[styles.container]} onPress={props.onPress}>
            <FontAwesomeIcon icon={props.icon} size={props.size} color={props.color} />
            <Text style={styles.buttonText}>{props.text}</Text>
        </TouchableOpacity>
    )
}

export default ContextButton

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#CFD2CF',
        padding: 16,
        borderRadius: 10,
        width: "95%",
        margin: 8
    },

    buttonText: {
        marginLeft: 16,
        fontSize: 16
    }
})