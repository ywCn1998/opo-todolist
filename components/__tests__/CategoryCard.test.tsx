import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { category } from '@/types/category.type';
import { status_badge } from '@/types/task.type';
import CategoryCard from '../ui/cards/CategoryCard';

describe('CategoryCard Component', () => {
    const mockAddFilter = jest.fn();
    const mockCategory: category = {
        title: 'Completed',
        id: 1,
        icon: '✔️'
    };
    const mockFilter: status_badge[] = ['Pending'];

    it('should render the category title and icon', () => {
        const { getByText } = render(
            <CategoryCard
                item={mockCategory}
                AddFilter={mockAddFilter}
                filter={mockFilter}
            />
        );

        // Check that the title is rendered
        expect(getByText('Completed')).toBeTruthy();

        // Check that the icon is rendered
        expect(getByText('✔️')).toBeTruthy();
    });

    it('should apply the correct background color when the category is selected', () => {
        const { getByTestId } = render(
            <CategoryCard
                item={mockCategory}
                AddFilter={mockAddFilter}
                filter={['Completed']} // Category is in the filter list
            />
        );

        const categoryButton = getByTestId('category-card');

        // Check that the background color is yellow when selected
        expect(categoryButton.props.style.backgroundColor).toBe('#f7ee22');
    });

    it('should apply the default background color when the category is not selected', () => {
        const { getByTestId } = render(
            <CategoryCard
                item={mockCategory}
                AddFilter={mockAddFilter}
                filter={mockFilter} // Category is not in the filter list
            />
        );

        const categoryButton = getByTestId('category-card');

        // Check that the background color is white when not selected
        expect(categoryButton.props.style.backgroundColor).toBe('white');
    });

    it('should call AddFilter with the correct category title when pressed', () => {
        const { getByTestId } = render(
            <CategoryCard
                item={mockCategory}
                AddFilter={mockAddFilter}
                filter={mockFilter}
            />
        );

        const categoryButton = getByTestId('category-card');
        fireEvent.press(categoryButton);

        // Check that AddFilter is called with the correct argument
        expect(mockAddFilter).toHaveBeenCalledWith('Completed');
    });
});
