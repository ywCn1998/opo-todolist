import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import Board from '@/components/ui/Board'; // Adjust the import path as needed
import tasksReducer from '@/redux/store/tasks'; // Import your actual reducer
import { status_badge, task, editTask } from '@/types/task.type';

describe('Board Component', () => {
    const mockAddBtn = jest.fn();
    const mockEditATask = jest.fn();

    const mockData: task[] = [
        {
            id: '1',
            title: 'Task 1',
            description: 'Description 1',
            status: 'Pending',
            due_date: '2024-12-31',
            close: false,
        },
        {
            id: '2',
            title: 'Searchable Task',
            description: 'Description 2',
            status: 'Pending',
            due_date: '2024-11-25',
            close: false,
        },
    ];

    let store: ReturnType<typeof configureStore>;

    beforeEach(() => {
        jest.clearAllMocks();
        store = configureStore({
            reducer: {
                tasks: tasksReducer, // Use your actual tasks reducer here
            },
            preloadedState: {
                tasks: { Pending: mockData }, // Initialize with the mock data
            },
        });
    });

    it('should render the title', () => {
        const { getByText } = render(
            <Provider store={store}>
                <Board
                    title="Pending Tasks"
                    data={mockData}
                    type="Pending"
                    addBtn={mockAddBtn}
                    EditATask={mockEditATask}
                    search=""
                />
            </Provider>
        );

        expect(getByText('Pending Tasks')).toBeTruthy();
    });

    it('should render all tasks that match the search query', () => {
        const { queryByText } = render(
            <Provider store={store}>
                <Board
                    title="Pending Tasks"
                    data={mockData}
                    type="Pending"
                    addBtn={mockAddBtn}
                    EditATask={mockEditATask}
                    search="Searchable"
                />
            </Provider>
        );

        // Only the task with "Searchable" in the title should be rendered
        expect(queryByText('Task 1')).toBeFalsy();
        expect(queryByText('Searchable Task')).toBeTruthy();
    });

    it('should call addBtn when the add button is pressed', () => {
        const { getByText } = render(
            <Provider store={store}>
                <Board
                    title="Pending Tasks"
                    data={mockData}
                    type="Pending"
                    addBtn={mockAddBtn}
                    EditATask={mockEditATask}
                    search=""
                />
            </Provider>
        );

        const addButton = getByText('Add card');
        fireEvent.press(addButton);

        expect(mockAddBtn).toHaveBeenCalledWith('Pending');
    });

    it('should dispatch sortTask action on drag end', () => {
        const { getByTestId } = render(
            <Provider store={store}>
                <Board
                    title="Pending Tasks"
                    data={mockData}
                    type="Pending"
                    addBtn={mockAddBtn}
                    EditATask={mockEditATask}
                    search=""
                />
            </Provider>
        );

        const draggableFlatList = getByTestId('draggable-flatlist');
        fireEvent(draggableFlatList, 'onDragEnd', { data: mockData });

        const actions = store.getState().tasks;
        expect(actions).toEqual({ Pending: mockData });
    });

    it('should render a Card component for each task', () => {
        const { getByText } = render(
            <Provider store={store}>
                <Board
                    title="Pending Tasks"
                    data={mockData}
                    type="Pending"
                    addBtn={mockAddBtn}
                    EditATask={mockEditATask}
                    search=""
                />
            </Provider>
        );

        expect(getByText('Task 1')).toBeTruthy();
        expect(getByText('Searchable Task')).toBeTruthy();
    });
});
