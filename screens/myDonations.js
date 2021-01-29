import React, { Component } from 'react'
import { View, Text, TouchableOpacity, ScrollView, FlatList, StyleSheet } from 'react-native';
import { Card, Icon, ListItem } from 'react-native-elements'
import MyHeader from '../components/MyHeader.js'
import firebase from 'firebase';
import db from '../config.js'

export default class MyDonationScreen extends Component {
    constructor() {
        super();
        this.state = {
            donorId: firebase.auth().currentUser.email,
            donorName: "", allDonations: []
        }
        this.requestRef = null
    }
    static navigationOptions = { header: null };

    render() {
        return (
            <View style={{ flex: 1 }}>
                <MyHeader navigation={this.props.navigation} title="My Donations" />
                <View style={{ flex: 1 }}>
                    {this.state.allDonations.length === 0 ? (<View style={styles.subtitle}>
                        <Text style={{ fontSize: 20 }}>
                            List of all book Donations
                            </Text>
                    </View>) : (<FlatList keyExtractor={this.keyExtractor} data={this.state.allDonations} renderItem={this.renderItem} />)}
                </View>
            </View>)
    }
    keyExtractor = (item, index) =>
        index.toString()


    getDonorDetails = (donorId) => {
        db.collection("users").where("email_id", "==", donorId).get()
            .then((snapshot) => {
                snapshot.forEach((doc) => {
                    this.setState({ "donorName": doc.data().first_name + " " + doc.data().last_name })
                });
            })
    }

    getAllDonations = () => {
        this.requestRef = db.collection("donations").where("donor_id", '==', this.state.donorId).onSnapshot((snapshot) => {
            var allDonations = []
            snapshot.docs.map((doc) => {
                var donation = doc.data()
                donation["doc_id"] = doc.id
                allDonations.push(donation)
            });
            this.setState({ allDonations: allDonations });
        })
    }

    sendBook = (bookDetails) => {
        if (bookDetails.request_status === "Book Sent") {
            var requestStatus = "Donor Interested"
            db.collection("all_donations").doc(bookDetails.doc_id).update({ "request_status": "Donor Interested" })
            this.sendNotification(bookDetails, requestStatus)
        } else {
            var requestStatus = "Book Sent"
            db.collection("all_donations").doc(bookDetails.doc_id).update({ "request_status": "Book Sent" })
            this.sendNotification(bookDetails, requestStatus)
        }
    }

    componentDidMount() {
        this.getDonorDetails(this.state.donorId)
        this.getAllDonations()
    }
    componentWillUnmount()
    {
        this.requestRef();
    }
}

const styles = StyleSheet.create({
    button: {
        width: 100, height: 30, justifyContent: 'center', alignItems: 'center', shadowColor: "#000",
        shadowOffset: { width: 0, height: 8 }, elevation: 16
    },
    subtitle: { flex: 1, fontSize: 20, justifyContent: 'center', alignItems: 'center' }
})