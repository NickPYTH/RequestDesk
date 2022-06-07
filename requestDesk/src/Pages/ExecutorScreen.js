import {
    Avatar,
    Button,
    Icon,
    Layout,
    MenuItem,
    OverflowMenu,
    Spinner,
    TopNavigationAction
} from "@ui-kitten/components";
import {
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    ScrollView, View,
} from "react-native";
import { RequestCard } from "../Components/RequestCard";
import logoutImg from "../../assets/logout.png";
import refreshImg from "../../assets/refresh.png";
import * as React from "react";
import { bindActionCreators } from "redux";
import {
    fetchGetTasks, fetchUpdateStatus,
    logout, setComments, setTaskInfo,
} from "../store/actions";
import { connect } from "react-redux";
import {useEffect, useState} from "react";
import {ExecutorRequestCard} from "../Components/ExecutorRequestCard";
import {BACKGROUND_COLOR} from "../themes";

const ExecutorScreenLayout = ({
                                info,
                                navigation,
                                logout,
                                  fetchGetTasks,
                                  setTaskInfo,
                                  fetchUpdateStatus,
                                  setComments
                            }) => {
    const [menuVisible, setMenuVisible] = useState(false)
    const RefreshIcon = (props) => (
        <Icon {...props} name='refresh-outline'/>
    );

    const LogoutIcon = (props) => (
        <Icon {...props} name='log-out'/>
    );

    const MenuIcon = (props) => (
        <Icon {...props} name='more-vertical'/>
    );

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };
    const renderMenuAction = () => (
        <TopNavigationAction icon={MenuIcon} onPress={toggleMenu}/>
    );
    useEffect(() => {
        fetchGetTasks();
        setComments([]);
    }, []);
    navigation.setOptions({
        headerRight1: () => (
            <Layout>
                <Layout
                    style={{
                        flex: 1,
                        flexDirection: "row",
                        backgroundColor: "#f2f5fe",
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
        headerRight: ()=> (
            <View style={{marginTop: 7}}>
                <OverflowMenu
                    anchor={renderMenuAction}
                    visible={menuVisible}
                    onBackdropPress={toggleMenu}
                    onSelect={(e)=>{
                        if (e.row===0){
                            fetchGetTasks();
                        }
                        else{
                            logout();
                            navigation.reset({
                                index: 0,
                                routes: [{ name: "Home" }],
                            });
                        }
                    }}
                >
                    <MenuItem accessoryLeft={RefreshIcon} title='Обновить'/>
                    <MenuItem accessoryLeft={LogoutIcon} title='Выйти'/>
                </OverflowMenu>
            </View>
        )
    });
    return (
        <SafeAreaView style={styles.container}>
            {info.isTasksLoading ? (
                <Spinner status="primary" />
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
            fetchUpdateStatus,
            setComments
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
        backgroundColor: BACKGROUND_COLOR
    },
});
