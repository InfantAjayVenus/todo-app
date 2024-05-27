import { Task } from "../types/TaskTypes";

const apiUrl = import.meta.env.VITE_API_URL;

export async function getAllTasks() {
    const result = await fetch(`${apiUrl}/tasks`);

    return result.json();
}

export async function addTask(taskData: Partial<Task>) {
    const result = await fetch(`${apiUrl}/tasks`, {
        method: "POST",
        headers: {
            "Content-Type": 'application/json',
        },
        body: JSON.stringify(taskData),
    });
    return result.json();
}