import React from 'react'
import { Header, Icon } from 'react-native-elements'
import { View, Text, StyleSheet } from 'react-native'

const MyHeader = props => {
    return (
        <Header centerComponent={{ text: props.title, style: { color: "#90A5A9", fontSize: 20, fontWeight: "bold" } }} backgroundColor="#CAF8FE" />
    )
}

export default MyHeader 