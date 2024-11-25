import { StyleSheet, View, TextInput } from 'react-native';
import { ThemedText as Text } from '@/components/ThemedText';
import { Controller, useFormContext } from 'react-hook-form';




const InputForm = ({
    title,
    placeHolder,
    name
}
    : {
        title: string,
        placeHolder: string,
        name: string
    }) => {
    const { control } = useFormContext<any>();

    return (
        <View style={{ gap: 2, marginTop: 5 }}>
            <Text style={inputStyle.title} >{title}:</Text>
            <Controller
                name={name}
                control={control}
                defaultValue=""
                // rules={{ required: 'First Name is required' }}
                render={({
                    field: { onChange, onBlur, value },
                    fieldState: { error },
                }) => (
                    <>
                        <TextInput onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            style={inputStyle.input} placeholder={placeHolder} />
                        {error?.message && <Text style={{ color: 'red', fontSize: 10 }}>{error.message}</Text>}
                    </>
                )}
            />

        </View>
    )
}

const inputStyle = StyleSheet.create({
    title: {
        fontSize: 12,
        fontWeight: '500'
    },
    input: {
        height: 40,
        width: '100%',
        borderWidth: 1,
        borderColor: '#A3A3A3',
        borderRadius: 6,
        paddingLeft: 10,
        fontSize: 12,

    },
    dropdownStyle: {
        backgroundColor: '#fff',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        height: 40,
        minHeight: 40
    },

    labelStyle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',

    },
    listItemContainerStyle: {
        padding: 10,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,

    },

})


export default InputForm;