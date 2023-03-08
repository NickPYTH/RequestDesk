import {
    Avatar,
    Button,
    Card,
    Input,
    Modal,
    Spinner,
    Text,
} from "@ui-kitten/components";
import {useEffect, useState} from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";
import photo from "../../assets/photo.png";
import folders from "../../assets/folders.png";
import {
    fetchCreateTask,
    fetchGetClientTasks, fetchGetEquipments, fetchGetFilials, fetchGetObjects, setFilials,
    setRedirectAfterCreate,
} from "../store/actions";
import {connect, useDispatch, useSelector} from "react-redux";
import Toast from "react-native-root-toast";
import {MAIN_COLOR} from "../themes";
import * as ImagePicker from "expo-image-picker";

const useInputState = (initialValue = "") => {
    const [value, setValue] = useState(initialValue);
    return { value, onChangeText: setValue };
};

export const CreateRequestScreen = ({navigation}) => {
    const dispatch = useDispatch();
    const store = useSelector(store => store.reducer);
    const title = useInputState();
    const description = useInputState();
    const [images, setImages] = useState([]);
    const [visible, setVisible] = useState([false, null]);
    const [selectedFilial, setSelectedFilial] = useState(null);
    const [selectedObject, setSelectedObject] = useState(null);
    const [selectedEquipment, setSelectedEquipment] = useState(null);
    useEffect(()=>dispatch(fetchGetFilials(store.userInfo.username, store.userInfo.password)), [])
    useEffect(()=>{
        if (selectedFilial)
            dispatch(fetchGetObjects(store.userInfo.username, selectedFilial.title))
    }, [selectedFilial])
    useEffect(()=>{
        if (selectedObject)
            dispatch(fetchGetEquipments(store.userInfo.username, selectedFilial.title, selectedObject.title))
    }, [selectedObject])
    const createHandler = () => {
        if (selectedFilial && selectedObject && selectedEquipment)
            dispatch(fetchCreateTask(
                {
                    title: title.value,
                    description: description.value,
                    username: store.userInfo.username,
                    password: store.userInfo.password,
                    email: store.userInfo.email,
                    filial: selectedFilial.title,
                    obj: selectedObject.title,
                    equipment: selectedEquipment.title.split('|')[0],
                    images
                }
            ));
    };
    const pickImageHandler = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.7,
        });
        if (!result.cancelled) {
            setImages(prev=>prev.concat(result))
        }
    };
    if (store.redirectAfterCreate) {
        navigation.goBack();
        dispatch(setRedirectAfterCreate(false));
        Toast.show(`Заявка создана`, {
            duration: Toast.durations.LONG,
        });
        dispatch(fetchGetClientTasks(store.userInfo));
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
                loading={store.isFilialsLoading}
                emptyResultText={"Ничего не найдено"}
                clearOnFocus={false}
                closeOnBlur={true}
                closeOnSubmit={false}
                initialValue={{ id: "2" }} // or just '2'
                onSelectItem={setSelectedFilial}
                dataSet={store?.filials?.map((filial, id)=>({id, title: filial}))}
                textInputProps={{
                    placeholder: "Филиал",
                    autoCorrect: false,
                    autoCapitalize: "none",
                    style: {
                        borderRadius: 5,
                        borderColor: MAIN_COLOR,
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
            {selectedFilial !== null &&
                <AutocompleteDropdown
                    loading={store.isObjectsLoading}
                    emptyResultText={"Ничего не найдено"}
                    clearOnFocus={false}
                    closeOnBlur={true}
                    closeOnSubmit={false}
                    initialValue={{id: "2"}} // or just '2'
                    onSelectItem={setSelectedObject}
                    dataSet={store?.objects?.map((obj, id)=>({id, title: obj}))}
                    textInputProps={{
                        placeholder: "Объект",
                        autoCorrect: false,
                        autoCapitalize: "none",
                        style: {
                            borderRadius: 5,
                            borderColor: MAIN_COLOR,
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
            }
            {(selectedFilial !== null && selectedObject !== null) &&
                <AutocompleteDropdown
                    loading={store.isEquipmentsLoading}
                    emptyResultText={"Ничего не найдено"}
                    clearOnFocus={false}
                    closeOnBlur={true}
                    closeOnSubmit={false}
                    initialValue={{id: "2"}} // or just '2'
                    onSelectItem={setSelectedEquipment}
                    dataSet={store?.equipments?.map((eq, id) => ({id, title: eq}))}
                    textInputProps={{
                        placeholder: "Наименование техники/инвентарник",
                        autoCorrect: false,
                        autoCapitalize: "none",
                        style: {
                            borderRadius: 5,
                            borderColor: MAIN_COLOR,
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
            }
            <Input
                style={{ marginHorizontal: 15, marginVertical: 15 }}
                status="primary"
                placeholder="Заявленная неисправность"
                {...title}
            />
            <Input
                style={{ marginHorizontal: 15, marginBottom: 15 }}
                multiline={true}
                status="primary"
                textStyle={{ minHeight: 64 }}
                placeholder="Описание неисправности"
                {...description}
            />
            <View
                style={{
                    ...styles.gallery,
                    height: images.length > 2 ? 200 : 100,
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
                    status="primary"
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
                <Button
                    style={{
                        height: 80,
                        width: 80,
                        marginLeft: 5,
                        borderRadius: 15,
                    }}
                    appearance="outline"
                    status="primary"
                    onPress={pickImageHandler}
                >
                    <Avatar
                        style={{ margin: 8 }}
                        size="medium"
                        source={folders}
                    />
                </Button>
            </View>
            {!store.isCreateTaskLoading ? (
                <Button
                    style={{
                        marginHorizontal: 15,
                        marginBottom: 15,
                        marginTop: 15,
                    }}
                    appearance="outline"
                    status="primary"
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
                    <Spinner size="small" status="primary" />
                </View>
            )}
        </View>
    );
};

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
        borderColor: MAIN_COLOR,
        borderWidth: 1,
        marginHorizontal: 15,
        borderRadius: 5,
        padding: 9,
        marginBottom: 15,
        flexWrap: "wrap",
    },
});
