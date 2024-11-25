import { StyleSheet, TouchableOpacity } from 'react-native';

import { ThemedText as Text } from '@/components/ThemedText';
import { status_badge } from '@/types/task.type';
import { category } from '@/types/category.type';



// --------------------------- categoryComponent
const CategoryCard = ({
    item,
    AddFilter,
    filter
}: {
    item: category;
    AddFilter: (val: status_badge) => void,
    filter: status_badge[]
}) => {
    return (
        <TouchableOpacity
            testID="category-card"
            onPress={() => AddFilter(item.title)}
            activeOpacity={.5}
            style={{
                ...categoryStyle.container,
                backgroundColor: filter.includes(item.title) ? '#f7ee22' : 'white'
            }}
        >
            <Text style={{ fontSize: 12 }}>{item.icon}</Text>
            <Text style={{ fontSize: 12 }}>{item.title}</Text>
        </TouchableOpacity>
    )
}

const categoryStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        marginTop: 10,
        marginHorizontal: 5,
        paddingHorizontal: 10,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 6,
        flexDirection: 'row',
        gap: 4,
    }
})


export default CategoryCard;