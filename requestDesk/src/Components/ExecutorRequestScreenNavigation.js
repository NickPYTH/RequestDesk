import React, {useEffect, useState} from 'react';
import {BottomNavigation, BottomNavigationTab, Icon, Text} from '@ui-kitten/components';
import {BACKGROUND_COLOR, MAIN_COLOR} from "../themes";

export const ExecutorRequestScreenNavigation = ({setActivePage}) => {
    const [taskClick, isTaskClick] = useState(false)
    const [CommentsClick, isCommentsClick] = useState(false)
    const PersonIcon = (props) => (
        <Icon fill={MAIN_COLOR} ref={taskIconRef} {...props} name='info-outline'/>
    );
    const TaskText = () => {
        return(<Text style={{color: MAIN_COLOR, fontSize: 12}}>Заявка</Text>)
    }
    const CommentIcon = (props) => (
        <Icon fill={MAIN_COLOR} ref={commentIconRef} {...props} name='message-square-outline'/>
    );
    const CommentText = () => {
        return(<Text style={{color: MAIN_COLOR, fontSize: 12}}>Комментарии</Text>)
    }
    const taskIconRef = React.useRef();
    const commentIconRef = React.useRef();
    useEffect(()=>taskIconRef.current.startAnimation(), [taskClick])
    useEffect(()=>commentIconRef.current.startAnimation(), [CommentsClick])

    const [selectedIndex, setSelectedIndex] = React.useState(0);

    return (
        <BottomNavigation
            indicatorStyle={{backgroundColor: MAIN_COLOR, height: 4}}
            selectedIndex={selectedIndex}
            onSelect={index => {
                setSelectedIndex(index)
                setActivePage(index)
                if (index === 0)
                    isTaskClick(prev=>!prev)
                if (index === 1)
                    isCommentsClick(prev=>!prev)
            }}
            status='primary'
            >
            <BottomNavigationTab icon={PersonIcon} title={TaskText}/>
            <BottomNavigationTab icon={CommentIcon} title={CommentText}/>
        </BottomNavigation>
    );
};