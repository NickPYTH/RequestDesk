import { View } from "react-native";
import { StyleSheet } from "react-native";
import {
    Button,
    Card,
    Input,
    Layout,
    Spinner,
    Text,
} from "@ui-kitten/components";
import { useEffect, useState } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { fetchLogin } from "../store/actions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {BACKGROUND_COLOR} from "../themes";

const LoadingIndicator = (props) => (
    <View style={[props.style, styles.indicator]}>
        <Spinner size="small" status="primary" />
    </View>
);

const useInputState = (initialValue = "") => {
    const [value, setValue] = useState(initialValue);
    return { value, onChangeText: setValue };
};

const EnterScreenLayout = ({ navigation, info, fetchLogin }) => {
    useEffect(() => {
        AsyncStorage.getItem("password").then((password) => {
            AsyncStorage.getItem("username").then((username) => {
                if (username && password)
                    fetchLogin(username, password)
                else
                    AsyncStorage.clear()
            });
        });
    }, []);

    const loginState = useInputState();
    const passwordState = useInputState();
    const loginHandler = () => {
        if (loginState.value.trim() && passwordState.value.trim())
            fetchLogin(loginState.value.trim(), passwordState.value.trim())
    };
    if (info.isClient && info.userInfo)
        navigation.reset({
            index: 0,
            routes: [{ name: "ClientHome" }],
        });
    else if (info.isExecutor && info.userInfo)
        navigation.reset({
            index: 0,
            routes: [{ name: "ExecutorHome" }],
        });
    return (
        <Layout
            style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: BACKGROUND_COLOR }}
        >
            <Card style={{ width: "90%", elevation: 5 }}>
                <Input
                    style={{ marginBottom: 15, paddingTop: 10 }}
                    status="primary"
                    placeholder="Логин"
                    {...loginState}
                />
                <Input
                    style={{ marginBottom: 15 }}
                    status="primary"
                    placeholder="Пароль"
                    {...passwordState}
                />
                <Button
                    style={styles.button}
                    status="primary"
                    appearance="outline"
                    accessoryLeft={
                        info.isLoginLoading ? <LoadingIndicator /> : null
                    }
                    disabled={info.isLoginLoading}
                    onPress={() => loginHandler()}
                >
                    Войти
                </Button>
                <Text style={{position: 'absolute', bottom: 0, right: 0, margin: 5, fontSize: 10, opacity: 0.5}}>v1.0.13</Text>
            </Card>
        </Layout>
    );
};

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            fetchLogin,
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
        flexDirection: "row",
        flexWrap: "wrap",
    },
    button: {
        marginHorizontal: "30%",
        marginBottom: 10,
    },
    indicator: {
        justifyContent: "center",
        alignItems: "center",
    },
});
