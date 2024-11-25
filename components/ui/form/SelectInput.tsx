import { useState } from 'react';

import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { ThemedText as Text } from '@/components/ThemedText';

import DropDownPicker from 'react-native-dropdown-picker';
import { Controller, useFormContext, FormProvider } from 'react-hook-form';



const status_items = [
    { label: 'Completed', value: 'Completed' },
    { label: 'Pending', value: 'Pending' },
    { label: 'In Progress', value: 'In Progress' },
]

const SelectForm = ({
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
    const [openDrop, setOpen] = useState(false);


    return (
        <View style={{ gap: 2, marginTop: 5 }}>
            <Text style={inputStyle.title} >{title}:</Text>
            <Controller
                name={name}
                control={control}
                defaultValue=""
                // rules={{ required: 'First Name is required' }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center', justifyContent: 'space-between',
                        gap: 5
                    }}>
                        {status_items.map((item, index) =>
                            <TouchableOpacity
                                key={String('select-' + index)}
                                style={{
                                    borderWidth: 1,
                                    flex: 1, height: 30,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: 6,
                                    borderColor: value === item.value ? '#333' : '#C7C7C7',
                                }}
                                onPress={() => onChange(item.value)}
                            >
                                <Text style={{
                                    fontSize: 12,
                                    color: value === item.value ? '#333' : '#C7C7C7',
                                }}>{item.label}</Text>
                            </TouchableOpacity>
                        )

                        }
                    </View>
                )}
            />
            {/* {errors.firstName && <Text style={{ color: 'red' }}>{errors.firstName.message}</Text>} */}

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
        minHeight: 40,
        zIndex: 99
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


export default SelectForm;