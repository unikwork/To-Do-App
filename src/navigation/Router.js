import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreateToDo from '../components/CreateToDo';
import DisplayToDo from '../components/DisplayToDo';
const Stack = createNativeStackNavigator();

const Router = () => {
    return (

        <NavigationContainer >
            <Stack.Navigator screenOptions={{
                headerShown: false
            }}>
                <Stack.Screen name="DisplayToDo" component={DisplayToDo} />

                <Stack.Screen name="CreateToDo" component={CreateToDo} />


            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Router;
