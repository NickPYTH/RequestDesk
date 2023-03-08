import { View, Text, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { Camera } from "expo-camera";
import Toast from "react-native-root-toast";
import * as ImageManipulator from "expo-image-manipulator";
import { Spinner } from "@ui-kitten/components";

export const CameraScreen = ({ route, navigation }) => {
    const { setImages, images, otherParam } = route.params;
    const [counter, setCounter] = useState(images.length);
    const [hasPermission, setHasPermission] = useState(null);
    const [cameraRef, setCameraRef] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [isCameraProcessing, setIsCameraProcessing] = useState(false);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === "granted");
        })();
    }, []);
    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={{ flex: 1 }}>
            <Camera
                style={{ flex: 1 }}
                type={type}
                ref={(ref) => {
                    setCameraRef(ref);
                }}
            >
                <View
                    style={{
                        flex: 1,
                        backgroundColor: "transparent",
                        justifyContent: "flex-end",
                        marginBottom: 15,
                    }}
                >
                    {!isCameraProcessing ? (
                        <TouchableOpacity
                            style={{ alignSelf: "center" }}
                            onPress={async () => {
                                setIsCameraProcessing(true);
                                if (cameraRef) {
                                    let photo =
                                        await cameraRef.takePictureAsync();
                                    Toast.show(
                                        `Добавлено ${counter + 1} фото`,
                                        {
                                            duration: Toast.durations.LONG,
                                        }
                                    );
                                    setCounter((prev) => prev + 1);
                                    if (counter < 7) {
                                        ImageManipulator.manipulateAsync(
                                            photo.uri,
                                            [],
                                            {
                                                compress: 0.4,
                                                format: ImageManipulator
                                                    .SaveFormat.JPEG,
                                            }
                                        ).then((newImage) => {
                                            setImages((prev) => {
                                                return prev.concat({...newImage, oldPhoto:false});
                                            });
                                            setIsCameraProcessing(false);
                                        });
                                    } else
                                        Toast.show(
                                            `Больше добавить нельзя 😊, можете удалить предыдущие`,
                                            {
                                                duration: Toast.durations.LONG,
                                            }
                                        );
                                }
                            }}
                        >
                            <View
                                style={{
                                    borderWidth: 2,
                                    borderRadius: 70,
                                    borderColor: "white",
                                    height: 70,
                                    width: 70,
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <View
                                    style={{
                                        borderWidth: 2,
                                        borderRadius: 70,
                                        borderColor: "white",
                                        height: 55,
                                        width: 55,
                                        backgroundColor: "white",
                                    }}
                                ></View>
                            </View>
                        </TouchableOpacity>
                    ) : (
                        <View style={{ alignSelf: "center" }}>
                            <Spinner size="small" status="primary" />
                        </View>
                    )}
                </View>
            </Camera>
        </View>
    );
};
