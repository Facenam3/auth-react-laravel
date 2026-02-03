import { useContext, useEffect } from "react";

import ProjectContext from "../../store/contexts/ProjectContext.jsx";
import GlassmorphicCard from "../../components/UI/GlassmorphicCard.jsx";
import PagePagination from "../../components/UI/PagePagination.jsx";
import LoadingPage from "../../components/UI/Loading.jsx";

export default function Projects() {
    const { projects, loading, fetchProjects } = useContext(ProjectContext);

    useEffect(() => {
        fetchProjects();
    }, []);

    const projectList = projects?.data?.data ?? [];

    if(loading) {
        return <LoadingPage>Loading projects...</LoadingPage>
    }

    console.log(projects);

    return (
        <div className="container mx-auto p-10 mt-10">
            <GlassmorphicCard table>
                <div className="head flex justify-between items-center p-2 mb-2">
                    <h1 className="font-bold text-xl">Users</h1>
                    <form action="">
                        <input className="bg-white text-gray-950 mr-3 rounded-md px-2 py-1" type="search" name="search" id="search" placeholder="Search"/>
                        <input className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-700 hover:text-gray-100 border-1 border-gray-50" type="submit" value="Search" />    
                    </form>                    
                </div>
                <div className="body overflow-hidden rounded-xl border border-white/30">
                    <table className="w-full text-md text-left table-fixed rounded-md">
                        <thead className="capitalize bg-slate-900 ">
                            <tr >
                                <th className="px-3 py-2">
                                    project name
                                </th>
                                <th className="px-3 py-2">
                                    description
                                </th>
                                <th className="px-3 py-2">
                                    status
                                </th>
                                <th className="px-3 py-2">
                                    start date
                                </th>
                                <th className="px-3 py-2">
                                    ending date
                                </th>
                                <th className="px-3 py-2">
                                    actions
                                </th>
                            </tr>    
                        </thead> 
                        <tbody className="mt-2 bg-amber-100/15">
                                {
                                    projectList.map((project) => (
                                        <tr key={project.id} className="border-b-2 border-amber-50">
                                        <td className="px-3 py-2">
                                            {project.name}
                                        </td>
                                        <td className="px-3 py-2">
                                            {project.description.substring(0, 20) + " ..."}
                                        </td>
                                        <td className="px-3 py-2">
                                            {project.status.name}
                                        </td>
                                        <td className="px-3 py-2">
                                            {project.start_date}
                                        </td>
                                        <td className="px-3 py-2">
                                            {project.due_date}
                                        </td>
                                        <td className="px-3 py-2">
                                            <span className="mr-2">show</span>
                                            <span className="mr-2">edit</span>
                                            <span className="mr-2">delete</span>
                                        </td>
                                    </tr>
                                    ))
                                }     
                        </tbody>
                    </table>
                </div>
                <div className="footer mt-2">
                    <PagePagination 
                    currentPage={projects.data.current_page}
                    lastPage={projects.data.last_page}
                    onPageChange={fetchProjects}
                    />
                </div>
            </GlassmorphicCard>
        </div>
    )
}