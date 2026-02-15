import { useContext, useEffect, useState } from "react";

import ProjectContext from "../../store/contexts/ProjectContext.jsx";
import GlassmorphicCard from "../../components/UI/GlassmorphicCard.jsx";
import PagePagination from "../../components/UI/PagePagination.jsx";
import LoadingPage from "../../components/UI/Loading.jsx";
import Table from "../../components/UI/table/Table.jsx";
import TableRow from "../../components/UI/table/TableRow.jsx";
import TableItem from "../../components/UI/table/TableItem.jsx";

export default function Projects() {
    const { projects, loading, fetchProjects } = useContext(ProjectContext);

    const [page, setPage] = useState(1);
    const [searchInput, setSearchInput] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        fetchProjects({page: 1, search: searchQuery});
    }, [page, searchQuery, fetchProjects]);

    const handleSubmitSearch = (e) => {
        e.preventDefault();
        setPage(1);
        setSearchQuery(searchInput.trim());
    }

    const projectList = projects?.data?.data ?? [];

    if(loading) {
        return <LoadingPage>Loading projects...</LoadingPage>
    }

    return (
        <div className="container mx-auto p-10 mt-10">
            <GlassmorphicCard table>
                <div className="head flex justify-between items-center p-2 mb-2">
                    <h1 className="font-bold text-xl">Projects</h1>
                    <form onSubmit={handleSubmitSearch}>
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

                            if(val === ""){
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
                    option1="project name"
                    option2="description"
                    option3="status"
                    option4="start date"
                    option5="ending date"
                >
                    {
                        projectList.map((project) => (
                            <TableRow itemKey={project.id} key={project.id}>
                                <TableItem>{project.id}</TableItem>
                                <TableItem>{project.name}</TableItem>
                                <TableItem>{project.description.substring(0, 20) + " ..."}</TableItem>
                                <TableItem>{project.status.name}</TableItem>
                                <TableItem>{project.start_date}</TableItem>
                                <TableItem>{project.ending_date ?? "No date"}</TableItem>
                            </TableRow>
                        ))
                    }
                </Table>
                <div className="footer mt-2">
                    <PagePagination 
                    currentPage={projects?.data?.current_page}
                    lastPage={projects?.data?.last_page}
                    onPageChange={(p) => fetchProjects({ page: p, searchInput})}
                    />
                </div>
            </GlassmorphicCard>
        </div>
    )
}