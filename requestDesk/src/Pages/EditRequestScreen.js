import {
    Avatar,
    Button,
    Card,
    Input, Layout,
    Modal, Spinner,
    Text,
} from "@ui-kitten/components";
import {useEffect, useState} from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";
import photo from "../../assets/photo.png";
import {bindActionCreators} from "redux";
import {fetchGetImage, fetchGetTaskInfo} from "../store/actions";
import {connect} from "react-redux";
import * as React from "react";

const useInputState = (initialValue = "") => {
  const [value, setValue] = useState(initialValue);
  return { value, onChangeText: setValue };
};

const EditRequestScreenLayout = ({info, route, navigation, fetchGetTaskInfo, fetchGetImage}) => {
  const [images, setImages] = useState([]);
  const [visible, setVisible] = useState([false, null]);
  const titleState = useInputState(null);
  const descriptionState = useInputState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(true)
  const saveHandler = () => {
    navigation.goBack();
  };
    useEffect(()=>{
        const { taskId, otherParam } = route.params;
        fetchGetTaskInfo(info.userInfo.phone, info.userInfo.email, taskId)
        setLoading(false)
    }, [])
    if (loading && !info.taskInfo )
        return(<Layout style={{flex: 1, marginVertical: 50, backgroundColor:'#f1f1f1', justifyContent: 'center', alignItems:'center'}}><Spinner status="warning"/></Layout>)
    else {
        return (
            <View style={styles.container}>
                <Modal visible={visible[0]}>
                    <Card>
                        <Text category="h6" style={{marginBottom: 15}}>
                            Удалить фотографию?
                        </Text>
                        <Button
                            onPress={() => {
                                setImages((prev) =>
                                    prev.filter((image, imageId) => imageId !== visible[1])
                                );
                                setVisible([false, null]);
                            }}
                            style={{marginBottom: 15}}
                        >
                            Да
                        </Button>
                        <Button status="danger" onPress={() => setVisible([false, null])}>
                            Отмена
                        </Button>
                    </Card>
                </Modal>
                <AutocompleteDropdown
                    emptyResultText={"Ничего не найдено"}
                    clearOnFocus={false}
                    closeOnBlur={true}
                    closeOnSubmit={false}
                    initialValue={{id: "2"}} // or just '2'
                    onSelectItem={setSelectedItem}
                    dataSet={[
                        {id: "1", title: 'УСС "Факед'},
                        {id: "2", title: "Администрация"},
                        {id: "3", title: "Столовая №1"},
                        {id: "5", title: "Сургутское ЛПУМГ Столовая №4"},
                        {id: "6", title: "Сургутское ЛПУМГ Столовая №7"},
                        {id: "7", title: "Губкинское ЛПУ"},
                    ]}
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
                    style={{marginHorizontal: 15, marginVertical: 15}}
                    status="warning"
                    placeholder={info.taskInfo && info.taskInfo.info}
                    {...titleState}
                />
                <Input
                    style={{marginHorizontal: 15, marginBottom: 15}}
                    multiline={true}
                    status="warning"
                    textStyle={{minHeight: 64}}
                    placeholder={info.taskInfo && info.taskInfo.description}
                    {...descriptionState}
                />
                <View
                    style={{...styles.gallery, height: images.length > 3 ? 200 : 100}}
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
                        style={{height: 80, width: 80, marginLeft: 5, borderRadius: 15}}
                        appearance="outline"
                        status="warning"
                        onPress={() => navigation.push("Camera", {images, setImages})}
                    >
                        <Avatar style={{margin: 8}} size="medium" source={photo}/>
                    </Button>
                </View>

                <Button
                    style={{marginHorizontal: 15, marginBottom: 15, marginTop: 15}}
                    appearance="outline"
                    status="warning"
                    onPress={() => saveHandler()}
                >
                    Сохранить изменения
                </Button>
            </View>
        );
    }
};

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
