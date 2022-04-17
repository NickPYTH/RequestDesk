import {View} from "react-native";
import {StyleSheet} from "react-native"
import {Button, Card, Input, Layout, Spinner, Text} from "@ui-kitten/components";
import {useEffect, useState} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {fetchLogin} from "../store/actions";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
    useEffect(()=>{
        fetchLogin('123456782', 'Kolia27062000')
        AsyncStorage.getItem('password').then(password=>{
            AsyncStorage.getItem('phone').then(phone=>{
                fetchLogin(phone, password)
            })
        })
    },[])
    const loginState = useInputState()
    const passwordState = useInputState()
    const loginHandler = () => {
        fetchLogin(loginState.value, passwordState.value)
        AsyncStorage.setItem(passwordState.value)
    }
    if (info.isClient && info.userInfo)
        navigation.reset({
            index: 0,
            routes: [{ name: 'ClientHome' }],
        })
    else if (info.isExecutor && info.userInfo)
        navigation.reset({
            index: 0,
            routes: [{ name: 'ExecutorHome' }],
        })
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