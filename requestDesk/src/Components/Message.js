import {View, StyleSheet} from 'react-native'
import {Text} from "@ui-kitten/components";


export const Message = ({text, date, yours}) => {
    return (
        <View style={styles.wrapper}>
            <Text>
                {text}
            </Text>
            <View style={{marginTop: 10, flex: 1, alignItems: 'flex-end'}}>
                <Text category='label'>
                    Отправлено {!yours ? "вами" : "вам"} в {date}
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        marginHorizontal: 20,
        marginVertical: 10,
        padding: 15,
        borderRadius: 5,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2},
        shadowRadius: 10,
        elevation: 5,
        backgroundColor: 'white'
    }
})