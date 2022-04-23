import {
    View,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import {
    Button,
    Card,
    Divider,
    Layout,
    Modal,
    Spinner,
    Text,
    Toggle,
} from "@ui-kitten/components";
import { Carousel } from "../Components/Carousel";
import { useEffect, useState } from "react";
import * as Clipboard from "expo-clipboard";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as React from "react";
import { fetchGetTaskInfo } from "../store/actions";

const useToggleState = (initialState = false) => {
    const [checked, setChecked] = useState(initialState);

    const onCheckedChange = (isChecked) => {
        setChecked(isChecked);
    };

    return { checked, onChange: onCheckedChange };
};

const ExecutorRequestScreenLayout = ({
    info,
    route,
    navigation,
    fetchGetTaskInfo,
}) => {
    const { taskId, otherParam } = route.params;
    useEffect(() => {
        fetchGetTaskInfo(info.userInfo.phone, info.userInfo.email, taskId);
    }, []);
    const [visible, setVisible] = useState(false);
    const warningToggleState = useToggleState();
    navigation.setOptions({ title: `Заявка №${taskId}` });
    useEffect(()=> {
        if (info.taskInfo)
            warningToggleState.onChange(info.taskInfo.status)
    }, [info.taskInfo])
    console.log(info.taskInfo)
    if (info.isTaskInfoLoading || info.taskInfo === null)
        return (
            <Layout
                style={{
                    flex: 1,
                    marginVertical: 50,
                    backgroundColor: "#f1f1f1",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Spinner status="warning" />
            </Layout>
        );
    else {
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Modal visible={visible}>
                        <Card>
                            <Text category="h6">{info.taskInfo.client_name} {info.taskInfo.client_second_name} {info.taskInfo.client_surname}</Text>
                            <Text category="h6" style={{ marginBottom: 15 }}>
                                {info.taskInfo.client_phone}
                            </Text>
                            <Button
                                onPress={() => {
                                    setVisible(false);
                                    Clipboard.setString( info.taskInfo.client_phone);
                                }}
                                style={{ marginBottom: 15 }}
                            >
                                Скопировать номер
                            </Button>
                            <Button
                                status="danger"
                                onPress={() => setVisible(false)}
                            >
                                Закрыть
                            </Button>
                        </Card>
                    </Modal>
                    <Text style={styles.title} category="h5">
                        {info.taskInfo.info}
                    </Text>
                    <Text style={styles.description} category="h6">
                        {info.taskInfo.description}
                    </Text>
                    <Text style={styles.obj} category="h6">
                        Объект: {info.taskInfo.object}
                    </Text>
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            marginTop: 10,
                        }}
                    >
                        <Text style={styles.obj} category="h6">
                            Заказчик:{" "}
                        </Text>
                        <Button
                            size="tiny"
                            styles={{ margin: 14 }}
                            onPress={() => setVisible(true)}
                        >
                            {info.taskInfo.client_surname} {info.taskInfo.client_name[0]}. {info.taskInfo.client_second_name[0]}.
                        </Button>
                    </View>
                    <View style={styles.carouselWrapper}>
                        <Carousel ids={info.taskInfo.images_ids} />
                    </View>
                    <Toggle
                        style={styles.toggle}
                        status="warning"
                        {...warningToggleState}
                    >
                        Отметить как выполненое
                    </Toggle>
                </ScrollView>
            </SafeAreaView>
        );
    }
};

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            fetchGetTaskInfo,
        },
        dispatch
    );

const mapStateToProps = (state) => {
    const info = state.reducer;
    return { info };
};

export const ExecutorRequestScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(ExecutorRequestScreenLayout);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        marginHorizontal: 15,
        marginVertical: 15,
    },
    description: {
        marginHorizontal: 15,
        marginBottom: 5,
    },
    obj: {
        marginHorizontal: 15,
    },
    carouselWrapper: {
        marginHorizontal: 5,
        marginVertical: 15,
    },
    toggle: {
        marginVertical: 15,
    },
});
