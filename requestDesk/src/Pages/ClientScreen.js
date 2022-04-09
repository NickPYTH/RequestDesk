import {Avatar, Button} from "@ui-kitten/components";
import {StyleSheet, TouchableOpacity, View} from "react-native";
import { RequestCard } from "../Components/RequestCard";
import {useNavigationState} from "@react-navigation/native";
import logoutImg from "../../assets/logout.png";
import * as React from "react";
import {bindActionCreators} from "redux";
import {fetchGetClientTasks, logout} from "../store/actions";
import {connect} from "react-redux";
import {useEffect} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

const ClientScreenLayout = ({ info, navigation, logout, fetchGetClientTasks }) => {
    //const index = useNavigationState(state => state.index);
    console.log(info)
    useEffect(()=>{
        fetchGetClientTasks(info.userInfo)
    }, [])
    navigation.setOptions(
        {headerRight: () => (
                <TouchableOpacity onPress={() => {
                    logout()
                    navigation.reset({
                        index: 0,
                        routes: [{name: 'Home'}],
                    })
                }}>
                    <Avatar
                        style={{ margin: 8, width: 30, height: 30 }}
                        size="medium"
                        source={logoutImg}
                    />
                </TouchableOpacity>
            ),}
    )
    console.log(info)
  return (
    <View>
        {info.clientTasks && info.clientTasks.map((task)=>{
            return(
                <RequestCard key={task.id} title={task.title} description={task.description} navigation={navigation} />
            )
        })}

        {info.isTasksLoading && (<Button
            style={styles.button}
            appearance="outline"
            status="warning"
            onPress={() => navigation.push("CreateRequest")}
        >Lol</Button>)}

      <Button
        style={styles.button}
        appearance="outline"
        status="warning"
        onPress={() => navigation.push("CreateRequest")}
      >
        Создать заявку
      </Button>
    </View>
  );
};

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            logout,
            fetchGetClientTasks
        },
        dispatch
    );

const mapStateToProps = (state) => {
    const info = state.reducer;
    return { info };
};

export const ClientScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(ClientScreenLayout);

const styles = StyleSheet.create({
  button: {
    marginVertical: 15,
    marginHorizontal: "28%",
  },
});
