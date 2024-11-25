import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { ThemedText as Text } from '@/components/ThemedText';
import { Controller, useFormContext } from 'react-hook-form';
import { useState } from 'react';
import DatePicker from 'react-native-modern-datepicker';




const DatePickerForm = ({
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
    const [show, setShow] = useState(false);

    return (
        <View style={{ gap: 2, marginTop: 5 }}>
            <Text style={inputStyle.title} >{title}:</Text>
            <Controller
                name={name}
                control={control}
                defaultValue=""
                // rules={{ required: 'First Name is required' }}
                render={({ field: { onChange, onBlur, value },
                    fieldState: { error }
                }) => {
                    return (
                        <>
                            <TouchableOpacity
                                onPress={() => setShow(true)}
                                style={inputStyle.input}
                            >
                                <Text
                                    style={value ? inputStyle.value : inputStyle.placeHolder}
                                >{value ? value : placeHolder}</Text>
                            </TouchableOpacity>
                            {show &&
                                <DatePicker
                                    mode="calendar"
                                    current={value}
                                    onDateChange={(val) => {
                                        onChange(val);
                                        setShow(false);
                                    }}
                                    selected={value}
                                    options={{
                                        textHeaderColor: '#333',
                                        textDefaultColor: '#000',
                                        selectedTextColor: '#FFF',
                                        mainColor: '#333',
                                        textSecondaryColor: '#B5B5B5',
                                    }}
                                />
                            }

                            {error?.message && <Text style={{ color: 'red', fontSize: 10 }}>{error.message}</Text>}

                        </>
                    )
                }}
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
        alignItems: 'center',
        flexDirection: 'row',
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
    value: {
        fontSize: 12
    },
    placeHolder: {
        fontSize: 12,
        color: '#C7C7CD'
    }

})


export default DatePickerForm;



// const DatePickModal = ({
//     show
// }: {
//     show: boolean
// }) => {
//     return (
//         <Modal
//             isOpen={show}
//             position='bottom'
//         >
//             <Text>Hii</Text>
//             {/* <DateTimePicker
//                 value={value}
//                 mode="date" // Use 'time' or 'datetime' for other picker types
//                 display={'spinner'}
//                 onChange={(event: any, selectedDate?: Date) => {
//                     const currentDate = selectedDate || new Date;
//                     // setShow(false); // Keep picker open only on iOS
//                     onChange(currentDate);
//                 }}
//                 style={{
//                     height: 50, minHeight: 50,
//                     maxHeight: 50,
//                     width: '100%',
//                     minWidth: '100%',
//                     maxWidth: '100%',
//                 }}

//             /> */}
//         </Modal>
//     )
// }