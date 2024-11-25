
import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { status_badge, task } from '@/types/task.type';


const Card = ({
    type,
    getIndex,
    EditATask,
    item,
    drag
}: {
    type: status_badge;
    getIndex: () => number | undefined;
    EditATask: ({ item, index }: { item: task, index: number }, type: status_badge) => void;
    item: task;
    drag: () => void
}) => {
    return (
        <TouchableOpacity
            testID="card-touchable"
            key={String(type + '-' + getIndex())}
            style={{
                alignItems: "center",
                justifyContent: "center",
            }}
            onPress={() => EditATask({ item, index: getIndex()! }, type)}
            onLongPress={drag}
        >
            <View style={{
                ...cardStyles.container,
                backgroundColor: new Date(item.due_date.replace(/\//g, "-")) < new Date() ? '#de6259' : 'white'
            }}>
                <Text>{item.title}</Text>
                <Text numberOfLines={1}>{item.description}</Text>
            </View>
        </TouchableOpacity>
    )
}


const cardStyles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        backgroundColor: 'white',
        borderRadius: 6,
        marginTop: 10,
        paddingVertical: 10,
        width: '100%'
    },
    header: {
        width: '100%',
        backgroundColor: '#D6D6D6',
        height: 45,
        borderRadius: 6,
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 10
    }
});


export default Card;