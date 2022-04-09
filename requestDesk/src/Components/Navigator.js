import {EditRequestScreen} from "../Pages/EditRequestScreen";
import {EnterScreen} from "../Pages/EnterScreen";
import {ExecutorScreen} from "../Pages/ExecutorScreen";
import {TouchableOpacity} from "react-native";
import {Avatar} from "@ui-kitten/components";
import refresh from "../../assets/refresh.png";
import {RequestScreen} from "../Pages/RequestScreen";
import {ClientScreen} from "../Pages/ClientScreen";
import {CreateRequestScreen} from "../Pages/CreateRequestScreen";
import {CameraScreen} from "../Pages/CameraScreen";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

const Stack = createNativeStackNavigator();

export const NavigatorLayout = ({info}) => {
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen
                    name="EditRequest"
                    component={EditRequestScreen}
                    options={{
                        title: "Редакция заявки",
                        headerStyle: {
                            backgroundColor: "#FFCD07",
                        },
                        headerTintColor: "#fff",
                        headerTitleStyle: {
                            fontWeight: "bold",
                        },
                    }}
                />
                <Stack.Screen
                    name="Home"
                    component={EnterScreen}
                    options={{
                        title: "Вход",
                        headerStyle: {
                            backgroundColor: "#FFCD07",
                        },
                        headerTintColor: "#fff",
                        headerTitleStyle: {
                            fontWeight: "bold",
                        },
                    }}
                />
                <Stack.Screen
                    name="ExecutorHome"
                    component={ExecutorScreen}
                    options={{
                        title: "Заявки",
                        headerStyle: {
                            backgroundColor: "#FFCD07",
                        },
                        headerTintColor: "#fff",
                        headerTitleStyle: {
                            fontWeight: "bold",
                        },
                        headerRight: () => (
                            <TouchableOpacity onPress={() => console.log("kek")}>
                                <Avatar
                                    style={{ margin: 8 }}
                                    size="medium"
                                    source={refresh}
                                    onPress={() => console.log("kek")}
                                />
                            </TouchableOpacity>
                        ),
                    }}
                />
                <Stack.Screen
                    name="Request"
                    component={RequestScreen}
                    options={{
                        title: "Заявка",
                        headerStyle: {
                            backgroundColor: "#FFCD07",
                        },
                        headerTintColor: "#fff",
                        headerTitleStyle: {
                            fontWeight: "bold",
                        },
                    }}
                />
                <Stack.Screen
                    name="ClientHome"
                    component={ClientScreen}
                    options={{
                        title: "Отправленные заявки",
                        headerStyle: {
                            backgroundColor: "#FFCD07",
                        },
                        headerTintColor: "#fff",
                        headerTitleStyle: {
                            fontWeight: "bold",
                        },
                    }}
                />
                <Stack.Screen
                    name="CreateRequest"
                    component={CreateRequestScreen}
                    options={{
                        title: "Создание заявки",
                        headerStyle: {
                            backgroundColor: "#FFCD07",
                        },
                        headerTintColor: "#fff",
                        headerTitleStyle: {
                            fontWeight: "bold",
                        },
                    }}
                />
                <Stack.Screen
                    name="Camera"
                    component={CameraScreen}
                    options={{
                        title: "Сделайте фото",
                        headerStyle: {
                            backgroundColor: "#FFCD07",
                        },
                        headerTintColor: "#fff",
                        headerTitleStyle: {
                            fontWeight: "bold",
                        },
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
        )
}

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {

        },
        dispatch
    );

const mapStateToProps = (state) => {
    const info = state.reducer;
    return { info };
};

export const Navigator = connect(
    mapStateToProps,
    mapDispatchToProps
)(NavigatorLayout);