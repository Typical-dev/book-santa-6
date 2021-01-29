import React, { Component } from 'react'
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native'
import { DrawerItems } from 'react-navigation-drawer'
import firebase from 'firebase'

export default class CustomSideBarMenu extends Component {
    render() {
        return (
            <View style = {styles.container}>
                <View style = {styles.drawerItemsContainer}>
                    <DrawerItems {...this.props}/>
                </View>
                <View style={styles.logOutContainer}>
                    <TouchableOpacity style={styles.logOutButton} onPress={() => {
                        this.props.navigation.navigate("WelcomeScreen")
                        firebase.auth().signOut()
                    }}> 
                        <Text>
                            LogOut
                        </Text>

                    </TouchableOpacity>

                </View>
            </View>
        )
    }
}