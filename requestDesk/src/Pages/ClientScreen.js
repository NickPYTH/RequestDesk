import {View, StyleSheet} from "react-native";
import {Button} from "@ui-kitten/components";

export const ClientScreen = ({navigation}) => {
    return(
        <View>
            <Button style={styles.button} appearance='outline' status='warning' onPress={() => navigation.push('CreateRequest')}>
                Создать заявку
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        marginVertical: 15,
        marginHorizontal: '28%'
    }
})