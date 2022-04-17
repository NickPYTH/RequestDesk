import {View, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity} from "react-native";
import {Button, Card, Divider, Layout, Modal, Spinner, Text, Toggle} from "@ui-kitten/components";
import {Carousel} from "../Components/Carousel";
import {useEffect, useState} from "react";
import * as Clipboard from 'expo-clipboard';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as React from "react";
import {fetchGetImage, fetchGetTaskInfo} from "../store/actions";

const useToggleState = (initialState = false) => {
    const [checked, setChecked] = useState(initialState);

    const onCheckedChange = (isChecked) => {
        setChecked(isChecked);
    };

    return { checked, onChange: onCheckedChange };
};

const RequestScreenLayout = ({info, route, navigation, fetchGetTaskInfo, fetchGetImage}) => {
    useEffect(()=>{
        const { taskId, otherParam } = route.params;
        fetchGetTaskInfo(info.userInfo.phone, info.userInfo.email, taskId)
    }, [])

    const [visible, setVisible] = useState(false);
    const warningToggleState = useToggleState();
    navigation.setOptions({ title: `Заявка №${123}` }) //Объект кто-подал
    if (info.isTaskInfoLoading || (info.taskInfo===null || info.taskInfo===undefined))
        return(<Layout style={{flex: 1, marginVertical: 50, backgroundColor:'#f1f1f1', justifyContent: 'center', alignItems:'center'}}><Spinner status="warning"/></Layout>)
    else {
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Modal visible={visible}>
                        <Card>
                            <Text category='h6'>Иванов Иван Иванович</Text>
                            <Text category='h6' style={{marginBottom: 15}}>89825054353</Text>
                            <Button onPress={() => {
                                setVisible(false)
                                Clipboard.setString('89825054353');
                            }} style={{marginBottom: 15}}>
                                Скопировать номер
                            </Button>
                            <Button status='danger' onPress={() => setVisible(false)}>
                                Закрыть
                            </Button>
                        </Card>
                    </Modal>
                    <Text style={styles.title} category='h5'>{info.taskInfo.info}</Text>
                    <Text style={styles.description} category='h6'>
                        {info.taskInfo.description}
                    </Text>
                    <Text style={styles.obj} category='h6'>Объект: УСС "Факел"</Text>
                    <View style={styles.carouselWrapper}>
                        <Carousel ids={info.taskInfo.images_ids}/>
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            fetchGetTaskInfo,
            fetchGetImage
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
    },
    title: {
        marginHorizontal: 15,
        marginVertical: 15,
    },
    description: {
        marginHorizontal: 15,
        marginBottom: 5
    },
    obj:{
        marginHorizontal: 15,
    },
    carouselWrapper: {
        marginHorizontal: 5,
        marginVertical: 15
    },
    toggle: {
        marginVertical: 15
    },
})