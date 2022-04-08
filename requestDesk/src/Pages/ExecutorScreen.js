import { Text } from "@ui-kitten/components";
import { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { RequestCard } from "../Components/RequestCard";

export const ExecutorScreen = ({ navigation }) => {
  const [requests, setRequests] = useState([1, 2, 3]);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {requests.length === 0 ? (
          <Text category={"h3"}>Пусто</Text>
        ) : (
          requests.map((request, id) => {
            return (
              <RequestCard
                key={id}
                navigation={navigation}
                path="Request"
                params={{ requestId: 123 }}
              />
            );
          })
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
