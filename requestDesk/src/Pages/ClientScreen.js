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
    ScrollView, View, Text,
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
import {useEffect, useState} from "react";
import {BACKGROUND_COLOR, MAIN_COLOR} from "../themes";
import {AddRequestButton} from "../Components/AddRequestButton";

const ClientScreenLayout = ({
    info,
    navigation,
    logout,
    fetchGetClientTasks,
    setTaskInfo
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
        fetchGetClientTasks(info.userInfo);
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
        headerRight: ()=> (
                    <View style={{marginTop: 7}}>
                        <OverflowMenu
                            anchor={renderMenuAction}
                            visible={menuVisible}
                            onBackdropPress={toggleMenu}>
                            <MenuItem accessoryLeft={RefreshIcon} title='Обновить'/>
                            <MenuItem accessoryLeft={LogoutIcon} title='Выйти'/>
                        </OverflowMenu>
                    </View>
        )
    });
    
    return (
        <SafeAreaView style={styles.container}>
            <AddRequestButton fun={()=>navigation.push("CreateRequest")} />
            {info.isTasksLoading ? (
                <Spinner status="warning" />
            ) : (
                <ScrollView showsVerticalScrollIndicator={false}>
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
        backgroundColor: BACKGROUND_COLOR
    }
});
