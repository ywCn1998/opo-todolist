import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

import { task, status_badge } from '@/types/task.type';
import Card from '../ui/cards/TaskCard';

describe('Card Component', () => {
    const mockGetIndex = jest.fn();
    const mockEditATask = jest.fn();
    const mockDrag = jest.fn();

    const mockTask: task = {
        id: '1',
        title: 'Test Task',
        description: 'This is a test task',
        status: 'Pending',
        due_date: '2024-12-31', // Future date
        close: false
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should render the task title and description', () => {
        const { getByText } = render(
            <Card
                type="Pending"
                getIndex={mockGetIndex}
                EditATask={mockEditATask}
                item={mockTask}
                drag={mockDrag}
            />
        );

        // Check that the title and description are rendered
        expect(getByText('Test Task')).toBeTruthy();
        expect(getByText('This is a test task')).toBeTruthy();
    });

    it('should apply the correct background color for overdue tasks', () => {
        const overdueTask: task = {
            ...mockTask,
            due_date: '2023-01-01' // Past date
        };

        const { getByTestId } = render(
            <Card
                type="Pending"
                getIndex={mockGetIndex}
                EditATask={mockEditATask}
                item={overdueTask}
                drag={mockDrag}
            />
        );

        const container = getByTestId('card-container');
        expect(container.props.style.backgroundColor).toBe('#de6259'); // Overdue color
    });

    it('should apply the default background color for non-overdue tasks', () => {
        const { getByTestId } = render(
            <Card
                type="Pending"
                getIndex={mockGetIndex}
                EditATask={mockEditATask}
                item={mockTask}
                drag={mockDrag}
            />
        );

        const container = getByTestId('card-container');
        expect(container.props.style.backgroundColor).toBe('white'); // Default color
    });

    it('should call EditATask with correct arguments when pressed', () => {
        mockGetIndex.mockReturnValue(0); // Mock index

        const { getByTestId } = render(
            <Card
                type="Pending"
                getIndex={mockGetIndex}
                EditATask={mockEditATask}
                item={mockTask}
                drag={mockDrag}
            />
        );

        const touchable = getByTestId('card-touchable');
        fireEvent.press(touchable);

        expect(mockEditATask).toHaveBeenCalledWith(
            { item: mockTask, index: 0 },
            'Pending'
        );
    });

    it('should call drag function when long-pressed', () => {
        const { getByTestId } = render(
            <Card
                type="Pending"
                getIndex={mockGetIndex}
                EditATask={mockEditATask}
                item={mockTask}
                drag={mockDrag}
            />
        );

        const touchable = getByTestId('card-touchable');
        fireEvent(touchable, 'onLongPress');

        expect(mockDrag).toHaveBeenCalled();
    });
});
