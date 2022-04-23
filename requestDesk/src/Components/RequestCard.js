import { Button, Card, Layout, Text } from "@ui-kitten/components";
import { StyleSheet, View } from "react-native";

export const RequestCard = ({ navigation, title, description, taskId, setTaskInfo }) => {
    const Footer = () => {
        return (
            <View style={[styles.footerContainer]}>
                <Button
                    style={styles.footerControl}
                    size="small"
                    status="warning"
                    onPress={() => {
                        setTaskInfo(null)
                        navigation.push("Request", {taskId})
                    }}
                >
                    Просмотреть
                </Button>
                <Button
                    style={styles.footerControl}
                    size="small"
                    status="warning"
                    onPress={() => {
                        setTaskInfo(null)
                        navigation.push("EditRequest", {taskId})
                    }}
                >
                    Редактировать
                </Button>
            </View>
        );
    };
    const Header = (props) => (
        <View {...props}>
            <Text category="h6">{title}</Text>
            <Text category="s1">От 01.03.2022</Text>
        </View>
    );
    return (
        <Card
            navigation={navigation}
            style={styles.card}
            status="warning"
            footer={Footer}
            header={Header}
        >
            <Layout>
                <Text style={{ maxHeight: 50 }}>{description}</Text>
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
        width: "45%",
    },
    topContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
});
