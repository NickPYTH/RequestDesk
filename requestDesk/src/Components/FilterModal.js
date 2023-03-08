import {
    Button,
    Card,
    Divider,
    IndexPath,
    Input,
    Modal,
    Select,
    SelectGroup,
    SelectItem,
    Text
} from "@ui-kitten/components";
import {Dimensions, View} from 'react-native';
import {useEffect, useState} from "react";
export const FilterModal = (props) => {
    const [objectsOriginal, setObjectsOriginal] = useState(null)
    const [objects, setObjects] = useState(null)
    const [filials, setFilials] = useState(null)
    const [selectedFilial, setSelectedFilial] = useState(null);
    const [selectedObject, setSelectedObject] = useState(null);
    const windowWidth = Dimensions.get('window').width;
    const displayValueFilial = filials ? filials[selectedFilial?.row]:null;
    const displayValueObject = objects ? objects[selectedObject?.row]?.subObject:null;
    useEffect(()=>{
        let filials = []
        let objects = []
        props.originalTasks.forEach((object)=>{
            if (!filials.includes(object.object)) filials.push(object.object)
            if (!objects.find(obj=>obj.subObject===object.subObject)) objects.push({object: object.object, subObject: object.subObject})
        })
        setObjects(objects)
        setObjectsOriginal(objects)
        setFilials(filials)
    }, [])
    useEffect(()=>{
        if (selectedFilial){
            setSelectedObject(null);
            setObjects(objectsOriginal.filter(ob=>ob.object===displayValueFilial))
        }
    }, [selectedFilial])
    const filterHandler = () => {
        if (selectedFilial && !selectedObject) {
            props.setTasks(props.originalTasks.filter(task => task.object === displayValueFilial));
        }
        else if (selectedFilial && selectedObject){
            props.setTasks(props.originalTasks.filter(task => task.object === displayValueFilial && task.subObject === displayValueObject));
        }
        else if (!selectedFilial && selectedObject){
            props.setTasks(props.originalTasks.filter(task => task.subObject === displayValueObject));
        }
    }
    return <Modal visible={props.visible}>
        <Card disabled={true} style={{width: windowWidth*0.9, marginTop: 20}}>
            <Text category={'h5'} style={{marginBottom: 10}}>Фильтр</Text>
            <Select
                value={displayValueFilial}
                placeholder={'По филиалу'}
                style={{marginTop: 10}}
                multiSelect={false}
                selectedIndex={selectedFilial}
                onSelect={index => setSelectedFilial(index)}>
                {filials?.map(filial=>(<SelectItem title={filial}/>))}
            </Select>
            <Select
                value={displayValueObject}
                placeholder={'По объекту'}
                style={{marginVertical: 10}}
                multiSelect={false}
                selectedIndex={selectedObject}
                onSelect={index => setSelectedObject(index)}>
                {objects?.map(obj=>(<SelectItem title={obj.subObject}/>))}
            </Select>
            <Button style={{marginBottom: 10}} onPress={()=>{
                setSelectedObject(null)
                setSelectedFilial(null)
                props.setTasks(props.originalTasks);
            }}>
                Очистить
            </Button>
            <Button style={{marginBottom: 10, marginTop: 30}} onPress={filterHandler}>
                Применить
            </Button>
            <Button onPress={()=>props.setVisible(false)}>
                Закрыть
            </Button>
        </Card>
    </Modal>
}