import {View, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity} from "react-native";
import {Button, Card, Divider, Modal, Text, Toggle} from "@ui-kitten/components";
import {Carousel} from "../Components/Carousel";
import {useState} from "react";
import * as Clipboard from 'expo-clipboard';

const useToggleState = (initialState = false) => {
    const [checked, setChecked] = useState(initialState);

    const onCheckedChange = (isChecked) => {
        setChecked(isChecked);
    };

    return { checked, onChange: onCheckedChange };
};

export const RequestScreen = ({route, navigation}) => {
    const { requestId, otherParam } = route.params;
    const [visible, setVisible] = useState(false);
    const warningToggleState = useToggleState();
    navigation.setOptions({ title: `Заявка №${requestId}` }) //Объект кто-подал
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView  showsVerticalScrollIndicator={false}>
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
                <Text style={styles.title} category='h5'>Hey! Remember you have to attribute Icongeek26</Text>
                <Text style={styles.description} category='h6'>
                    Select your favorite social network and share our icons with your contacts or friends, if you do not have these social networks copy the link and paste it in the one you use. For more information read the  or download the license.
                    Select your favorite social network and share our icons with your contacts or friends, if you do not have these social networks copy the link and paste it in the one you use. For more information read the  or download the license.
                  </Text>
                <Text  style={styles.obj} category='h6'>Объект: УСС "Факел"</Text>
                <View style={{display: 'flex', flexDirection: 'row', marginTop: 10}}>
                    <Text style={styles.obj} category='h6'>Заказчик: </Text>
                    <Button size='tiny' styles={{margin: 14}} onPress={()=>setVisible(true)}>Иванов И.И.</Button>
                </View>
                <View style={styles.carouselWrapper}>
                    <Carousel/>
                </View>
                <Toggle
                    style={styles.toggle}
                    status='warning'
                    {...warningToggleState}>
                        Отметить как выполненое
                </Toggle>
            </ScrollView>
        </SafeAreaView>
    )
}

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