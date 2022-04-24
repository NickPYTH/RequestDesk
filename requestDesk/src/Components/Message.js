import {View, StyleSheet} from 'react-native'
import {Text} from "@ui-kitten/components";


export const Message = ({text}) => {
    return (
        <View style={styles.wrapper}>
            <Text>
                ddd
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        marginHorizontal: 20,
        marginVertical: 20,
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