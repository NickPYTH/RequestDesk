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
import {fetchGetImage, fetchGetTaskInfo, getComments, sendComment} from "../store/actions";
import {BACKGROUND_COLOR} from "../themes";
import {Message} from "../Components/Message";
import {AddMessageButton} from "../Components/AddMessageButton";
import {AddMessageModal} from "../Components/AddMessageModal";
import {ExecutorRequestScreenNavigation} from "../Components/ExecutorRequestScreenNavigation";

const RequestScreenLayout = ({
    info,
    route,
    navigation,
    fetchGetTaskInfo,
    fetchGetImage,
                                 sendComment,
                                 getComments
}) => {
    const { taskId, otherParam } = route.params;
    const [activePage, setActivePage] = useState(0)
    const [visibleAddMessage, setVisibleAddMessage] = useState(false)
    useEffect(() => {
        fetchGetTaskInfo(info.userInfo.phone, info.userInfo.email, taskId);
        getComments(taskId);
    }, []);
    useEffect(()=>{
        if (visibleAddMessage===false){
            getComments(taskId);
        }
    }, [visibleAddMessage])
    navigation.setOptions({ title: `Заявка №${taskId}` }); //Объект кто-подал
    if (
        info.isTaskInfoLoading ||
        info.taskInfo === null ||
        info.taskInfo === undefined
    )
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
                {activePage === 0 ?
            <ScrollView style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Text style={styles.title} category="h5">
                        {info.taskInfo.info}
                    </Text>
                    <Text style={styles.description} category="h6">
                        {info.taskInfo.description}
                    </Text>
                    <View style={styles.carouselWrapper}>
                        <Carousel ids={info.taskInfo.images_ids} />
                    </View>
                </ScrollView>
            </ScrollView>
                    :
                    <>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            {info.comments.comments?.map(comment=> <Message text={comment[0]} yours={!comment[1]} date={comment[2]}/>)}
                        </ScrollView>
                        <AddMessageButton fun={setVisibleAddMessage} />
                        <AddMessageModal setVisible={setVisibleAddMessage} visible={visibleAddMessage} sendComment={sendComment} taskId={taskId} toExecutor={true}/>
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
            fetchGetImage,
            sendComment,
            getComments
        },
        dispatch
    );

const mapStateToProps = (state) => {
    const info = state.reducer;
    return { info };
};

export const ClientRequestScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(RequestScreenLayout);

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
