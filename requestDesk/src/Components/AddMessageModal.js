import {Button, Card, Input, Modal, Text} from "@ui-kitten/components";
import {useState} from "react";
const useInputState = (initialValue = "") => {
    const [value, setValue] = useState(initialValue);
    return { value, onChangeText: setValue };
};
export const AddMessageModal = ({visible, setVisible, sendComment, taskId, toExecutor}) => {
    const messageState = useInputState();
    return(
        <Modal visible={visible}>
            <Card disabled={true} style={{width: 300}}>
                <Text style={{marginBottom: 10}}>Введите ваше сообщение</Text>
                <Input
                    multiline={true}
                    textStyle={{ minHeight: 64 }}
                    style={{ marginBottom: 15, paddingTop: 10 }}
                    status="primary"
                    placeholder="Сообщение"
                    {...messageState}
                />
                <Button style={{marginBottom: 10}} onPress={() => {
                    setVisible(false)
                    sendComment(taskId, messageState.value, toExecutor)
                }}>
                    Отправить
                </Button>
                <Button onPress={() => setVisible(false)}>
                    Закрыть
                </Button>
            </Card>
        </Modal>
    )
}