import {
    Avatar,
    Button,
    Card,
    Input,
    Modal,
    Spinner,
    Text,
} from "@ui-kitten/components";
import { useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";
import photo from "../../assets/photo.png";
import { bindActionCreators } from "redux";
import {
    fetchCreateTask,
    fetchGetClientTasks,
    setRedirectAfterCreate,
} from "../store/actions";
import { connect } from "react-redux";
import Toast from "react-native-root-toast";

const useInputState = (initialValue = "") => {
    const [value, setValue] = useState(initialValue);
    return { value, onChangeText: setValue };
};

const CreateRequestScreenLayout = ({
    info,
    navigation,
    fetchCreateTask,
    setRedirectAfterCreate,
    fetchGetClientTasks,
}) => {
    const [images, setImages] = useState([]);
    const [visible, setVisible] = useState([false, null]);
    const title = useInputState();
    const description = useInputState();
    const [selectedItem, setSelectedItem] = useState(null);
    let equipments = [];
    if (info.userInfo)
        info.userInfo.equipments.map((eq, id) => {
            equipments.push({ id, title: eq.name + " " + eq.description });
        });
    const createHandler = () => {
        fetchCreateTask(
            title.value,
            description.value,
            info.userInfo.phone,
            info.userInfo.email,
            info.userInfo.object,
            selectedItem,
            images
        );
    };
    if (info.redirectAfterCreate) {
        navigation.goBack();
        setRedirectAfterCreate(false);
        Toast.show(`Заявка создана`, {
            duration: Toast.durations.LONG,
        });
        fetchGetClientTasks(info.userInfo);
    }
    return (
        <View style={styles.container}>
            <Modal visible={visible[0]}>
                <Card>
                    <Text category="h6" style={{ marginBottom: 15 }}>
                        Удалить фотографию?
                    </Text>
                    <Button
                        onPress={() => {
                            setImages((prev) =>
                                prev.filter(
                                    (image, imageId) => imageId !== visible[1]
                                )
                            );
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
                initialValue={{ id: "2" }} // or just '2'
                onSelectItem={setSelectedItem}
                dataSet={equipments}
                textInputProps={{
                    placeholder: "Начните вводить название объекта",
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
                placeholder="Тема заявки"
                {...title}
            />
            <Input
                style={{ marginHorizontal: 15, marginBottom: 15 }}
                multiline={true}
                status="warning"
                textStyle={{ minHeight: 64 }}
                placeholder="Описание заявки"
                {...description}
            />
            <View
                style={{
                    ...styles.gallery,
                    height: images.length > 3 ? 200 : 100,
                }}
            >
                {images.map((image, id) => {
                    if (image !== undefined)
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
                    onPress={() => createHandler()}
                >
                    Создать
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
};

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            fetchCreateTask,
            setRedirectAfterCreate,
            fetchGetClientTasks,
        },
        dispatch
    );

const mapStateToProps = (state) => {
    const info = state.reducer;
    return { info };
};

export const CreateRequestScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateRequestScreenLayout);

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
