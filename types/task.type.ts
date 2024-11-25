

export type status_badge = 'Completed' | 'Pending' | 'In Progress' | 'All';


export type task = {
    id: string;
    title: string;
    description: string;
    status: status_badge;
    due_date: string;
    close: boolean;
}





export type editTask = {
    item: task;
    index: number
}