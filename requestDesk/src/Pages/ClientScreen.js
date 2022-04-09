import {Avatar, Button} from "@ui-kitten/components";
import {StyleSheet, TouchableOpacity, View} from "react-native";
import { RequestCard } from "../Components/RequestCard";
import {useNavigationState} from "@react-navigation/native";
import refresh from "../../assets/refresh.png";
import * as React from "react";

export const ClientScreen = ({ navigation }) => {
    //const index = useNavigationState(state => state.index);
    navigation.setOptions(
        {headerRight: () => (
                <TouchableOpacity onPress={() => navigation.reset({
                    index: 0,
                    routes: [{ name: 'Home' }],
                })}>
                    <Avatar
                        style={{ margin: 8 }}
                        size="medium"
                        source={refresh}
                        onPress={() => console.log("kek")}
                    />
                </TouchableOpacity>
            ),}
    )
  return (
    <View>
      <RequestCard navigation={navigation} />
      <Button
        style={styles.button}
        appearance="outline"
        status="warning"
        onPress={() => navigation.push("CreateRequest")}
      >
        Создать заявку
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    marginVertical: 15,
    marginHorizontal: "28%",
  },
});
