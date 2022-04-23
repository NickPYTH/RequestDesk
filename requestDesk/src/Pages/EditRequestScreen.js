import {
    Avatar,
    Button,
    Card,
    Input,
    Layout,
    Modal,
    Spinner,
    Text,
} from "@ui-kitten/components";
import { useEffect, useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";
import photo from "../../assets/photo.png";
import { bindActionCreators } from "redux";
import {
    fetchGetClientTasks,
    fetchGetImage,
    fetchGetTaskInfo,
    fetchUpdateTask,
    setRedirectAfterCreate,
    updateTaskImages
} from "../store/actions";
import { connect } from "react-redux";
import * as React from "react";
import Toast from "react-native-root-toast";

const useInputState = (initialValue = "") => {
    const [value, setValue] = useState(initialValue);
    return { value, onChangeText: setValue };
};

const EditRequestScreenLayout = ({
    info,
    route,
    navigation,
    fetchGetTaskInfo,
    fetchGetImage,
                                     updateTaskImages,
                                     fetchUpdateTask,
                                     setRedirectAfterCreate,
                                     fetchGetClientTasks
}) => {
    const { taskId, otherParam } = route.params;
    useEffect(() => {
        fetchGetTaskInfo(info.userInfo.phone, info.userInfo.email, taskId);
    }, []);
    const [images, setImages] = useState([]);
    const [isFirst, setIsFirst] = useState(false);
    const [visible, setVisible] = useState([false, null]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [equipments, setEquipments] = useState([]);
    const titleState = useInputState(null);
    const descriptionState = useInputState(null);
    const [removedPhotosIds, setRemovedPhotosIds] = useState([])
    const saveHandler = () => {
        if (titleState.value.trim() && titleState.value.trim() && selectedItem)
            fetchUpdateTask(taskId, titleState.value, descriptionState.value, selectedItem.title, removedPhotosIds, images)
        else
            Toast.show(`Заполните пустые поля`, {
                duration: Toast.durations.LONG,
            });
    };
    if (info.redirectAfterCreate) {
        navigation.goBack();
        setRedirectAfterCreate(false);
        Toast.show(`Заявка обновлена`, {
            duration: Toast.durations.LONG,
        });
        fetchGetClientTasks(info.userInfo);
    }
    if (info.taskInfo !== null && isFirst === false) {
        setIsFirst(true);
        info.userInfo.equipments.map((eq, id) => {
            setEquipments((prev) =>
                prev.concat({
                    id: String(id),
                    title: eq.name + " " + eq.description,
                })
            );
        });
        titleState.onChangeText(info.taskInfo.info);
        descriptionState.onChangeText(info.taskInfo.description);
    }
    if (info.isTaskInfoLoading || info.taskInfo === null) {
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
    } else {
        return (
            <View style={styles.container}>
                <Modal visible={visible[0]}>
                    <Card>
                        <Text category="h6" style={{ marginBottom: 15 }}>
                            Удалить фотографию?
                        </Text>
                        <Button
                            onPress={() => {
                                if (visible[2]) {
                                    updateTaskImages(visible[1])
                                    setRemovedPhotosIds(prev=>prev.concat(visible[1]))
                                }
                                else {
                                    setImages((prev) =>
                                        prev.filter(
                                            (image, imageId) =>
                                                imageId !== visible[1]
                                        )
                                    );
                                }
                                setVisible([false, null]);
                            }}
                            style={{ marginBottom: 15 }}
                        >
                            Да
                        </Button>
                        <Button
                            status="danger"
                            onPress={() => setVisible([false, null])}
                        >
                            Отмена
                        </Button>
                    </Card>
                </Modal>
                <AutocompleteDropdown
                    emptyResultText={"Ничего не найдено"}
                    clearOnFocus={false}
                    closeOnBlur={true}
                    closeOnSubmit={false}
                    initialValue={equipments.find((item) => {
                        if (
                            item.title.split(" ")[0] ===
                            info.taskInfo.equipment.split(" ")[0]
                        )
                            return item.id;
                    })}
                    onSelectItem={setSelectedItem}
                    dataSet={equipments}
                    textInputProps={{
                        placeholder: "Название оборудования",
                        autoCorrect: false,
                        autoCapitalize: "none",
                        style: {
                            borderRadius: 5,
                            borderColor: "#ffaa00",
                            borderWidth: 1,
                            backgroundColor: "#fff",
                            color: "black",
                            paddingLeft: 18,
                            height: 42,
                        },
                    }}
                    rightButtonsContainerStyle={{
                        backgroundColor: "#fff",
                        top: 1,
                        height: 39,
                        right: 5,
                    }}
                    inputContainerStyle={{
                        height: 42,
                        backgroundColor: "#fff",
                        marginHorizontal: 15,
                        marginTop: 15,
                        borderRadius: 5,
                    }}
                    suggestionsListContainerStyle={{
                        backgroundColor: "#fff",
                        marginTop: 15,
                    }}
                />
                <Input
                    style={{ marginHorizontal: 15, marginVertical: 15 }}
                    status="warning"
                    placeholder={info.taskInfo && info.taskInfo.info}
                    {...titleState}
                />
                <Input
                    style={{ marginHorizontal: 15, marginBottom: 15 }}
                    multiline={true}
                    status="warning"
                    textStyle={{ minHeight: 64 }}
                    placeholder={info.taskInfo && info.taskInfo.description}
                    {...descriptionState}
                />
                <View
                    style={{
                        ...styles.gallery,
                        height: images.length > 3 ? 200 : 100,
                    }}
                >
                    {info.taskInfo.images_ids.map((id) => {
                            return (
                                <TouchableOpacity
                                    key={id}
                                    onLongPress={() => {
                                        setVisible([true, id, 'old']);
                                    }}
                                    activeOpacity={0.8}
                                >
                                    <Image
                                        style={styles.tinyLogo}
                                        source={{
                                            uri: `http://192.168.1.112:8000/api/accounts/get-image-by-id?id=${id}`,
                                        }}
                                    />
                                </TouchableOpacity>
                            );
                    })}
                    {images.map((image, id) => {
                        if (image)
                        return (
                            <TouchableOpacity
                                key={id}
                                onLongPress={() => {
                                    setVisible([true, id]);
                                }}
                                activeOpacity={0.8}
                            >
                                <Image
                                    style={styles.tinyLogo}
                                    source={{
                                        uri: image.uri,
                                    }}
                                />
                            </TouchableOpacity>
                        );
                    })}
                    <Button
                        style={{
                            height: 80,
                            width: 80,
                            marginLeft: 5,
                            borderRadius: 15,
                        }}
                        appearance="outline"
                        status="warning"
                        onPress={() =>
                            navigation.push("Camera", { images, setImages })
                        }
                    >
                        <Avatar
                            style={{ margin: 8 }}
                            size="medium"
                            source={photo}
                        />
                    </Button>
                </View>

                {!info.isCreateTaskLoading ? (
                    <Button
                        style={{
                            marginHorizontal: 15,
                            marginBottom: 15,
                            marginTop: 15,
                        }}
                        appearance="outline"
                        status="warning"
                        onPress={() => saveHandler()}
                    >
                        Сохранить изменения
                    </Button>
                ) : (
                    <View
                        style={{
                            marginHorizontal: 15,
                            marginBottom: 15,
                            marginTop: 15,
                            flex: 1,
                            justifyContent: "flex-start",
                            alignItems: "center",
                        }}
                    >
                        <Spinner size="small" status="warning" />
                    </View>
                )}

            </View>
        );
    }
};

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            fetchGetTaskInfo,
            fetchGetImage,
            updateTaskImages,
            fetchUpdateTask,
            setRedirectAfterCreate,
            fetchGetClientTasks
        },
        dispatch
    );

const mapStateToProps = (state) => {
    const info = state.reducer;
    return { info };
};

export const EditRequestScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(EditRequestScreenLayout);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tinyLogo: {
        width: 80,
        height: 80,
        borderRadius: 15,
        marginLeft: 5,
        marginBottom: 15,
    },
    gallery: {
        display: "flex",
        flexDirection: "row",
        height: 100,
        borderColor: "#ffaa00",
        borderWidth: 1,
        marginHorizontal: 15,
        borderRadius: 5,
        padding: 9,
        marginBottom: 15,
        flexWrap: "wrap",
    },
});
