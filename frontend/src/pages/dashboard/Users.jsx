import { useContext, useEffect, useState } from "react";

import UserContext from "../../store/contexts/UserContext.jsx";
import GlassmorphicCard from "../../components/UI/GlassmorphicCard.jsx";
import PagePagination from "../../components/UI/PagePagination.jsx";
import LoadingPage from "../../components/UI/Loading.jsx";
import Table from "../../components/UI/table/Table.jsx";
import TableRow from "../../components/UI/table/TableRow.jsx";
import TableItem from "../../components/UI/table/TableItem.jsx";

export default function Users() {
    const { users, loading, fetchUsers } = useContext(UserContext);

    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);

    useEffect(() => {
        fetchUsers({page: 1, search: ""});
    },[ page, fetchUsers]);

    const usersList = users?.data?.data ?? [];

    const handleSubmitSearch = (e) => {
        e.preventDefault();
        setPage(1);
        fetchUsers({ page, search });
    }

    if(loading) {
        return <LoadingPage >Loading users..</LoadingPage>
    };
    
    return (
        <div className="container mx-auto p-10 mt-10">
            <GlassmorphicCard table>
                <div className="head flex justify-between items-center p-2 mb-2">
                    <h1 className="font-bold text-xl">Users</h1>
                    <form onSubmit={handleSubmitSearch}>
                        <input 
                            className="bg-white text-gray-950 mr-3 rounded-md px-2 py-1" 
                            type="search" 
                            name="search" 
                            id="search" 
                            value={search}
                            placeholder="Search"                            
                            onChange={(e) => {
                                const val = e.target.value;
                                setSearch(val);

                                if(val === ""){
                                    setPage(1);
                                    fetchUsers({page: 1, search: ""});
                                }
                            }}
                        />
                        <input 
                            className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-700 hover:text-gray-100 border-2 border-gray-50" 
                            type="submit" 
                            value="Search" 
                            disabled={!search.trim()}
                        />    
                    </form>                    
                </div>
                <Table 
                    option="#"
                    option1="full name"
                    option2="email"
                    option3="country"
                    option4="phone"
                >   
                {
                    usersList.map((user) => (
                        <TableRow itemKey={user.id} key={user.id}>
                            <TableItem>{user.id}</TableItem>
                            <TableItem>{user.name}</TableItem>
                            <TableItem>{user.email}</TableItem>
                            <TableItem>{user.country}</TableItem>
                            <TableItem>{user.phone}</TableItem>
                        </TableRow>
                    ))
                }

                </Table>
                <div className="footer mt-2">
                    <PagePagination 
                    currentPage={users?.data?.current_page}
                    lastPage={users?.data?.last_page}
                    onPageChange={(u) => fetchUsers({page: u, search})}
                    />
                </div>
            </GlassmorphicCard>
        </div>
    )
}