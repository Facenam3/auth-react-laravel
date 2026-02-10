import { createContext, useReducer } from "react";
import * as api from "../../api/projects";

const ProjectContext = createContext({
    projects: [],
    loading: false,
    errors: null,
    fetchProjects: () => {},
    getByStatus: () => {},
    update: () => {},
    deleteProject: () => {},
});

const initialState = {
    projects: {
        data: [],
        currentPage: 1,
        lastPage: 1,
    },
    loading: false,
    errors: null
};

function projectReducer(state, action) {
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
        case "SET_PROJECTS":
            return {
                ...state,
                projects: {
                    data: action.payload.projects ?? [],
                    currentPage: action.payload.current_page ?? 1,
                    lastPage: action.payload.last_page ?? 1,
                },
                loading: false,
                errors: null,
            };
        case "UPDATE":
            const idx = state.projects.findIndex(project => project.id === action.payload.id);
            if (idx === -1) return state;
            const updatedProjects = [...state.projects];
            updatedProjects[idx] = {...updatedProjects[idx], ...action.payload};
            return {
                ...state,
                projects: updatedProjects,
                loading: false,
                errors: null,
            };
        case "DELETE" :
            return {
                ...state,
                projects: state.projects.filter(p => p.id !== action.payload),
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

export function ProjectContextProvider({children}) {
    const [project, dispatchProjectAction] = useReducer(projectReducer, initialState);

    const fetchProjects = async (page = 1) => {
        dispatchProjectAction({ type: "SET_LOADING"});

        try {
            const res = await api.getProjects(page);

            dispatchProjectAction({
                type: "SET_PROJECTS",
                payload: res.data,
            });

            return { success: true };
        } catch (e) {
            const message = 
            e.response?.data?.message ||
            "Failed to register projects.";
            
            dispatchProjectAction({
               type: "SET_ERROR",
               payload: message, 
            });
        }
    }

    const createProject = async (data) => {
        dispatchProjectAction({ type: "SET_LOADING" });

        try {
            const res = await api.store(data);

            dispatchProjectAction({
                type: "SET_LOADING_DONE",
            });
            dispatchProjectAction({
                type: "CLEAR_ERRORS",
            });

            return { success: true,
                     projects: res.data.projects,
            };
        } catch (e) {
            const message = 
            e.response?.data?.message ||
            "Failed to create project.";

            dispatchProjectAction({
                type: "SET_ERROR",
                payload: message,
            });
            dispatchProjectAction({
                type: "SET_LOADING_DONE",
            });

            return { success: false, message: message };
        }
    }

    const updateProject = async (id, data) => {
        dispatchProjectAction({
            type: "SET_LOADING",
        });

        try {
            const res = await api.updateProject(id, data);

            dispatchProjectAction({
                type: "UPDATE",
                payload: res.data,
            });

            dispatchProjectAction({
                type: "SET_LOADING_DONE",
            });

            return { success: true,
                project: res.data.project,
            };
        } catch (e) {
            const message = 
            e.response?.data?.message ||
            "Failed to update project.";

            dispatchProjectAction({
                type: "SET_ERROR",
                payload: message,
            });

            dispatchProjectAction({
                type: "SET_LOADING_DONE",
            });

            return { success: false, message: message }
        }
    }

    const deleteProject = async (id) => {
        dispatchProjectAction({
            type: "SET_LOADING",
        });

        try {
            await api.deleteProject(id);

            dispatchProjectAction({
                type: "DELETE",
                payload: id,
            });

            return { success: true };
        } catch (e) {
            const message = 
            e.response?.data?.message ||
            "Failed to delete project.";
            dispatchProjectAction({
                type: "SET_ERROR",
                payload: message,
            });

            return { success: false };
        }        
    }

    const projectContext = {
        ...project,
        fetchProjects,
        createProject,
        updateProject,
        deleteProject,
    }

    return (
        <ProjectContext.Provider value={projectContext}>
            {children}
        </ProjectContext.Provider>
    )
}

export default ProjectContext;