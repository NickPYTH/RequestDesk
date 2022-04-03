import {Card, Text} from "@ui-kitten/components";
import {StyleSheet} from "react-native";
import {TouchableOpacity} from "react-native";

export const RequestCard = ({navigation}) => {
    return(
        <Card style={styles.card} status='warning'>
            <TouchableOpacity onPress={() => navigation.push('Request', {requestId: 123})}>
                <Text category='h6'>Тема заявки</Text>
                <Text>Описание заявки</Text>
            </TouchableOpacity>
        </Card>
    )
}

const styles = StyleSheet.create({
    card: {
        marginVertical: 10,
        marginHorizontal: 20,
    },
});