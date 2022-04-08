import { Button, Card, Layout, Text } from "@ui-kitten/components";
import { StyleSheet, View } from "react-native";

const Header = (props) => (
  <View {...props}>
    <Text category="h6">Тема заявки</Text>
    <Text category="s1">От 01.03.2022</Text>
  </View>
);

export const RequestCard = ({ navigation }) => {
  const Footer = () => {
    return (
      <View style={[styles.footerContainer]}>
        <Button
          style={styles.footerControl}
          size="small"
          status="warning"
          onPress={() => navigation.push("Request", { requestId: 123 })}
        >
          Просмотреть
        </Button>
        <Button
          style={styles.footerControl}
          size="small"
          status="warning"
          onPress={() => navigation.push("EditRequest", { requestId: 123 })}
        >
          Редактировать
        </Button>
        <Button style={styles.footerControl} size="small" status="danger">
          Удалить
        </Button>
      </View>
    );
  };
  return (
    <Card
      navigation={navigation}
      style={styles.card}
      status="warning"
      footer={Footer}
      header={Header}
    >
      <Layout>
        <Text style={{ maxHeight: 50 }}>
          Описание заявкиаявки заявкизаявкиза явкизаявки заявки
        </Text>
      </Layout>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 10,
    marginHorizontal: 20,
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footerControl: {
    margin: 5,
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
