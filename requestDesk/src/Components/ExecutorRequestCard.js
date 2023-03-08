import {Button, Card, Layout, Spinner, Text, Toggle} from "@ui-kitten/components";
import { StyleSheet, View } from "react-native";
import * as React from "react";
import {useEffect, useState} from "react";

const useToggleState = (initialState = false) => {
    const [checked, setChecked] = useState(initialState);

    const onCheckedChange = (isChecked) => {
        setChecked(isChecked);
    };

    return { checked, onChange: onCheckedChange };
};

export const ExecutorRequestCard = ({ navigation, title, object, subObject, taskId, setTaskInfo, status, equipmentName, equipmentNumber, time, date }) => {
    const warningToggleState = useToggleState(status);
    const [isUpdateStatusLoading, setIsUpdateStatusLoading] = useState(false)
    useEffect(()=> {
        warningToggleState.onChange(status)
        }, [status])
    const Header = (props) => (
        <View {...props} style={{display: 'flex', flexDirection: 'row', margin: 4, justifyContent: 'space-between'}}>
            <Text category="s1" >От {time} {date}</Text>
            <Text category="s1" style={{marginRight: 5}}>{status}</Text>
        </View>
    );
    return (
        <Card
            navigation={navigation}
            style={styles.card}
            status="primary"
            header={Header}
            onPress={() => {
                setTaskInfo(null)
                navigation.push("ExecutorRequest", {taskId})
            }}
        >
            <View>
                <Text style={{fontWeight: 'bold'}}>{equipmentNumber}</Text>
                <Text>{equipmentName}</Text>
                <Text>{object}</Text>
                <Text>{subObject}</Text>
            </View>
        </Card>
    );
};

const styles = StyleSheet.create({
    card: {
        marginVertical: 5,
        width: "100%"
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
