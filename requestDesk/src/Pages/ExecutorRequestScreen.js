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
    Layout,
    Modal,
    Spinner,
    Text,
} from "@ui-kitten/components";
import { Carousel } from "../Components/Carousel";
import { useEffect, useState } from "react";
import * as Clipboard from "expo-clipboard";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as React from "react";
import {fetchGetTaskInfo, fetchUpdateStatus, getComments, sendComment, setTaskInfo} from "../store/actions";
import {ExecutorRequestScreenNavigation} from "../Components/ExecutorRequestScreenNavigation";
import {Message} from "../Components/Message";
import {BACKGROUND_COLOR} from "../themes";
import {AddMessageButton} from "../Components/AddMessageButton";
import {AddMessageModal} from "../Components/AddMessageModal";
import { GoodJob } from "../../assets/goodJob.gif";

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
     fetchUpdateStatus,
     sendComment,
     getComments,
     setTaskInfo
}) => {
    const { taskId, otherParam } = route.params;
    useEffect(() => {
        fetchGetTaskInfo(info.userInfo.phone, info.userInfo.email, taskId);
        getComments(taskId);
    }, []);
    const [visible, setVisible] = useState(false);
    const warningToggleState = useToggleState();
    const [isUpdateStatusLoading, setIsUpdateStatusLoading] = useState(false)
    const [activePage, setActivePage] = useState(0)
    const [visibleAddMessage, setVisibleAddMessage] = useState(false)
    navigation.setOptions({ title: `Заявка №${taskId}` });
    useEffect(()=>{
        if (visibleAddMessage===false){
            getComments(taskId);
        }
    }, [visibleAddMessage])
    const updateStatusHandler = (status) => {
        fetchUpdateStatus(status, taskId, setIsUpdateStatusLoading)
        setTaskInfo({...info.taskInfo, status})
    }
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
                <Spinner status="primary" />
            </Layout>
        );
    else {
        return (
            <SafeAreaView style={styles.container}>
                {activePage === 0 ?
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Modal visible={visible}>
                            <Card>
                                <Text
                                    category="h6">{info.taskInfo.client_name} {info.taskInfo.client_second_name} {info.taskInfo.client_surname}</Text>
                                <Text category="h6" style={{marginBottom: 15}}>
                                    {info.taskInfo.client_phone}
                                </Text>
                                <Button
                                    onPress={() => {
                                        setVisible(false);
                                        Clipboard.setString(info.taskInfo.client_phone);
                                    }}
                                    style={{marginBottom: 15}}
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
                        <Text style={styles.obj}>
                            Филиал: {info.taskInfo.filial}
                        </Text>
                        <Text style={styles.obj}>
                            Объект: {info.taskInfo.object}
                        </Text>
                        <Text style={styles.obj}>
                            Оборудование: {info.taskInfo.equipmentName}
                        </Text>
                        <Text style={styles.obj}>
                            Инвенатрный номер: {info.taskInfo.equipmentInventoryNumber}
                        </Text>
                        <Text style={styles.obj}>
                            Статус: {info.taskInfo.status}
                        </Text>
                        <View style={{
                                display: "flex",
                                flexDirection: "row",
                                marginTop: 10,
                            }}>
                            <Text style={styles.obj}>
                                Заказчик:
                            </Text>
                            <Button
                                size="tiny"
                                styles={{margin: 14}}
                                onPress={() => setVisible(true)}
                            >
                                {info.taskInfo.client_surname} {info.taskInfo.client_name[0]}. {info.taskInfo.client_second_name[0]}.
                            </Button>
                        </View>
                        <Text style={styles.obj}>
                            {info.taskInfo.title}
                        </Text>
                        <Text style={styles.obj}>
                            {info.taskInfo.description}
                        </Text>
                        <View style={styles.carouselWrapper}>
                            <Carousel ids={info.taskInfo.images_ids}/>
                        </View>
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                            {isUpdateStatusLoading ?
                                <View style={{marginTop: 25}}><Spinner status="primary"/></View>
                                :
                                    info.taskInfo.status==='Создано'?
                                        <Button style={{marginBottom: 25}} onPress={()=>updateStatusHandler('В работе')}>Принять в работу</Button> :
                                    info.taskInfo.status==='В работе'?
                                        <Button style={{marginBottom: 25}} onPress={()=>updateStatusHandler('Выполнено')}>Выполнить</Button> :
                                        <View style={{marginBottom: 25}}>
                                            <Text>Заявка закрыта</Text>
                                        </View>
                                }
                        </View>
                    </ScrollView>
                    :
                    <>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            {info.comments.comments?.map(comment=> <Message text={comment[0]} yours={comment[1]} date={comment[2]}/>)}
                        </ScrollView>
                        <AddMessageButton fun={setVisibleAddMessage} />
                        <AddMessageModal setVisible={setVisibleAddMessage} visible={visibleAddMessage} sendComment={sendComment} taskId={taskId} toExecutor={false}/>
                    </>
                }
                <ExecutorRequestScreenNavigation setActivePage={setActivePage}/>
            </SafeAreaView>
        );
    }
};

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            fetchGetTaskInfo,
            fetchUpdateStatus,
            sendComment,
            getComments,
            setTaskInfo
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
        backgroundColor: BACKGROUND_COLOR
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
