import { createContext, useReducer } from "react";
import * as api from "../../api/tasks";

const TaskContext = createContext({
    tasks: [],
    loading: false,
    errors: null,
    fetchTasks: () => {},
    fetchOpenTasks: () => {},
    getByStatus: () => {},
    assignTask: () => {},
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
        case "TASK_UPDATE": 
            {
                const updated = action.payload;
                return {
                    ...state,
                    tasks: {
                    ...state.tasks,
                    data: Array.isArray(state.tasks?.data)
                        ? state.tasks.data.map(t => (t.id === updated.id ? updated : t))
                        : [updated], 
                    },
                    loading: false,
                    errors: null,
                };
            }
        case "TASK_DELETE" :
            return {
                ...state,
                tasks: {
                    ...state.tasks,
                    data: state.tasks.data.filter(
                        task => task.id !== action.payload
                    ),
                },
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

    const fetchTasks = async (arg = {}, maybeSearch) => {
        let page = 1;
        let search = "";

        if(typeof arg === "number"){
            page = arg;
            search = typeof maybeSearch === "string" ? maybeSearch : "";
        } else {
            ({page = 1, search = ""} = arg || {});
        }

        dispatchTaskAction({ type: "SET_LOADING"});

        try {
            const res = await api.getTasks(search, page);

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

    const fetchOpenTasks = async (arg = {}, maybeSearch, maybeCategory) => {
        let page = 1;
        let search = "";
        let category_id = null;

        if(typeof arg === "number"){
            page = arg;
            search = typeof maybeSearch === "string" ? maybeSearch : "";
            category_id = typeof maybeCategory === "number" ? maybeCategory : "";
        } else {
            ({page = 1, search = "", category_id = ""} = arg || {});
        }

        dispatchTaskAction({
            type: "SET_LOADING",
        });

        try {
            const res = await api.getOpenTasks(search, page, category_id);

            dispatchTaskAction({
                type: "SET_TASKS",
                payload: res.data,
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
            const res = await api.store(data);

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

            return { success: false, message: message };
        }
    }

    const assignTask = async (id) => {
        try {
            const res = await api.assignTask(id);

            dispatchTaskAction({
                type: "TASK_UPDATE",
                payload: res.data.task,
            });

            await fetchOpenTasks();

            return { 
                success: true, 
                message: "Task assigned to you successfully." 
            };

        } catch (e) {
            const message = 
            e.response?.data?.message ||
            "Failed to update task.";

            dispatchTaskAction({
                type: "SET_ERROR",
                payload: message,
            });

            return { success: false, message: message };
        }
    }

    const updateTask = async (id) => {
        dispatchTaskAction({
            type: "SET_LOADING",
        });

        try {
            const res = await api.updateTask(id);

            dispatchTaskAction({
                type: "TASK_UPDATE",
                payload: res.data.task,
            });

            return {
                success: true,
                task: res.data.task,
                message: "Task updated successfully.",
            };
        } catch (e) {
            const message = 
            e.response?.data?.message ||
            "Failed to update task.";

            dispatchTaskAction({
                type: "SET_ERROR",
                payload: message,
            });

            return { success: false, message: message };
        }
    }

    const deleteTask = async (id) => {
        dispatchTaskAction({
            type: "SET_LOADING",
        });

        try {
            await api.deleteTask(id);

            dispatchTaskAction({
                type: "TASK_DELETE",
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
        assignTask,
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