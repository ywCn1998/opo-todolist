import { StyleSheet, View } from 'react-native';

import { ThemedText as Text } from '@/components/ThemedText';
import { status_badge } from '@/types/task.type';




const Badge = (
    { status }:
        { status: status_badge }) => {

    const returnBGColor = (status: status_badge) =>
        status === 'Completed' ? '#81EBC7' :
            status === 'Expired' ? '#FF7D7D' :
                status === 'In Progress' ? '#FFE991' :
                    '#DADADA'

    const returnBorderColor = (status: status_badge) =>
        status === 'Completed' ? '#21DB9D' :
            status === 'Expired' ? '#CB0C0C' :
                status === 'In Progress' ? '#F8C700' :
                    '#7B7B7B'



    return (
        <View style={{
            ...badgeStyle.container,
            backgroundColor: returnBGColor(status),
            borderColor: returnBorderColor(status)
        }} >
            <Text style={{ fontSize: 9, color: '#333' }}>{status}</Text>
        </View>
    )
}

const badgeStyle = StyleSheet.create({
    container: {
        paddingHorizontal: 7,
        borderWidth: 1,
        borderRadius: 3
    }
})


export default Badge;