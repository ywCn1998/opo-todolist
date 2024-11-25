import { View, TouchableOpacity } from 'react-native';

import { ThemedText as Text } from '@/components/ThemedText';
import { Ionicons } from '@expo/vector-icons';
import Modal from 'react-native-modalbox';
import { useDispatch } from 'react-redux';
import { editTask as editTaskType, status_badge, task } from '@/types/task.type';
import { useForm, FormProvider } from 'react-hook-form';
import { addTask, editTask, removeTask } from '@/redux/store/tasks';
import InputForm from '../form/TextInput';
import SelectForm from '../form/SelectInput';
import { useEffect } from 'react';
import DatePickerForm from '../form/DatePickerInput';
import * as Yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";

// title: editItem?.item?.title || '',
// description: editItem?.item?.description || '',
// status: type,
// close: editItem?.item?.close || false,
// due_date: ''

const TaskFormSchema = Yup.object().shape({
    id: Yup.string(),
    title: Yup.string()
        .required("Title is required"),
    description: Yup.string()
        .required("Description is required"),
    status: Yup.string()
        .required("Status is required"),
    due_date: Yup.string()
        .required("Due date is required"),
    close: Yup.boolean(),
});

// --------------------------- modalComponent
const ModalComponent = ({
    open,
    setClose,
    editMode,
    setEditItem,
    editItem,
    type
}: {
    open: boolean;
    setClose: Function;
    editMode: boolean;
    setEditItem: (val?: editTaskType) => void;
    editItem?: editTaskType | null;
    type: status_badge
}) => {
    const dispatch = useDispatch()

    const methods = useForm<task>({
        defaultValues: {
            id: editItem?.item?.id || '',
            title: editItem?.item?.title || '',
            description: editItem?.item?.description || '',
            status: type,
            close: editItem?.item?.close || false,
            due_date: '',
        },
        resolver: yupResolver(TaskFormSchema),
    });


    const { control, handleSubmit, watch, setValue,
        reset,
        formState: { errors, isSubmitting },

    } = methods;


    useEffect(() => {
        setValue('status', type);
        if (editItem) {
            setValue('id', editItem.item.id);
            setValue('title', editItem.item.title);
            setValue('description', editItem.item.description);
            setValue('close', editItem.item.close);
            setValue('status', type);
            setValue('due_date', editItem.item.due_date);
        }
    }, [editItem, type])


    const onSubmit = (data: task) => {
        if (editMode && editItem) {
            dispatch(
                editTask({ task: { ...data, id: editItem.item.id }, index: editItem.index, type: type })
            )
        } else {
            dispatch(
                addTask({ type: data.status, task: { ...data, id: new Date().toLocaleString() } })
            )
        }
        onClose();

    };


    const onClose = () => {
        setEditItem();
        reset(); // Clear form after submission
        setClose(false);
    }

    const DeleteTask = () => {
        if (editMode && editItem) {
            dispatch(
                removeTask({ index: editItem.index, type: type })
            )
            onClose();
        }
    }



    return (
        <Modal
            coverScreen
            isOpen={open}
            onClosed={() => onClose()}
            position='top'
            style={{
                height: 'auto', width: '90%',
                borderRadius: 6, marginTop: 100,
                paddingVertical: 26,
                paddingHorizontal: 22,
            }}
            swipeToClose={false}
        >
            <FormProvider {...methods}>
                <View style={{ height: 'auto' }}>
                    <View
                        style={{
                            flexDirection: 'row', alignItems: 'center',
                            justifyContent: 'space-between',
                            borderBottomWidth: 1,
                            borderBottomColor: '#C5C5C5',
                            paddingBottom: 5,
                            marginBottom: 5
                        }}
                    >
                        <Text type='title' style={{ fontSize: 20 }}>Add New Task</Text>
                        <Ionicons
                            onPress={() => onClose()}
                            name='close' size={24} color={'#7B7B7B'} />
                    </View>

                    <InputForm name='title' title='Title' placeHolder='Example: Reading book' />
                    <DatePickerForm name='due_date' title='Due Date' placeHolder='Example: 2024/09/12' />

                    <SelectForm name='status' title='Status' placeHolder='Completed' />
                    <InputForm name='description' title='Description' placeHolder='Example: Reading One Book ' />


                    <TouchableOpacity
                        onPress={handleSubmit(onSubmit)}
                        style={{
                            height: 40,
                            width: '100%', backgroundColor: '#2B3272',
                            borderRadius: 6,
                            marginTop: 15,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                        <Text type='title' style={{ fontSize: 14, color: 'white' }}>Submit</Text>
                    </TouchableOpacity>

                    {editMode &&
                        <TouchableOpacity
                            onPress={() => DeleteTask()}
                            style={{
                                height: 40,
                                width: '100%', backgroundColor: '#AD2929',
                                borderRadius: 6,
                                marginTop: 15,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                            <Text type='title' style={{ fontSize: 14, color: 'white' }}>Delete</Text>
                        </TouchableOpacity>
                    }

                </View>
            </FormProvider>
        </Modal >
    )
}



export default ModalComponent;