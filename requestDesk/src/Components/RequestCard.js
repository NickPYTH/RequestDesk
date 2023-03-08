import {Avatar, Button, Card, Icon, Layout, Text} from "@ui-kitten/components";
import { StyleSheet, View, Image } from "react-native";
import work from "../../assets/work.png"
import * as React from "react";
import {MAIN_COLOR} from "../themes";

export const RequestCard = ({ navigation, object, subObject, time, date, taskId, setTaskInfo, status, equipmentName, equipmentNumber }) => {
    const Footer = () => {
        return (
            <View style={[styles.footerContainer]}>
                <Button
                    style={styles.footerControl}
                    size="small"
                    status="primary"
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
                    status="primary"
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
        <View {...props} style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', margin: 5, marginLeft: 20}}>
            <View style={{display: 'flex', flexDirection: 'row'}}>
                <Text category="s1" style={{marginLeft: 10}}>{status}</Text>
            </View>
            <Text category="s1" style={{marginRight: 5}}>От {time} {date}</Text>
        </View>
    );
    return (
        <Card
            navigation={navigation}
            style={styles.card}
            status="primary"
            footer={Footer}
            header={Header}
        >
            <Text style={{fontWeight: 'bold'}}>{equipmentNumber}</Text>
            <Text>{equipmentName}</Text>
            <Text>{object}</Text>
            <Text>{subObject}</Text>
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
