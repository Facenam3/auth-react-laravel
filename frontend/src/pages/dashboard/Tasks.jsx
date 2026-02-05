import { useContext, useEffect } from "react";

import TaskContext from "../../store/contexts/TaskContext.jsx";
import GlassmorphicCard from "../../components/UI/GlassmorphicCard.jsx";
import PagePagination from "../../components/UI/PagePagination.jsx";
import LoadingPage from "../../components/UI/Loading.jsx";

export default function Tasks() {
    const { tasks, loading, fetchTasks } = useContext(TaskContext);

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    const taskList = tasks?.data?.data ?? [];

    if(loading) {
        return <LoadingPage>Loading tasks...</LoadingPage>
    }

    console.log(tasks);

    return (
            <div className="container mx-auto p-10 mt-10">
                <GlassmorphicCard table>
                    <div className="head flex justify-between items-center p-2 mb-2">
                        <h1 className="font-bold text-xl">Users</h1>
                        <form action="">
                            <input className="bg-white text-gray-950 mr-3 rounded-md px-2 py-1" type="search" name="search" id="search" placeholder="Search"/>
                            <input className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-700 hover:text-gray-100 border-2 border-gray-50" type="submit" value="Search" />    
                        </form>                    
                    </div>
                    <div className="body overflow-hidden rounded-xl border border-white/30">
                        <table className="w-full text-md text-left table-fixed rounded-md">
                            <thead className="capitalize bg-slate-900 ">
                                <tr >
                                     <th className="px-3 py-2">
                                        #
                                    </th>
                                    <th className="px-3 py-2">
                                        task name
                                    </th>
                                    <th className="px-3 py-2">
                                        description
                                    </th>
                                    <th className="px-3 py-2">
                                        project
                                    </th>
                                    <th className="px-3 py-2">
                                        status
                                    </th>
                                    <th className="px-3 py-2">
                                        category
                                    </th>
                                    <th className="px-3 py-2">
                                        assigned
                                    </th>
                                    <th className="px-3 py-2">
                                        actions
                                    </th>
                                </tr>    
                            </thead> 
                            <tbody className="mt-2 bg-amber-100/15">
                                    {
                                        taskList.map((task) => (
                                            <tr key={task.id} className="border-b-2 border-amber-50">
                                                <td className="px-3 py-2">
                                                    {task.id}
                                                </td>
                                                <td className="px-3 py-2">
                                                    {task.title}
                                                </td>
                                                <td className="px-3 py-2">
                                                    {task.description.substring(0, 20) + " ..."}
                                                </td>
                                                <td className="px-3 py-2">
                                                    {task.project.name}
                                                </td>
                                                <td className="px-3 py-2">
                                                    {task.status.name}
                                                </td>
                                                <td className="px-3 py-2">
                                                    {task.category.name}
                                                </td>
                                                <td className="px-3 py-2">
                                                    {task.assignee?.name ?? "Unassigned"}
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
                        {tasks.data.last_page > 1 && (
                        <PagePagination 
                            currentPage={tasks.data.current_page}
                            lastPage={tasks.data.last_page}
                            onPageChange={fetchTasks}
                        />
                        )}
                    </div>
                </GlassmorphicCard>
            </div>
        )
}