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
import * as React from "react";
import { bindActionCreators } from "redux";
import {
    fetchGetFilials, fetchGetObjects,
    fetchGetTasks, fetchUpdateStatus, getAllFilials,
    logout, setComments, setTaskInfo, setTaskList,
} from "../store/actions";
import { connect } from "react-redux";
import {useEffect, useState} from "react";
import {ExecutorRequestCard} from "../Components/ExecutorRequestCard";
import {BACKGROUND_COLOR} from "../themes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {ExecutorMainScreenNavigation} from "../Components/ExecutorMainScreenNavigation";
import {FilterModal} from "../Components/FilterModal";

const ExecutorScreenLayout = ({
                                info,
                                navigation,
                                logout,
                                  fetchGetTasks,
                                  setTaskInfo,
                                  fetchUpdateStatus,
                                  setComments,
                                  getAllFilials,
                            }) => {
    const [tasks, setTasks] = useState(null);
    const [menuVisible, setMenuVisible] = useState(false);
    const [visibleFilterModal, setVisibleFilterModal] = useState(false);
    const [activePage, setActivePage] = useState(0);
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
        getAllFilials();
        fetchGetTasks();
        setComments([]);
    }, []);
    useEffect(()=>{
        if (info.tasks)
            setTasks(info.tasks)
    }, [info.tasks])
    navigation.setOptions({
        headerRight: ()=> (
            <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 7}}>
                <Button onPress={()=>setVisibleFilterModal(true)} appearance='ghost' accessoryLeft={<Icon fill={'#1d1b1b'} name='funnel'/>}/>
                <OverflowMenu
                    anchor={renderMenuAction}
                    visible={menuVisible}
                    onBackdropPress={toggleMenu}
                    onSelect={(e)=>{
                        if (e.row===0){
                            fetchGetTasks();
                        }
                        else{
                            AsyncStorage.clear().then(()=>{
                                logout();
                                navigation.reset({
                                    index: 0,
                                    routes: [{ name: "Home" }]
                                })
                            })
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
                {(info.filials && info.objects && info.tasks) &&
                    <FilterModal originalTasks={info.tasks} tasks={tasks} visible={visibleFilterModal} setVisible={setVisibleFilterModal} info={info} setTasks={setTasks}/>
                }
                {info.isTasksLoading ?
                <Spinner status="primary" />
                    :
                <>
                {activePage===0 &&
                    <ScrollView showsVerticalScrollIndicator={false}>
                    {tasks && tasks.map((task) => {
                        if (task.status==="Создано")
                            return (
                                <ExecutorRequestCard
                                    subObject={task.subObject}
                                    key={task.id}
                                    taskId={task.id}
                                    title={task.title}
                                    object={task.object}
                                    navigation={navigation}
                                    setTaskInfo={setTaskInfo}
                                    status={task.status}
                                    isUpdateStatusLoading={info.isUpdateStatusLoading}
                                    fetchUpdateStatus={fetchUpdateStatus}
                                    equipmentNumber={task.number}
                                    equipmentName={task.name}
                                    date={task.date.slice(0, 10)}
                                    time={task.date.slice(11, 16)}
                                />
                            );
                        })}
                </ScrollView>
                }
                {activePage===1 &&
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {tasks && tasks.map((task) => {
                            if (task.status==="В работе")
                                return (
                                    <ExecutorRequestCard
                                        subObject={task.subObject}
                                        key={task.id}
                                        taskId={task.id}
                                        title={task.title}
                                        object={task.object}
                                        navigation={navigation}
                                        setTaskInfo={setTaskInfo}
                                        status={task.status}
                                        isUpdateStatusLoading={info.isUpdateStatusLoading}
                                        fetchUpdateStatus={fetchUpdateStatus}
                                        equipmentNumber={task.number}
                                        equipmentName={task.name}
                                        date={task.date.slice(0, 10)}
                                        time={task.date.slice(11, 16)}
                                    />
                                );
                        })}
                    </ScrollView>
                }
                {activePage===2 &&
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {tasks && tasks.map((task) => {
                            if (task.status==="Выполнено") {
                                return (
                                    <ExecutorRequestCard
                                        subObject={task.subObject}
                                        key={task.id}
                                        taskId={task.id}
                                        title={task.title}
                                        object={task.object}
                                        navigation={navigation}
                                        setTaskInfo={setTaskInfo}
                                        status={task.status}
                                        isUpdateStatusLoading={info.isUpdateStatusLoading}
                                        fetchUpdateStatus={fetchUpdateStatus}
                                        equipmentNumber={task.number}
                                        equipmentName={task.name}
                                        date={task.date.slice(0, 10)}
                                        time={task.date.slice(11, 16)}
                                    />
                                );
                            }
                        })}
                    </ScrollView>
                }
                </>
                }
                <ExecutorMainScreenNavigation setActivePage={setActivePage}/>
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
            setComments,
            getAllFilials,
            setTaskList
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
