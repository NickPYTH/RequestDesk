import * as eva from "@eva-design/eva";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ApplicationProvider, Avatar } from "@ui-kitten/components";
import * as React from "react";
import { TouchableOpacity } from "react-native";
import { RootSiblingParent } from "react-native-root-siblings";
import refresh from "./assets/refresh.png";
import { CameraScreen } from "./src/Pages/CameraScreen";
import { ClientScreen } from "./src/Pages/ClientScreen";
import { CreateRequestScreen } from "./src/Pages/CreateRequestScreen";
import { EditRequestScreen } from "./src/Pages/EditRequestScreen";
import { EnterScreen } from "./src/Pages/EnterScreen";
import { ExecutorScreen } from "./src/Pages/ExecutorScreen";
import { RequestScreen } from "./src/Pages/RequestScreen";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <RootSiblingParent>
      <ApplicationProvider {...eva} theme={eva.light}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="ClientHome">
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
      </ApplicationProvider>
    </RootSiblingParent>
  );
}

export default App;
