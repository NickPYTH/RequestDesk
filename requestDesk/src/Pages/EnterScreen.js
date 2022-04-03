import {View} from "react-native";
import {StyleSheet} from "react-native"
import {Button, Card, Input, Layout, Spinner, Text} from "@ui-kitten/components";
import {useState} from "react";

const LoadingIndicator = (props) => (
    <View style={[props.style, styles.indicator]}>
        <Spinner size='small' status='warning'/>
    </View>
);

const useInputState = (initialValue = '') => {
    const [value, setValue] = useState(initialValue);
    return { value, onChangeText: setValue };
};

export const EnterScreen = () => {
    const warningInputState = useInputState();
    return (
        <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Card style={{width: '90%'}}>
                <Input
                    style={{marginBottom: 15}}
                    status='warning'
                    placeholder='Логин'
                    {...warningInputState}
                />
                <Input
                    style={{marginBottom: 15}}
                    status='warning'
                    placeholder='Пароль'
                    {...warningInputState}
                />
                <Button style={styles.button} status='warning' appearance='outline' accessoryLeft={null} disabled={false}>
                    Войти
                </Button>
            </Card>
        </Layout>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    button: {
        marginHorizontal: '30%',
    },
    indicator: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});