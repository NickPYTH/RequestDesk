import {Text, View, StyleSheet, TouchableOpacity} from "react-native";
import {MAIN_COLOR} from "../themes";
import plus from "../../assets/plus.png";
import {Avatar} from "@ui-kitten/components";

export const AddRequestButton = ({fun}) => {
    return (
        <View style={styles.addButtonWrapper}>
            <TouchableOpacity style={styles.addButton} onPress={()=>fun()}>
                <Avatar
                    style={{ margin: 8, width: 22, height: 22 }}
                    size="medium"
                    source={plus}
                />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    addButtonWrapper: {
        width: 80,
        height: 80,
        padding: 10,
        position: 'absolute',
        right: "8%",
        bottom: "7%"
    },
    addButton: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 60,
        height: 60,
        elevation: 9,
        borderRadius: 30,
        backgroundColor: MAIN_COLOR,
    }
})