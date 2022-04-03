import {View, SafeAreaView, ScrollView} from "react-native";
import {StyleSheet} from "react-native"
import {Text} from "@ui-kitten/components";
import {useState} from "react";
import {RequestCard} from "../Components/RequestCard";


export const ExecutorScreen = ({navigation}) => {
    const [requests, setRequests] = useState([1,2,3])
    return (
            <SafeAreaView style={styles.container}>
                <ScrollView  showsVerticalScrollIndicator={false}>
                    {requests.length===0 ?
                        (<Text category={'h3'}>Пусто</Text>)
                            :
                            requests.map((request, id)=>{
                                return(<RequestCard navigation={navigation} key={id}/>)
                            })
                    }
                </ScrollView>
            </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});