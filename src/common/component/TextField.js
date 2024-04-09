import React from 'react';
import { TextInput, View, Text, StyleSheet, I18nManager } from 'react-native'
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import * as colors from '../colors'

const TextField = ({ name, onChange, displayVal }) => {
    return (
        <View style={style.mainView}>
            <View style={style.PlaceholderView}>
                <Text style={style.textcolor}>{name}</Text>
            </View>
            {name == 'Select Start Date/Time' || name == 'Select End Date/Time' ?
                <Text
                    onPress={(text) => {
                        onChange(text)
                    }}
                    style={style.textField}
                >{displayVal}</Text>
                :
                <TextInput style={[style.textField, { height: name == 'Description' ? RFPercentage(12) : null }]} placeholderTextColor={colors.Black}
                    autoCapitalize='none'
                    numberOfLines={2}
                    value={displayVal}
                    multiline={name == 'Description' ? true : false}
                    onChangeText={(text) => onChange(text)}
                ></TextInput>}


        </View>
    )
}

export default TextField

const style = StyleSheet.create({
    mainView: {
        marginBottom: RFPercentage(4),
        paddingHorizontal: RFPercentage(3)
    },
    PlaceholderView: {
        position: 'absolute', top: RFPercentage(-1), backgroundColor: 'white', zIndex: 1, paddingHorizontal: RFPercentage(0.5), left: RFPercentage(5)
    },
    textcolor: {
        color: colors.Grey,
        fontSize: RFValue(11),

    },
    textField: {
        paddingHorizontal: RFPercentage(1), paddingVertical: RFPercentage(1.7), borderWidth: 0.5, borderColor: colors.Grey, borderRadius: RFValue(3), fontSize: RFPercentage(1.6), color: colors.Black
    }
})