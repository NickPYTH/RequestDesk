import React, {useEffect, useState} from 'react';
import {BottomNavigation, BottomNavigationTab, Icon, Text} from '@ui-kitten/components';
import {BACKGROUND_COLOR, MAIN_COLOR} from "../themes";

export const ExecutorMainScreenNavigation = ({setActivePage, tasks}) => {
    const [createdIconClick, isCreatedIconClick] = useState(false)
    const [inWorkIconClick, isInWorkIconClick] = useState(false)
    const [completedIconClick, isCompletedIconClick] = useState(false)
    const CreatedIcon = (props) => (
        <Icon fill={MAIN_COLOR} ref={createdIconRef} {...props} name='checkmark-outline'/>
    );
    const InWorkIcon = (props) => (
        <Icon fill={MAIN_COLOR} ref={inWorkIconRef} {...props} name='clock-outline'/>
    );
    const CompletedIcon = (props) => (
        <Icon fill={MAIN_COLOR} ref={completedIconRef} {...props} name='done-all-outline'/>
    );
    const CreatedTitle = () => {
        return(<Text style={{color: MAIN_COLOR, fontSize: 12}}>Новыеv ({tasks ? tasks.filter(task=>task.status==="Создано").length:0})</Text>)
    }
    const InWorkTitle = () => {
        return(<Text style={{color: MAIN_COLOR, fontSize: 12}}>В работе ({tasks ? tasks.filter(task=>task.status==="В работе").length:0})</Text>)
    }
    const CompletedTitle = () => {
        return(<Text style={{color: MAIN_COLOR, fontSize: 12}}>Выполненые ({tasks ? tasks.filter(task=>task.status==="Выполнено").length:0})</Text>)
    }
    const createdIconRef = React.useRef();
    const inWorkIconRef = React.useRef();
    const completedIconRef = React.useRef();

    const [selectedIndex, setSelectedIndex] = React.useState(0);

    return (
        <BottomNavigation
            indicatorStyle={{backgroundColor: MAIN_COLOR, height: 4}}
            selectedIndex={selectedIndex}
            onSelect={index => {
                setSelectedIndex(index)
                setActivePage(index)
                if (index === 0)
                    isCreatedIconClick(prev=>!prev)
                if (index === 1)
                    isInWorkIconClick(prev=>!prev)
                if (index === 1)
                    isCompletedIconClick(prev=>!prev)
            }}
            status='primary'
            >
            <BottomNavigationTab icon={CreatedIcon} title={CreatedTitle}/>
            <BottomNavigationTab icon={InWorkIcon} title={InWorkTitle}/>
            <BottomNavigationTab icon={CompletedIcon} title={CompletedTitle}/>
        </BottomNavigation>
    );
};