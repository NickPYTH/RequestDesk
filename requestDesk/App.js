import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {EnterScreen} from "./src/Pages/EnterScreen";
import * as eva from '@eva-design/eva';
import {ApplicationProvider, Avatar, Button, Layout} from '@ui-kitten/components';
import {ExecutorScreen} from "./src/Pages/ExecutorScreen";
import refresh from './assets/refresh.png'
import {TouchableOpacity} from 'react-native'
import {RequestScreen} from "./src/Pages/RequestScreen";
import {ClientScreen} from "./src/Pages/ClientScreen";
import {CreateRequestScreen} from "./src/Pages/CreateRequestScreen";
import {CameraScreen} from "./src/Pages/CameraScreen";
import { RootSiblingParent } from 'react-native-root-siblings';

const Stack = createNativeStackNavigator();

function App() {
    return (
        <RootSiblingParent>
            <ApplicationProvider {...eva} theme={eva.light}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="ClientHome">
                    <Stack.Screen name="Home" component={EnterScreen} options={{
                            title: 'Вход',
                            headerStyle: {
                                backgroundColor: '#FFCD07',
                            },
                            headerTintColor: '#fff',
                            headerTitleStyle: {
                                fontWeight: 'bold',
                            },
                        }}/>
                    <Stack.Screen name="ExecutorHome" component={ExecutorScreen} options={{
                        title: 'Заявки',
                        headerStyle: {
                            backgroundColor: '#FFCD07',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                        headerRight: () => (
                            <TouchableOpacity onPress={()=>console.log('kek')}>
                                <Avatar style={{margin: 8}} size='medium' source={refresh} onPress={()=>console.log('kek')}/>
                            </TouchableOpacity>
                        ),
                    }}/>
                    <Stack.Screen name="Request" component={RequestScreen} options={{
                        title: 'Заявка',
                        headerStyle: {
                            backgroundColor: '#FFCD07',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                    }}/>
                    <Stack.Screen name="ClientHome" component={ClientScreen} options={{
                        title: 'Отправленные заявки',
                        headerStyle: {
                            backgroundColor: '#FFCD07',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                    }}/>
                    <Stack.Screen name="CreateRequest" component={CreateRequestScreen} options={{
                        title: 'Создание заявки',
                        headerStyle: {
                            backgroundColor: '#FFCD07',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                    }}/>
                    <Stack.Screen name="Camera" component={CameraScreen} options={{
                        title: 'Сделайте фото',
                        headerStyle: {
                            backgroundColor: '#FFCD07',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                    }}/>
                </Stack.Navigator>
            </NavigationContainer>
        </ApplicationProvider>
        </RootSiblingParent>
    );
}

export default App;