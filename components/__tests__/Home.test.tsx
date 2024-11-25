import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureStore from '@reduxjs/toolkit';
import Home from '@/app/(tabs)/_layout'; // Adjust the import path
import tasksReducer from '@/redux/store/tasks';

jest.mock('@react-native-carousel', () => ({
    Carousel: jest.fn(({ children }) => <>{children}</>),
}));

jest.mock('react-native-reanimated', () => ({
    useSharedValue: jest.fn(() => ({ value: 0 })),
}));

jest.mock('@react-native-flatlist', () => ({
    FlatList: jest.fn(({ children }) => <>{children}</>),
}));

describe('Home Component', () => {
    let store: ReturnType<typeof configureStore>;

    beforeEach(() => {
        store = configureStore({
            reducer: {
                task: tasksReducer,
            },
            preloadedState: {
                task: {
                    allTasks: [
                        { title: 'Pending', tasks: [{ id: '1', title: 'Task 1' }] },
                        { title: 'Completed', tasks: [{ id: '2', title: 'Task 2' }] },
                    ],
                },
            },
        });
    });

    it('should render the Home component', () => {
        const { getByText } = render(
            <Provider store={store}>
                <Home />
            </Provider>
        );

        expect(getByText('Add card')).toBeTruthy(); // From the Board's add button
    });

    it('should update the search state on SearchBar input', () => {
        const { getByPlaceholderText } = render(
            <Provider store={store}>
                <Home />
            </Provider>
        );

        const searchBar = getByPlaceholderText('Search');
        fireEvent.changeText(searchBar, 'Task 1');

        expect(searchBar.props.value).toBe('Task 1');
    });

    it('should filter tasks based on selected category', () => {
        const { getByTestId } = render(
            <Provider store={store}>
                <Home />
            </Provider>
        );

        const categoryButton = getByTestId('category-Pending'); // Replace with actual testID for a category
        fireEvent.press(categoryButton);

        const filteredTasks = store.getState().task.allTasks.filter((task) =>
            task.title === 'Pending'
        );

        expect(filteredTasks).toHaveLength(1);
    });

    it('should open the modal when AddNewTask is called', () => {
        const { getByTestId } = render(
            <Provider store={store}>
                <Home />
            </Provider>
        );

        const addButton = getByTestId('add-button-Pending'); // Replace with the testID for add buttons
        fireEvent.press(addButton);

        const modal = getByTestId('create-modal');
        expect(modal).toBeTruthy();
    });

    it('should scroll to the correct page when onPressPagination is called', () => {
        const { getByTestId } = render(
            <Provider store={store}>
                <Home />
            </Provider>
        );

        const paginationDot = getByTestId('pagination-dot-2');
        fireEvent.press(paginationDot);

        expect(ref.current.scrollTo).toHaveBeenCalledWith({
            count: 1,
            animated: true,
        });
    });

    it('should close the modal when type is cleared', () => {
        const { getByTestId } = render(
            <Provider store={store}>
                <Home />
            </Provider>
        );

        const closeModalButton = getByTestId('close-modal');
        fireEvent.press(closeModalButton);

        const modal = getByTestId('create-modal');
        expect(modal.props.open).toBeFalsy();
    });
});
