import { useContext, useEffect } from "react";

import TaskContext from "../../store/contexts/TaskContext.jsx";
import GlassmorphicCard from "../../components/UI/GlassmorphicCard.jsx";
import PagePagination from "../../components/UI/PagePagination.jsx";
import LoadingPage from "../../components/UI/Loading.jsx";
import Table from "../../components/UI/table/Table.jsx";
import TableRow from "../../components/UI/table/TableRow.jsx";
import TableItem from "../../components/UI/table/TableItem.jsx";
import ButtonSubmit from "../../components/UI/form/ButtonSubmit.jsx";
import Button from "../../components/UI/Button.jsx";

export default function Tasks() {
    const { tasks, loading, fetchOpenTasks } = useContext(TaskContext);

    useEffect(() => {
        fetchOpenTasks();
    }, [fetchOpenTasks]);

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
                    <Table

                        option="#"
                        option1="task name"
                        option2="description"
                        option3="project"
                        option4="status"
                        option5="category"
                        option6="assigned"
                        task="actions"
                    >
                    {
                        taskList.map((task) => (
                            <TableRow itemKey={task.id}>
                                <TableItem>{task.id}</TableItem>
                                <TableItem>{task.title}</TableItem>
                                <TableItem>{task.description.substring(0, 20) + " ..."}</TableItem>
                                <TableItem>{task.project.name}</TableItem>
                                <TableItem>{task.status.name}</TableItem>
                                <TableItem>{task.category.name}</TableItem>
                                <TableItem>{task.assignee?.name ?? "Unassigned"}</TableItem>
                                <TableItem>
                                    <Button 
                                    name="Take Task" 
                                    type="button"
                                    />
                                </TableItem>
                            </TableRow>
                        ))
                    }
                    </Table>
                    <div className="footer mt-2">
                        {tasks.data.last_page > 1 && (
                        <PagePagination 
                            currentPage={tasks.data.current_page}
                            lastPage={tasks.data.last_page}
                            onPageChange={fetchOpenTasks}
                        />
                        )}
                    </div>
                </GlassmorphicCard>
            </div>
        )
}