import { Button } from "@ui-kitten/components";
import { StyleSheet, View } from "react-native";
import { RequestCard } from "../Components/RequestCard";

export const ClientScreen = ({ navigation }) => {
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
