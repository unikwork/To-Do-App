import React from 'react';
import { View, SafeAreaView, Text, TouchableOpacity, StatusBar, NativeModules, Platform, I18nManager, Image, Dimensions, FlatList, Alert, Modal } from 'react-native'
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { CommonStyle } from './CommonStyle'
const { width, height } = Dimensions.get('window')
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as colors from '../common/colors'

import PushNotification from "react-native-push-notification";

export default class DisplayToDo extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            ToDoList: [],
            ModalVisible: false,
            ary: [1, 2, 3],
        }
    }

    //Call when page start to load
    async componentDidMount() {

        //get the data from Local Storage and set it into state variable
        AsyncList = JSON.parse(await AsyncStorage.getItem('ToDoList'))
        AsyncList ? this.setState({ ToDoList: AsyncList }) : ''
        this.focusListener = this.props.navigation.addListener("focus", async () => {
            AsyncList = JSON.parse(await AsyncStorage.getItem('ToDoList'))
            AsyncList ? this.setState({ ToDoList: AsyncList }) : ''
        });
    }

    componentWillUnmount() {
        this.focusListener = this.props.navigation.removeListener("focus", async () => {

        });
    }

    async deleteToDo(item, index) {
        PushNotification.cancelLocalNotification(item.NotificaationId);
        this.state.ToDoList.splice(index, 1)
        this.setState({ ToDoList: this.state.ToDoList })
        AsyncStorage.setItem('ToDoList', JSON.stringify(this.state.ToDoList))


    }

    //rendering flatlist data and display the data
    renderItem = ({ item, index }) => {

        //converting date from timestamp to local
        var testSDateUtc = moment.utc(item.StartDate);
        var localSDate = moment(testSDateUtc).local();
        var testEDateUtc = moment.utc(item.StartDate);
        var localEDate = moment(testEDateUtc).local();

        var SDateTime = localSDate.format("YYYY-MM-DD HH:mm:ss a");
        var EDateTime = localEDate.format("YYYY-MM-DD HH:mm:ss a");
        return (
            <TouchableOpacity
                onPress={() => this.props.navigation.navigate('CreateToDo', { forAddUpdate: 'Update', dataForUpdate: item, index: index })}
                activeOpacity={1} style={CommonStyle.FFirstView}>
                <View style={[CommonStyle.DisplayToDoView, { shadowColor: item.Priority == 0 ? '#FF0000' : item.Priority == 1 ? '#E67E22' : '#0E6655' },]}>
                    <View style={CommonStyle.DisplayToDoViewInnerV}>
                        <Text style={CommonStyle.DisplayTitle}>{item.Title}</Text>
                        <View style={{ flexDirection: 'row' }}>
                            {item.Priority > -1 ?
                                <Image style={[CommonStyle.starImg, { tintColor: item.Priority == 0 ? '#FF0000' : item.Priority == 1 ? '#E67E22' : '#0E6655' }]} source={require('../assets/images/star.png')} /> : undefined}

                        </View>
                    </View>

                    <Text style={CommonStyle.DisplayDesc}>{item.Description}</Text>


                    <Text style={CommonStyle.DisplayDate}>Start Date : {SDateTime.split(' ')[0]}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={CommonStyle.DisplayDate}>Will complete on : {EDateTime.split(' ')[0]}</Text>
                        <TouchableOpacity
                            onPress={() => Alert.alert(
                                "Alert",
                                "Are you sure you want to delete ?",
                                [
                                    {
                                        text: "Cancel",
                                        onPress: () => console.log(''),
                                        style: "cancel",
                                    },
                                    {
                                        text: "Delete",
                                        onPress: () => this.deleteToDo(item, index),
                                        style: "cancel",
                                    },
                                ]

                            )
                            }
                            style={{}} hitSlop={{ 'left': RFPercentage(5), 'right': RFPercentage(5), 'top': RFPercentage(5), 'bottom': RFPercentage(5) }}>
                            <Image
                                style={{ height: RFPercentage(2), width: RFPercentage(2), resizeMode: 'contain', tintColor: '#FA8072' }}
                                source={require('../assets/images/delete.png')} />
                        </TouchableOpacity>
                    </View>

                </View>
            </TouchableOpacity >
        )
    }

    render() {
        return (
            <View style={CommonStyle.MainView}>

                <View style={CommonStyle.HeaderMainView}>
                    <View style={CommonStyle.HeaderSubView}>
                        <Text style={CommonStyle.HeaderTxt}>ToDos</Text>
                    </View>
                </View>
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'flex-end' }} onPress={() => this.setState({ ModalVisible: true })}>
                    <TouchableOpacity onPress={async () => {
                        AsyncList = JSON.parse(await AsyncStorage.getItem('ToDoList'))
                        AsyncList ? this.setState({ ToDoList: AsyncList }) : ''
                    }}>
                        <Image source={require('../assets/images/refresh.png')} style={{ height: RFPercentage(3), width: RFPercentage(3), resizeMode: 'contain', tintColor: colors.Grey, marginRight: RFPercentage(1) }} />
                    </TouchableOpacity>
                    <Image style={{ marginRight: RFPercentage(2), alignSelf: 'flex-end', tintColor: colors.Black, resizeMode: 'contain', height: RFPercentage(3), width: RFPercentage(3) }} source={require('../assets/images/info.png')} />
                </TouchableOpacity>
                {this.state.ToDoList.length > 0 ?
                    <FlatList
                        contentContainerStyle={{ paddingBottom: RFPercentage(30) }}
                        data={this.state.ToDoList}
                        renderItem={this.renderItem}
                        keyExtractor={item => item.id}
                    />
                    :
                    <Text style={CommonStyle.NoTODostyle}>No To Do added !</Text>
                }
                <TouchableOpacity style={CommonStyle.plusbtn} onPress={() => this.props.navigation.navigate('CreateToDo', { forAddUpdate: 'Add' })}>
                    <Image style={CommonStyle.plusImg}
                        source={require('../assets/images/plus.png')} />
                </TouchableOpacity>


                {/* Here we use inline style because it's not used in other components. */}
                <Modal
                    visible={this.state.ModalVisible}
                    transparent={true}
                    animationType='slide'
                >
                    <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', flex: 1, backgroundColor: 'rgba(52, 52, 52, 0.5)' }}>
                        <View style={{
                            paddingVertical: RFPercentage(2), width: width, backgroundColor: colors.White,
                            borderTopLeftRadius: RFPercentage(5), borderTopRightRadius: RFPercentage(5), paddingHorizontal: RFPercentage(2),
                            shadowColor: colors.Grey,
                            shadowOffset: {
                                width: 0,
                                height: 2
                            },
                            shadowOpacity: 5,
                            shadowRadius: 4,
                            elevation: 5
                        }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ color: colors.Black, fontSize: RFValue(15), marginLeft: RFPercentage(2), fontWeight: 'bold' }}>ToDo's walkthrough</Text>
                                <TouchableOpacity onPress={() => this.setState({ ModalVisible: false })}>
                                    <Image style={{
                                        tintColor: colors.Black, resizeMode: 'contain',
                                        height: RFPercentage(3), width: RFPercentage(3)
                                    }} source={require('../assets/images/cross.png')} /></TouchableOpacity>



                            </View>
                            <View style={{ marginVertical: RFPercentage(2), }}>
                                <View style={{ paddingHorizontal: RFPercentage(2), marginBottom: RFPercentage(2) }}>
                                    <View style={{ flexDirection: 'row', }}>
                                        <View style={CommonStyle.notesV}></View>
                                        <Text style={CommonStyle.notesTxt}>ToDo app gives you functionality to Add, Update, Delete your todos. You can manage your all the future important task using this app.</Text>
                                    </View>

                                    <View style={{ flexDirection: 'row', marginTop: RFPercentage(1) }}>
                                        <View style={CommonStyle.notesV}></View>
                                        <Text style={CommonStyle.notesTxt}>It gives you notification before 15 minute of your ToDo's start time.</Text>
                                    </View>

                                    <View style={{ flexDirection: 'row', marginTop: RFPercentage(1) }}>
                                        <View style={CommonStyle.notesV}></View>
                                        <Text style={CommonStyle.notesTxt}>You can set priority to your task so in the todo's list you can easily differentiate your todo. And based on the priority it show different stars with different color.</Text>
                                    </View>
                                </View>

                                {this.state.ary.map((data, index) => {
                                    return (
                                        <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: RFPercentage(5), marginTop: RFPercentage(1) }}>

                                            <Image style={{
                                                tintColor: colors.Black, resizeMode: 'contain',
                                                height: RFPercentage(3), width: RFPercentage(3), marginRight: RFPercentage(1), tintColor: index == 0 ? '#FF0000' : index == 1 ? '#E67E22' : '#0E6655'
                                            }} source={require('../assets/images/star.png')} />
                                            <Text style={CommonStyle.notesTxt}>{index == 0 ? 'High Priority' : index == 1 ? 'Medium Priority' : 'Low Priority'}</Text>
                                        </View>
                                    )

                                })
                                }

                            </View>
                        </View>

                    </View>
                </Modal>
            </View>
        )
    }
}