import {
    Button,
    Icon,
    MenuItem,
    OverflowMenu,
    Spinner,
    TopNavigationAction
} from "@ui-kitten/components";
import {
    StyleSheet,
    SafeAreaView,
    ScrollView, View,
} from "react-native";
import { RequestCard } from "../Components/RequestCard";
import * as React from "react";
import { bindActionCreators } from "redux";
import {
    fetchGetClientTasks, getAllFilials,
    logout,
    setRedirectAfterCreate, setTaskInfo,
} from "../store/actions";
import {connect, useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import {BACKGROUND_COLOR, MAIN_COLOR} from "../themes";
import {AddRequestButton} from "../Components/AddRequestButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {ExecutorMainScreenNavigation} from "../Components/ExecutorMainScreenNavigation";
import {FilterModal} from "../Components/FilterModal";

const ClientScreenLayout = ({
    info,
    navigation,
    logout,
    fetchGetClientTasks,
    setTaskInfo,
    getAllFilials
}) => {
    const dispatch = useDispatch()
    const [menuVisible, setMenuVisible] = useState(false)
    const [activePage, setActivePage] = useState(0);
    const [tasks, setTasks] = useState(null);
    const [visibleFilterModal, setVisibleFilterModal] = useState(false);

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
        getAllFilials();
    }, []);
    useEffect(()=>{
        if (info.clientTasks)
            setTasks(info.clientTasks)
    }, [info.clientTasks]);
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
                                    fetchGetClientTasks(info.userInfo);
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
            {(info.filials && info.objects && info.clientTasks) &&
                <FilterModal originalTasks={info.clientTasks} tasks={tasks} visible={visibleFilterModal} setVisible={setVisibleFilterModal} setTasks={setTasks}/>
            }
            <AddRequestButton fun={()=>navigation.push("CreateRequest")} />
            {info.isTasksLoading ? (
                <View style={{height: '50%'}}>
                    <Spinner status="primary" />
                </View>
            ) : (
                <>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {activePage===0 &&
                            tasks &&
                            tasks.map((task) => {
                                if (task.status==="Создано")
                                    return (
                                        <RequestCard
                                            object={task.object}
                                            subObject={task.subObject}
                                            equipmentNumber={task.number}
                                            equipmentName={task.name}
                                            key={task.id}
                                            taskId={task.id}
                                            title={task.title}
                                            description={task.description}
                                            navigation={navigation}
                                            setTaskInfo={setTaskInfo}
                                            status={task.status}
                                            date={task.date.slice(0,10)}
                                            time={task.date.slice(11,16)}
                                        />
                                    );
                            })
                        }
                        {activePage===1 &&
                            tasks &&
                            tasks.map((task) => {
                                if (task.status==="В работе")
                                    return (
                                        <RequestCard
                                            object={task.object}
                                            subObject={task.subObject}
                                            equipmentNumber={task.number}
                                            equipmentName={task.name}
                                            key={task.id}
                                            taskId={task.id}
                                            title={task.title}
                                            description={task.description}
                                            navigation={navigation}
                                            setTaskInfo={setTaskInfo}
                                            status={task.status}
                                            date={task.date.slice(0,10)}
                                            time={task.date.slice(11,16)}
                                        />
                                    );
                            })
                        }
                        {activePage===2 &&
                            tasks &&
                            tasks.map((task) => {
                                if (task.status==="Выполнено")
                                    return (
                                        <RequestCard
                                            object={task.object}
                                            subObject={task.subObject}
                                            equipmentNumber={task.number}
                                            equipmentName={task.name}
                                            key={task.id}
                                            taskId={task.id}
                                            title={task.title}
                                            description={task.description}
                                            navigation={navigation}
                                            setTaskInfo={setTaskInfo}
                                            status={task.status}
                                            date={task.date.slice(0,10)}
                                            time={task.date.slice(11,16)}
                                        />
                                    );
                            })
                        }
                    </ScrollView>
                    <ExecutorMainScreenNavigation setActivePage={setActivePage} tasks={tasks}/>
                </>
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
            setTaskInfo,
            getAllFilials
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
