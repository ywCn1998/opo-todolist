
import React, { useCallback } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DraggableFlatList, {
    RenderItemParams,
} from "react-native-draggable-flatlist";
import { useDispatch } from 'react-redux';
import { editTask, status_badge, task } from '@/types/task.type';
import { sortTask } from '@/redux/store/tasks';
import Card from './cards/TaskCard';



// ------------------------- each boardContainer
const Board = ({ title, data, type, search, addBtn, EditATask }:
    {
        title: string,
        data: any[],
        type: status_badge,
        addBtn: (type: status_badge) => void;
        EditATask: (task: editTask, type: status_badge) => void;
        search: string;
    }) => {

    const dispatch = useDispatch();

    const renderItem = useCallback(
        ({ item, getIndex, drag, isActive }: RenderItemParams<task>) => {
            if (item.title.match(search))
                return (
                    <Card
                        type={type}
                        getIndex={getIndex}
                        EditATask={EditATask}
                        item={item}
                        drag={drag}
                    />
                );
        },
        [data, search]
    );




    return (
        <View style={boardStyles.container}>
            <View style={boardStyles.header}>
                <Text style={{ fontWeight: 'bold' }}>{title}</Text>
            </View>

            <View style={boardStyles.cardsContainer}>

                <DraggableFlatList
                    testID="draggable-flatlist"
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => String(item.id + index)}
                    onDragEnd={({ data }) => dispatch(sortTask({ tasks: data, type }))}
                />

            </View>

            <TouchableOpacity
                onPress={() => addBtn(type)}
                style={boardStyles.addBtn}>
                <Ionicons name='add' />
                <Text>Add card</Text>
            </TouchableOpacity>

        </View>
    )
}


const boardStyles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        paddingVertical: 20,
        borderRadius: 6,
        backgroundColor: '#f7eeff',
        width: '90%',
        alignSelf: 'center'
    },
    header: {
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: 5
    },
    cardsContainer: {
        minHeight: 10,
        width: '100%',
    },
    addBtn: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 7,
        marginLeft: 5
    }
})

export default Board;


