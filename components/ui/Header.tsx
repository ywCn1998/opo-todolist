import { StyleSheet, View } from 'react-native';
import { ThemedText as Text } from '@/components/ThemedText';





// --------------------------- headerComponent
const Header = () => {
    return (
        <View style={headerStyle.container}>
            <Text type='subtitle' style={{ fontSize: 16, color: 'white' }}>Task App</Text>
        </View>
    )
}

const headerStyle = StyleSheet.create({
    container: {
        height: 65,
        width: '100%',
        backgroundColor: '#004e7b',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 20,
        gap: 8,
        zIndex: -100
    },
})



export default Header;