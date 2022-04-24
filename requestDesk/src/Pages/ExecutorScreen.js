import { Avatar, Button, Layout, Spinner } from "@ui-kitten/components";
import {
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
} from "react-native";
import { RequestCard } from "../Components/RequestCard";
import logoutImg from "../../assets/logout.png";
import refreshImg from "../../assets/refresh.png";
import * as React from "react";
import { bindActionCreators } from "redux";
import {
    fetchGetTasks, fetchUpdateStatus,
    logout, setTaskInfo,
} from "../store/actions";
import { connect } from "react-redux";
import { useEffect } from "react";
import {ExecutorRequestCard} from "../Components/ExecutorRequestCard";

const ExecutorScreenLayout = ({
                                info,
                                navigation,
                                logout,
                                  fetchGetTasks,
                                  setTaskInfo,
                                  fetchUpdateStatus
                            }) => {
    useEffect(() => {
        fetchGetTasks();
    }, []);
    navigation.setOptions({
        headerRight: () => (
            <Layout>
                <Layout
                    style={{
                        flex: 1,
                        flexDirection: "row",
                        backgroundColor: "#FFCD07",
                    }}
                >
                    <TouchableOpacity
                        style={{
                            margin: 8,
                            width: 30,
                            height: 30,
                            marginBottom: 25,
                            marginRight: 15,
                        }}
                        onPress={() => {
                            fetchGetTasks();
                        }}
                    >
                        <Avatar
                            style={{ margin: 8, width: 30, height: 30 }}
                            size="medium"
                            source={refreshImg}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ margin: 8, width: 30, height: 30 }}
                        onPress={() => {
                            logout();
                            navigation.reset({
                                index: 0,
                                routes: [{ name: "Home" }],
                            });
                        }}
                    >
                        <Avatar
                            style={{ margin: 8, width: 30, height: 30 }}
                            size="medium"
                            source={logoutImg}
                        />
                    </TouchableOpacity>
                </Layout>
            </Layout>
        ),
    });
    return (
        <SafeAreaView style={styles.container}>
            {info.isTasksLoading ? (
                <Spinner status="warning" />
            ) : (
                <ScrollView showsVerticalScrollIndicator={false}>
                    {info.tasks &&
                    info.tasks.map((task) => {
                        return (
                            <ExecutorRequestCard
                                key={task.id}
                                taskId={task.id}
                                title={task.title}
                                object={task.object}
                                navigation={navigation}
                                setTaskInfo={setTaskInfo}
                                status={task.status}
                                isUpdateStatusLoading={info.isUpdateStatusLoading}
                                fetchUpdateStatus={fetchUpdateStatus}
                            />
                        );
                    })}
                </ScrollView>
            )}
        </SafeAreaView>
    );
};

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            logout,
            fetchGetTasks,
            setTaskInfo,
            fetchUpdateStatus
        },
        dispatch
    );

const mapStateToProps = (state) => {
    const info = state.reducer;
    return { info };
};

export const ExecutorScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(ExecutorScreenLayout);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
