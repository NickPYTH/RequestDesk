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
    fetchGetClientTasks,
    logout,
    setRedirectAfterCreate, setTaskInfo,
} from "../store/actions";
import { connect } from "react-redux";
import { useEffect } from "react";

const ClientScreenLayout = ({
    info,
    navigation,
    logout,
    fetchGetClientTasks,
                                setTaskInfo
}) => {
    useEffect(() => {
        fetchGetClientTasks(info.userInfo);
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
                            fetchGetClientTasks(info.userInfo);
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
                    <Button
                        style={styles.button}
                        appearance="outline"
                        status="warning"
                        onPress={() => navigation.push("CreateRequest")}
                    >
                        Создать заявку
                    </Button>
                    {info.clientTasks &&
                        info.clientTasks.map((task) => {
                            return (
                                <RequestCard
                                    key={task.id}
                                    taskId={task.id}
                                    title={task.title}
                                    description={task.description}
                                    navigation={navigation}
                                    setTaskInfo={setTaskInfo}
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
            fetchGetClientTasks,
            setRedirectAfterCreate,
            setTaskInfo
        },
        dispatch
    );

const mapStateToProps = (state) => {
    const info = state.reducer;
    return { info };
};

export const ClientScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(ClientScreenLayout);

const styles = StyleSheet.create({
    button: {
        marginTop: 14,
        marginHorizontal: "28%",
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
