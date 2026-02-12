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
        case "UPDATE_PROJECT":
           { 
            const updated = action.payload;
            return {
                ...state,
                projects: {
                    ...state.projects,
                    data: Array.isArray(state.projects?.data) 
                    ? state.projects.data.map(p => (p.id === updated.id ? updated : p))
                    : [updated],
                },
                loading: false,
                errors: null,
            };
        }
        case "DELETE_PROJECT" :
            return {
                ...state,
                projects: {
                    ...state,
                    data: state.projects.data.filter(
                        p => p.id !== action.payload
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

export function ProjectContextProvider({children}) {
    const [project, dispatchProjectAction] = useReducer(projectReducer, initialState);

    const fetchProjects = async (arg = {}, maybeSearch) => {
        let page = 1;
        let search = "";

        if(typeof arg === "number"){
            page = arg;
            search = typeof maybeSearch === "string" ? maybeSearch : "";
        } else {
            ({page = 1, search = ""} = arg || {});
        }

        dispatchProjectAction({ type: "SET_LOADING"});

        try {
            const res = await api.getProjects(search, page);

            dispatchProjectAction({
                type: "SET_PROJECTS",
                payload: res.data,
            });

            return { success: true };
        } catch (e) {
            const message = 
            e.response?.data?.message ||
            "Failed to fetch projects.";
            
            dispatchProjectAction({
               type: "SET_ERROR",
               payload: message, 
            });

            return { success: false };
        }
    }

    const createProject = async (data) => {
        dispatchProjectAction({ type: "SET_LOADING" });

        try {
            const res = await api.store(data);

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

            return { success: false, message: message };
        }
    }

    const updateProject = async (id) => {
        dispatchProjectAction({
            type: "SET_LOADING",
        });

        try {
            const res = await api.updateProject(id);

            dispatchProjectAction({
                type: "UPDATE_PROJECT",
                payload: res.data.project,
            });

            return { 
                success: true,
                project: res.data.project,
                message: "Project updated successfully.",
            };
        } catch (e) {
            const message = 
            e.response?.data?.message ||
            "Failed to update project.";

            dispatchProjectAction({
                type: "SET_ERROR",
                payload: message,
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