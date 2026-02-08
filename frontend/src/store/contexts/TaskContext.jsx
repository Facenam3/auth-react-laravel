import { createContext, useReducer } from "react";
import * as api from "../../api/tasks";
import csrf from "../../api/csrf";

const TaskContext = createContext({
    tasks: [],
    loading: false,
    errors: null,
    fetchTasks: () => {},
    fetchOpenTasks: () => {},
    getByStatus: () => {},
    updateTask: () => {},
    deleteTask: () => {},
});

const initialState = {
    tasks: {
        data: [],
        currentPage: 1,
        lastPage: 1,
    },
    loading: false,
    errors: null,
};

function taskReducer(state, action) {
    switch (action.type) {
        case "SET_LOADING":
            return {
                ...state,
                loading: true,
            };
        case "SET_LOADING_DONE":
            return {
                ...state,
                loading: false,
            };
        case "SET_ERROR":
            return {
                ...state,
                loading: false,
                errors: action.payload,
            };
        case "SET_TASKS":
            return {
                ...state,
                tasks: {
                    data: action.payload.tasks ?? [],
                    currentPage: action.payload.current_page ?? 1,
                    lastPage: action.payload.last_page ?? 1,
                },
                loading: false,
                errors: null,
            };
        case "UPDATE":
            const idx = state.tasks.findIndex(task => task.id === action.payload.id);
            if(idx === -1) return state;
            const updatedTasks = [...state.tasks];
            updatedTasks[idx] = {...updatedTasks[idx], ...action.payload.id};
            return {
                ...state,
                tasks: updatedTasks,
                loading: false,
                errors: null,
            };
        case "DELETE" :
            return {
                ...state,
                tasks: state.tasks.filter(t => t.id !== action.payload.id),
                loading: false,
                errors: null,
            };
        case "CLEAR_ERRORS":
            return {
                ...state,
                errors: null,
            };
    
        default:
            return state;
    }
}

export function TaskContextProvider({children}) {
    const [task, dispatchTaskAction] = useReducer(taskReducer, initialState);

    const fetchTasks = async (page = 1) => {
        dispatchTaskAction({ type: "SET_LOADING"});

        try {
            const res = await api.getTasks(page);

            dispatchTaskAction({
                type: "SET_TASKS",
                payload: res.data,
            });

            return { success: true };
        } catch (e) {
            const message = 
            e.response?.data?.message ||
            "Failed to fetch tasks.";

            dispatchTaskAction({
                type: "SET_ERROR",
                payload: message,
            });

            return { success: false , message: message };
        }
    }

    const fetchOpenTasks = async (page = 1) => {
        dispatchTaskAction({
            type: "SET_LOADING",
        });

        try {
            const res = await api.getOpenTasks(page);

            dispatchTaskAction({
                type: "SET_TASKS",
                payload: res.data,
            });

            dispatchTaskAction({
                type: "SET_LOADING_DONE",
            });

            return {success: true};

        } catch (e) {
             const message = 
            e.response?.data?.message ||
            "Failed to fetch tasks.";

            dispatchTaskAction({
                type: "SET_ERROR",
                payload: message,
            });

            return { success: false , message: message };
        }
    }

    const createTask = async (data) => {
        dispatchTaskAction({
            type: "SET_LOADING",
        });

        try {
            await csrf();
            const res = await api.store(data);

            dispatchTaskAction({
                type: "SET_LOADING_DONE",
            });
            dispatchTaskAction({
                type: "CLEAR_ERRORS",
            });

            return {
                success: true,
                tasks: res.data.tasks,
            }
        } catch (e) {
            const message = 
            e.response?.data?.message ||
            "Failed to create task.";

            dispatchTaskAction({
                type: "SET_ERROR",
                payload: message,
            });

            dispatchTaskAction({
                type: "SET_LOADING_DONE",
            });

            return { success: false, message: message };
        }
    }

    const updateTask = async (id, data) => {
        dispatchTaskAction({
            type: "SET_LOADING",
        });

        try {
            await csrf();
            const res = await api.updateTask(id, data);

            dispatchTaskAction({
                type: "UPDATE",
                payload: res.data,
            });
            dispatchTaskAction({
                type: "SET_LOADING_DONE",
            });

            return {
                success: true,
                task: res.data.task,
            };
        } catch (e) {
            const message = 
            e.response?.data?.message ||
            "Failed to update task.";

            dispatchTaskAction({
                type: "SET_ERROR",
                payload: message,
            });

            dispatchTaskAction({
                type: "SET_LOADING_DONE",
            });

            return { success: false, message: message };
        }
    }

    const deleteTask = async (id) => {
        dispatchTaskAction({
            type: "SET_LOADING",
        });

        try {
            await csrf();
            await api.deleteTask(id);

            dispatchTaskAction({
                type: "DELETE",
                payload: id,
            });

            return { success: true };
        } catch (e) {
            const message = 
            e.response?.data?.message ||
            "Failed to delete task.";
            
            dispatchTaskAction({
                type: "SET_ERROR",
                payload: message,
            });

            return { success: false };
        }
    }

    const taskContext = {
        ...task,
        fetchTasks,
        fetchOpenTasks,
        createTask,
        updateTask,
        deleteTask,
    };

    return (
        <TaskContext.Provider value={taskContext}>
            {children}
        </TaskContext.Provider>
    );
}

export default TaskContext;