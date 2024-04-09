import { StyleSheet, Dimensions } from "react-native";
import * as colors from '../common/colors'
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
const { width, height } = Dimensions.get('window')

export const CommonStyle = StyleSheet.create({
    MainView: {
        flex: 1, backgroundColor: colors.White
    },
    HeaderMainView: {
        width: width, height: height / 7, backgroundColor: colors.Blue, alignItems: 'center', justifyContent: 'center', marginBottom: RFPercentage(4),
        borderBottomLeftRadius: RFPercentage(10)
    },
    HeaderSubView: {
        position: 'absolute', bottom: RFPercentage(-2.5), backgroundColor: colors.Orange, alignItems: 'center', justifyContent: 'center',
        borderRadius: RFValue(15), right: RFPercentage(2)
    },
    HeaderTxt: { paddingHorizontal: RFPercentage(7), paddingVertical: RFPercentage(1.6), color: 'white', fontWeight: 'bold' },

    //Display To DO style
    NoTODostyle: { fontSize: RFValue(15), alignSelf: 'center', marginTop: RFPercentage(5), color: colors.Black },
    plusbtn: { position: 'absolute', bottom: RFPercentage(3), right: RFPercentage(3) },
    plusImg: { height: RFPercentage(5), width: RFPercentage(5), resizeMode: 'contain', tintColor: colors.Orange },
    FFirstView: { paddingHorizontal: RFPercentage(4), marginTop: RFPercentage(4) },
    DisplayToDoView: {
        paddingHorizontal: RFPercentage(1),
        paddingVertical: RFPercentage(2),
        borderTopLeftRadius: RFPercentage(3),
        borderTopRightRadius: RFPercentage(3),
        borderBottomLeftRadius: RFPercentage(3),
        backgroundColor: "white",
        paddingHorizontal: RFPercentage(2),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        width: width / 1.2,
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    DisplayToDoViewInnerV: { flexDirection: 'row', justifyContent: 'space-between' },
    DisplayTitle: { fontSize: RFValue(18), color: colors.Black, paddingRight: RFPercentage(2) },
    starImg: {
        width: RFPercentage(2), height: RFPercentage(2), resizeMode: 'contain',

    },
    DisplayDesc: { fontSize: RFValue(11), color: colors.Grey, },
    DisplayDate: { fontSize: RFValue(11), color: colors.Grey },


    //Create To Do style
    FirstV: { paddingHorizontal: RFPercentage(3), },


    //Modal style
    ModalFV: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
        paddingHorizontal: 50,
        backgroundColor: 'rgba(52, 52, 52, 0.4)'
    },
    ModalSV: {
        backgroundColor: "white",
        borderRadius: 20,
        padding: 2,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        width: width / 1.2,
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    ModalTitleTxt: { fontSize: RFValue(15), alignSelf: 'flex-start', marginLeft: RFPercentage(2), marginTop: RFPercentage(2) },
    DatePickerStyle: { alignself: 'center', height: height / 6, width: width / 1.3 },
    Divider: { width: width / 1.3, height: 1, backgroundColor: 'lightgrey', marginVertical: RFPercentage(1) },
    DoneBtn: { marginRight: RFPercentage(1), marginBottom: RFPercentage(1), borderRadius: RFPercentage(1), backgroundColor: colors.Orange, alignSelf: 'flex-end' },
    DoneBtntxt: { paddingHorizontal: RFPercentage(3), paddingVertical: RFPercentage(1.2), color: 'white' },
    CreateToDoBtn: { marginHorizontal: RFPercentage(3), backgroundColor: colors.Orange, alignItems: 'center', justifyContent: 'center', borderRadius: RFPercentage(3), marginTop: RFPercentage(3) },
    CreateToDoTxt: { paddingVertical: RFPercentage(1.5), color: colors.White, fontWeight: 'bold' },
    notesV:{ marginTop: RFValue(3), height: RFPercentage(1.5), width: RFPercentage(1.5), backgroundColor: colors.Grey, borderRadius: RFPercentage(1.5), marginRight: RFPercentage(1) },
    notesTxt:{ fontSize: RFValue(12), color: colors.Black }
})