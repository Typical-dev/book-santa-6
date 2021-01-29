import React, { Component } from 'react'
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import { ListItem } from 'react-native-elements'
import firebase from 'firebase'
import db from '../components/config'
import MyHeader from '../components/myHeader'

export default class DonateScreen extends Component{
    constructor() {
        super();
        this.state = {
            requestBookList: [],
        }
        this.requestRef = null
    }

    componentDidMount() {
        this.getRequestedBookList()
    }

    componentWillUnmount() {
        this.requestRef()
    }

    getRequestedBookList = () => {
        this.requestRef = db.collection("request").onSnapshot((snapShot) => {
            var requestedBookList = snapShot.docs.map((document) => document.data())
            this.setState({
                requestBookList: requestedBookList,
            })
        })

    } 
    keyExtractor = (item, index) => index.toString()
    renderItem = ({ item, i }) => {
        return (
            <ListItem key = {i} title = {item.bookname} subTitle = {item.reason} titleStyle = {{color:"black", fontWeight: "bold"}} rightElement = {
                <TouchableOpacity style = {styles.button}>
                    <Text style={{ color: "#FFFF" }}>
                        View
                    </Text>
            </TouchableOpacity>
            }>

            </ListItem>
        )
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <MyHeader title="Donate Books" />
                <View style={{ flex: 1 }}>
                    {this.state.requestBookList.length === 0 ? (<View style={styles.subContainer}>
                        <Text style = {{fontSize:20}}>
                        List Of All Requested Books
                    </Text>
                    </View>) : (<FlatList keyExtractor={this.keyExtractor} data={this.state.requestBookList} renderItems={this.renderItem}/>)}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    subContainer: { flex: 1, fontSize: 20, justifyContent: "center", alignItems: "center", },
    button: {
        width: 100, height: 30, justifyContent: "center", alignItems: "center", backgroundColor: "#ff5722", shadowColor: "#000",
        shadowOffset: { width: 0, height: 8, },
    },
});