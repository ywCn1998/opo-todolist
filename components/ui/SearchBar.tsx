import { StyleSheet, View, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';



const SearchBar = ({
  onChange
}: {
  onChange: (val: string) => void
}) => {
  return (
    <View style={searchBarStyle.container}>
      <Ionicons name='search' color={'#A3A3A3'} size={23} />
      <TextInput onChangeText={onChange} autoCapitalize='none' placeholder='Search in tasks...' />
    </View>
  )
}

const searchBarStyle = StyleSheet.create({
  container: {
    height: 43,
    width: '90%',
    alignSelf: 'center',
    // borderWidth: 1,
    // borderColor: '#DDD',
    marginTop: 30,
    borderRadius: 6,
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 10,
    gap: 7,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 6
  }
});




export default SearchBar;