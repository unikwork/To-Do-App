import React from 'react';
import { View, SafeAreaView, Text, TouchableOpacity, StatusBar, NativeModules, Platform, I18nManager, Image, Dimensions, Modal, ActivityIndicator, Animated } from 'react-native'
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { CommonStyle } from './CommonStyle'
import TextField from '../common/component/TextField'
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as colors from '../common/colors'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
const { width, height } = Dimensions.get('window')
var AsyncList = []
import { checkNotifications, requestNotifications } from 'react-native-permissions';
import PushNotification from "react-native-push-notification";

import uuid from 'react-native-uuid';

var abc
var xyz
var Final = new Date()

export default class CreateToDo extends React.Component {


    constructor(props) {
        super(props)
        this.state = {
            Title: '',
            Sdate: new Date(),
            Edate: new Date(),
            STime: new Date(),
            ETime: new Date(),
            showDatePicker: false,
            DateModalVisible: false,
            DateOrTime: 'start',
            DisplayStartDateTime: '',
            DisplayEndDateTime: '',
            ToDoList: [],
            ProrityAry: ['High', 'Medium', 'Low'],
            selectedPriority: -1,
            Dvisible: false,
            Tvisible: false,
            loading: false,
            Description: '',
            DataForUpdate: []
        }
    }

    //call when page complete the rendering
    componentDidMount() {

        if (this.props.route.params.forAddUpdate == 'Update') {
            this.setState({
                Title: this.props.route.params.dataForUpdate.Title, Description: this.props.route.params.dataForUpdate.Description, Sdate: this.props.route.params.dataForUpdate.StartDate,
                STime: this.props.route.params.dataForUpdate.StartDate, Edate: this.props.route.params.dataForUpdate.EndDate, ETime: this.props.route.params.dataForUpdate.EndDate, selectedPriority: this.props.route.params.dataForUpdate.Priority,
                DisplayStartDateTime: this.props.route.params.dataForUpdate.DisplayStartDateTime, DisplayEndDateTime: this.props.route.params.dataForUpdate.DisplayEndDateTime
            })
        }

        //check and ask for permission for notification
        checkNotifications().then(({ status, settings }) => {
            if (status != 'granted') {
                requestNotifications(['alert', 'sound']).then(({ status, settings }) => {
                });
            }
        });
    }


    // call the function after you select the date and converting timestamp to local date for display into other formate 
    GetDateTime(selectedDate, type) {

        var testDateUtc = moment.utc(selectedDate);
        var localDate = moment(testDateUtc).local();

        if (type == 'Date') {
            var SDateTime = localDate.format("YYYY-MM-DD HH:mm:ss a");
            abc = ((JSON.stringify(selectedDate)).split('T')[0]).split('"')[1]

        }
        else {
            var SDateTime = localDate.format("YYYY-MM-DD HH:mm:ss a");
            xyz = ((JSON.stringify(selectedDate).split('T')[1])).split('.')[0]

        }

        if (abc && xyz) {
            Final = abc + 'T' + xyz + '.000Z'
        }

        if (abc && xyz) {
            if (this.state.DateOrTime == 'start') {
                if (type == 'Date') {

                    this.setState({ DisplayStartDateTime: abc + '/' + xyz, STime: new Date(Final), Sdate: new Date(Final) })

                } else {
                    this.setState({ DisplayStartDateTime: abc + '/' + xyz, STime: new Date(Final), Sdate: new Date(Final) })

                }
            }
            else {
                if (type == 'Date') {
                    this.setState({ DisplayEndDateTime: abc + '/' + xyz, ETime: new Date(Final), Edate: new Date(Final) })

                }
                else {
                    this.setState({ DisplayEndDateTime: abc + '/' + xyz, ETime: new Date(Final), Edate: new Date(Final) })


                }

            }
        }
    }

    async UpdateToDo() {
        AsyncList = JSON.parse(await AsyncStorage.getItem('ToDoList'))
        this.setState({ DataForUpdate: AsyncList })
        this.state.DataForUpdate[this.props.route.params.index].Title = this.state.Title
        this.state.DataForUpdate[this.props.route.params.index].Description = this.state.Description
        this.state.DataForUpdate[this.props.route.params.index].StartDate = this.state.Sdate
        this.state.DataForUpdate[this.props.route.params.index].EndDate = this.state.Edate
        this.state.DataForUpdate[this.props.route.params.index].Priority = this.state.selectedPriority
        this.state.DataForUpdate[this.props.route.params.index].DisplayStartDateTime = this.state.DisplayStartDateTime
        this.state.DataForUpdate[this.props.route.params.index].DisplayEndDateTime = this.state.DisplayEndDateTime

        this.setState({ DataForUpdate: this.state.DataForUpdate })
       
        AsyncStorage.setItem('ToDoList', JSON.stringify(this.state.DataForUpdate))
        this.props.navigation.navigate('DisplayToDo')


    }

