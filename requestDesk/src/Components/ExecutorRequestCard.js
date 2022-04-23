import {Button, Card, Layout, Spinner, Text, Toggle} from "@ui-kitten/components";
import { StyleSheet, View } from "react-native";
import * as React from "react";
import {useState} from "react";
import {fetchUpdateStatus} from "../store/actions";

const useToggleState = (initialState = false) => {
    const [checked, setChecked] = useState(initialState);

    const onCheckedChange = (isChecked) => {
        setChecked(isChecked);
    };

    return { checked, onChange: onCheckedChange };
};

export const ExecutorRequestCard = ({ navigation, title, object, taskId, setTaskInfo, status, isUpdateStatusLoading, fetchUpdateStatus }) => {
    const warningToggleState = useToggleState(status);
    const Footer = () => {
        return (
            <View style={[styles.footerContainer]}>
                <Button
                    style={styles.footerControl}
                    size="small"
                    status="warning"
                    onPress={() => {
                        setTaskInfo(null)
                        navigation.push("ExecutorRequest", {taskId})
                    }}
                >
                    Открыть
                </Button>
                <View style={{width: 15}}>
                    {isUpdateStatusLoading ?
                        <Spinner status="warning" />
                        :
                        <Toggle
                            style={styles.toggle}
                            status="warning"
                            onChange={(val)=> {
                                fetchUpdateStatus(val, taskId)
                                warningToggleState.onChange(val)
                            }}
                            checked={warningToggleState.checked}
                        >

                        </Toggle>}
                </View>


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
                <Text style={{ maxHeight: 50 }}>{object}</Text>
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
        justifyContent: "space-around",
        alignItems: 'center'
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
