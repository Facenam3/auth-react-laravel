import { useContext, useEffect, useState } from "react";

import TaskContext from "../../store/contexts/TaskContext.jsx";
import GlassmorphicCard from "../../components/UI/GlassmorphicCard.jsx";
import PagePagination from "../../components/UI/PagePagination.jsx";
import LoadingPage from "../../components/UI/Loading.jsx";
import Table from "../../components/UI/table/Table.jsx";
import TableRow from "../../components/UI/table/TableRow.jsx";
import TableItem from "../../components/UI/table/TableItem.jsx";
import ButtonSubmit from "../../components/UI/form/ButtonSubmit.jsx";
import Button from "../../components/UI/Button.jsx";
import SelectInput from "../../components/UI/form/SelectInput.jsx";

export default function Tasks() {
    const { tasks, loading, fetchOpenTasks, assignTask } = useContext(TaskContext);

    const [page, setPage] = useState(1);
    const [searchInput, setSearchInput] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    console.log(tasks);

    useEffect(() => {
        fetchOpenTasks({page: 1, search: searchQuery});
    }, [page, searchQuery, fetchOpenTasks]);

    const handleSubmitSearch = (e) => {
        e.preventDefault();
        setPage(1);
        setSearchQuery(searchInput.trim());
    }

    async function handleAssignTask(id) {
       const res = await assignTask(id);

       if(!res.success) {
        console.log(res.message);
       }
    }

    const taskList = tasks?.data?.data ?? [];

    if(loading) {
        return <LoadingPage>Loading tasks...</LoadingPage>
    }

    return (
            <div className="container mx-auto p-10 mt-10">
                <GlassmorphicCard table>
                    <div className="head flex justify-between items-center p-2 mb-2">
                        <h1 className="font-bold text-xl">Tasks</h1>
                        <form className="flex items-center gap-3" onSubmit={handleSubmitSearch}>
                            <SelectInput
                                name="category_id"
                                id="category_id"
                                placeholder="Filter By Category"
                                required="false"
                                cssClasses=""
                                options={[
                                    {value: "Alex Shields", label: "Alex Shields"},
                                    {value: "Zakary Kautzer", label: "Zakary Kautzer"},
                                    {value: "Peggie Lang", label: "Peggie Lang"},
                                    {value: "Leila Schowlater", label: "Leila Schowlater"},
                                ]}
                            />
                            <input 
                            className="bg-white text-gray-950 mr-3 rounded-md px-2 py-1" 
                            type="search" 
                            name="search" 
                            id="search" 
                            value={searchInput}
                            placeholder="Search"
                            onChange={(e) => {
                                const val = e.target.value;
                                setSearchInput(val);

                                if(val === "")
                                {
                                    setPage(1);
                                    setSearchQuery("");
                                }
                            }}
                            />
                            <input 
                            className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-700 hover:text-gray-100 border-2 border-gray-50" 
                            type="submit" 
                            value="Search" 
                            disabled={!searchInput.trim()}
                            />    
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
                                    onClick={() => handleAssignTask(task.id)}
                                    />
                                </TableItem>
                            </TableRow>
                        ))
                    }
                    </Table>
                    <div className="footer mt-2">
                        {tasks?.data?.last_page > 1 && (
                        <PagePagination 
                            currentPage={tasks?.data?.current_page}
                            lastPage={tasks?.data?.last_page}
                            onPageChange={(t) =>fetchOpenTasks({page: t, searchInput})}
                        />
                        )}
                    </div>
                </GlassmorphicCard>
            </div>
        )
}