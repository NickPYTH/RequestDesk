import {View} from "react-native";
import {StyleSheet} from "react-native"
import {Button, Card, Input, Layout, Spinner, Text} from "@ui-kitten/components";
import {useState} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {NavigatorLayout} from "../Components/Navigator";
import {fetchLogin} from "../store/actions";

const LoadingIndicator = (props) => (
    <View style={[props.style, styles.indicator]}>
        <Spinner size='small' status='warning'/>
    </View>
);

const useInputState = (initialValue = '') => {
    const [value, setValue] = useState(initialValue);
    return { value, onChangeText: setValue };
};

const EnterScreenLayout = ({navigation, info, fetchLogin}) => {
    const loginState = useInputState()
    const passwordState = useInputState()
    const loginHandler = () => {
        fetchLogin(loginState.value, passwordState.value)
        if (info.isClient)
            navigation.reset({
                index: 0,
                routes: [{ name: 'ClientHome' }],
            })
        else if (info.isExecutor)
            navigation.reset({
                index: 0,
                routes: [{ name: 'ExecutorHome' }],
            })
    }
    console.log(navigation)
    return (
        <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Card style={{width: '90%'}}>
                <Input
                    style={{marginBottom: 15, paddingTop: 10}}
                    status='warning'
                    placeholder='Логин'
                    {...loginState}
                />
                <Input
                    style={{marginBottom: 15}}
                    status='warning'
                    placeholder='Пароль'
                    {...passwordState}
                />
                <Button style={styles.button} status='warning' appearance='outline' accessoryLeft={info.isLoginLoading ? <LoadingIndicator/> : null} disabled={info.isLoginLoading} onPress={()=>loginHandler()}>
                    Войти
                </Button>
            </Card>
        </Layout>
    );
}

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            fetchLogin
        },
        dispatch
    );

const mapStateToProps = (state) => {
    const info = state.reducer;
    return { info };
};

export const EnterScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(EnterScreenLayout);

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    button: {
        marginHorizontal: '30%',
        marginBottom: 10
    },
    indicator: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});