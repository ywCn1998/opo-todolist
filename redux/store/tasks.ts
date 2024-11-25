import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { status_badge, task } from "@/types/task.type";

export type State_Store_Task = {
    title: status_badge;
    type: status_badge;
    tasks: task[];
};

// Initial state
const initialState: { allTasks: State_Store_Task[] } = {
    allTasks: [
        {
            title: "Pending",
            type: "Pending",
            tasks: []
        },
        {
            title: "In Progress",
            type: "In Progress",
            tasks: []
        },
        {
            title: "Completed",
            type: "Completed",
            tasks: []
        }
    ]
};

const taskSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        // Add a task to the specified type
        addTask: (state, action: PayloadAction<{ type: status_badge; task: task }>) => {
            const { type, task } = action.payload;
            const category = state.allTasks.find((item) => item.type === type);
            console.log('categ hast')

            if (category) {
                category.tasks.push(task);
            }
        },
        // Remove a task by index from a specific type
        removeTask: (state, action: PayloadAction<{ type: status_badge; index: number }>) => {
            const { type, index } = action.payload;
            const category = state.allTasks.find((item) => item.type === type);
            if (category && index >= 0 && index < category.tasks.length) {
                category.tasks.splice(index, 1);
            }
        },
        // Edit a task by index within a specific type
        editTask: (state, action: PayloadAction<{ type: status_badge; index: number; task: task }>) => {
            const { type, index, task } = action.payload;
            const category = state.allTasks.find((item) => item.type === type);

            if (type === task.status) {
                if (category && index >= 0 && index < category.tasks.length) {
                    category.tasks[index] = task;
                }
            } else {
                if (category) {
                    category.tasks.splice(index, 1);
                    const newCategory = state.allTasks.find((item) => item.type === task.status);
                    if (newCategory)
                        newCategory.tasks.push(task);
                }
            }




        },
        // Reset all tasks for a specific type or all types
        resetTasks: (state, action: PayloadAction<{ type?: status_badge }>) => {
            const { type } = action.payload;
            if (type) {
                const category = state.allTasks.find((item) => item.type === type);
                if (category) {
                    category.tasks = [];
                }
            } else {
                // Reset all tasks for all types
                state.allTasks.forEach((item) => {
                    item.tasks = [];
                });
            }
        },
        sortTask: (state, action: PayloadAction<{ type: status_badge; tasks: task[] }>) => {
            const { type, tasks } = action.payload;
            const category = state.allTasks.find((item) => item.type === type);


            if (category) {
                category.tasks = tasks;
            }
        },
    }
});

// Export actions and reducer
export const { addTask, removeTask, editTask, resetTasks, sortTask } = taskSlice.actions;
export default taskSlice.reducer;