    //call whrn click on the ADDToDo button and add the data to local storage
    async AddToDo(ID) {

        AsyncList = JSON.parse(await AsyncStorage.getItem('ToDoList'))
        var List = {
            "Title": this.state.Title,
            "Description": this.state.Description,
            "StartDate": this.state.Sdate,
            "EndDate": this.state.Edate,
            "Priority": this.state.selectedPriority,
            'DisplayStartDateTime': this.state.DisplayStartDateTime,
            'DisplayEndDateTime': this.state.DisplayEndDateTime,
            'NotificaationId': ID
        }

        if (AsyncList) {
            this.state.ToDoList = AsyncList
            this.state.ToDoList.push(List)
            this.setState({ ToDoList: this.state.ToDoList, loading: false })

            AsyncStorage.setItem('ToDoList', JSON.stringify(this.state.ToDoList))

            this.props.navigation.navigate('DisplayToDo')

        }
        else {
            this.state.ToDoList.push(List)
            this.setState({ ToDoList: this.state.ToDoList, loading: false })
            AsyncStorage.setItem('ToDoList', JSON.stringify(this.state.ToDoList))
            this.props.navigation.navigate('DisplayToDo')

        }


    }


    //call the function for schedule notification
    async SendNotification(ID) {

        var NotificationDate = moment(this.state.Edate).subtract(15, 'minute')
        PushNotification.createChannel(
            {
                channelId: "ToDoChannel", // (required)
                channelName: "ToDoChannel", // (required)
                channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
                playSound: false, // (optional) default: true
                soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
                vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
            },
            (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
        );

        // var id = ScheduleDate.replace(/-/g, "");
        PushNotification.localNotificationSchedule({
            id: this.props.route.params.forAddUpdate == 'Update' ? this.props.route.params.dataForUpdate.NotificaationId : ID,
            channelId: 'ToDoChannel',
            message: `Reminder for ${this.state.Title}`, // (required)
            date: new Date(Date.now() + 1000 * moment.duration(
                moment(NotificationDate).diff(moment())
            ).asSeconds()),
        });
    }

    render() {
        return (
            <View style={CommonStyle.MainView}>
                <KeyboardAwareScrollView style={{ flex: 1 }} bounces={false}>
                    <View style={CommonStyle.HeaderMainView}>
                        <View style={CommonStyle.HeaderSubView}>
                            <Text style={CommonStyle.HeaderTxt}>Create To Do</Text>
                        </View>
                    </View>


                    <View style={CommonStyle.FirstV}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('DisplayToDo')}>
                            <Image source={require('../assets/images/back.png')} style={{ height: RFPercentage(3), width: RFPercentage(3), resizeMode: 'contain', paddingHorizontal: RFPercentage(2), marginBottom: RFPercentage(5), tintColor: colors.Grey }} />
                        </TouchableOpacity>
                        <TextField name='Title' displayVal={this.state.Title} onChange={(text) => this.setState({ Title: text })} />
                        <TextField name='Description' displayVal={this.state.Description} onChange={(text) => this.setState({ Description: text })} />


                        <TextField name='Select Start Date/Time' displayVal={this.state.DisplayStartDateTime} onChange={(text) => Platform.OS == 'ios' ? this.setState({ DateModalVisible: true, DateOrTime: 'start' }) : this.setState({ Dvisible: true, DateOrTime: 'start' })} />
                        <TextField name='Select End Date/Time' displayVal={this.state.DisplayEndDateTime} onChange={(text) => Platform.OS == 'ios' ? this.setState({ DateModalVisible: true, DateOrTime: 'end' }) : this.setState({ Dvisible: true, DateOrTime: 'end' })} />

                        <View style={{ paddingHorizontal: RFPercentage(3), }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: RFPercentage(1) }}>
                                <View style={{ backgroundColor: 'grey', height: RFPercentage(1), width: RFPercentage(1), borderRadius: RFPercentage(1), marginRight: RFPercentage(1) }}></View>
                                <Text style={{ fontSize: RFValue(14), color: colors.Black }}>Priority</Text>

                            </View>
                            <View style={{ paddingHorizontal: RFPercentage(3), flexDirection: 'row', justifyContent: 'space-between' }}>
                                {this.state.ProrityAry.map((data, index) => {
                                    return (
                                        <View>
                                            <TouchableOpacity
                                                onPress={() => this.setState({ selectedPriority: index })}
                                                style={{ borderRadius: RFValue(5), marginBottom: RFPercentage(1), backgroundColor: index == this.state.selectedPriority ? index == 0 ? colors.LightRed : index == 1 ? colors.LightOrange : colors.LightGreen : colors.White }}>
                                                <Text style={{ paddingHorizontal: RFPercentage(2), paddingVertical: RFPercentage(1), color: colors.Black }}>{data}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    )
                                })}
                            </View>
                        </View>
                        <TouchableOpacity
                            disabled={this.state.Title == '' || this.state.Description == '' || this.state.DisplayStartDateTime == '' || this.state.DisplayEndDateTime == '' ? true : false}
                            style={[CommonStyle.CreateToDoBtn, { backgroundColor: this.state.Title == '' || this.state.Description == '' || this.state.DisplayStartDateTime == '' || this.state.DisplayEndDateTime == '' ? colors.LightBtnOrange : colors.Orange }]}
                            onPress={() => {


                                const ID = uuid.v4();
                                this.SendNotification(ID)
                                this.setState({ loading: true })
                                setTimeout(() => {
                                    if (this.props.route.params.forAddUpdate == 'Update') {
                                        this.UpdateToDo()
                                    }
                                    else {
                                        if (moment(this.state.Edate) < moment(this.state.Sdate)) {
                                            alert('End date should be greater than Start date.')
                                            this.setState({ loading: false })
                                        }
                                        else {
                                            this.AddToDo(ID)
                                        }

                                    }
                                }, 1000);


                            }}>
                            <Text style={CommonStyle.CreateToDoTxt}>{this.props.route.params.forAddUpdate == 'Update' ? 'Update To Do' : 'Add To Do'}</Text>
                        </TouchableOpacity>
                    </View>

                    {this.state.Dvisible ?
                        <DateTimePicker
                            style={CommonStyle.DatePickerStyle}
                            testID="dateTimePicker"
                            value={this.state.DateOrTime == 'start' ? this.state.Sdate : this.state.Edate}
                            minimumDate={this.state.DateOrTime == 'start' ? new Date() : this.state.Sdate}


                            mode={'date'}
                            display={'spinner'}
                            onChange={(event, selectedDate) => {
                                if (selectedDate == undefined) { }
                                else {
                                    this.GetDateTime(selectedDate, 'Date')

                                    this.setState({ Tvisible: true, Dvisible: false })
                                }
                            }}
                            onTouchCancel={() => console.log('dsgdsgs')}

                        /> : undefined}
                    {this.state.Tvisible ?
                        <DateTimePicker
                            style={CommonStyle.DatePickerStyle}
                            minimumDate={this.state.DateOrTime == 'start' ? new Date() : this.state.Sdate}
                            testID="dateTimePicker"
                            value={this.state.DateOrTime == 'start' ? this.state.STime : this.state.ETime}
                            mode={'time'}
                            display="spinner"
                            onChange={(event, selectedDate) => {
                                if (selectedDate == undefined) { }
                                else {
                                    this.GetDateTime(selectedDate, 'Time')
                                    this.setState({ Tvisible: false })
                                }


                            }}
                        /> : undefined}

                    <Modal
                        visible={this.state.DateModalVisible}
                        transparent={true}

                    >
                        <View style={CommonStyle.ModalFV}>
                            <View style={CommonStyle.ModalSV}>
                                <Text style={CommonStyle.ModalTitleTxt}>Date :</Text>
                                <DateTimePicker
                                    style={CommonStyle.DatePickerStyle}
                                    testID="dateTimePicker"
                                    value={this.state.DateOrTime == 'start' ? this.state.Sdate : this.state.Edate}
                                    mode={'date'}
                                    minimumDate={this.state.DateOrTime == 'start' ? new Date() : this.state.Sdate}

                                    display={'spinner'}
                                    onChange={(event, selectedDate) => {
                                        if (selectedDate == undefined) { }
                                        else {
                                            this.GetDateTime(selectedDate, 'Date')
                                        }
                                    }}

                                />
                                <View style={CommonStyle.Divider}></View>
                                <Text style={CommonStyle.ModalTitleTxt}>Time :</Text>

                                <DateTimePicker
                                    minimumDate={this.state.DateOrTime == 'start' ? new Date() : this.state.Sdate}

                                    style={CommonStyle.DatePickerStyle}
                                    testID="dateTimePicker"
                                    value={this.state.DateOrTime == 'start' ? this.state.STime : this.state.ETime}
                                    mode={'time'}

                                    display="spinner"
                                    onChange={(event, selectedDate) => {
                                        if (selectedDate == undefined) { }
                                        else {
                                            this.GetDateTime(selectedDate, 'Time')
                                        }
                                    }}
                                />
                                <TouchableOpacity
                                    onPress={() => {
                                        this.setState({ DateModalVisible: false })
                                    }}
                                    style={CommonStyle.DoneBtn}>
                                    <Text style={CommonStyle.DoneBtntxt}>Done</Text>
                                </TouchableOpacity>
                            </View>


                        </View>
                    </Modal>

                </KeyboardAwareScrollView>
                {this.state.loading ?
                    <ActivityIndicator style={{ position: 'absolute', top: height / 2, left: width / 2.2, alignItems: 'center' }} size={'large'} color={colors.Grey} /> : undefined}
            </View>
        )
    }
}