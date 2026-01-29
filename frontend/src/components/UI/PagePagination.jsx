export default function PagePagination({
    currentPage,
    lastPage,
    onPageChange,
}) {

    if(lastPage <= 1) return null;

    return (
        <nav className="flex items-center space-x-4">
            <ul className="flex -space-x-px text-sm">
                <li>
                    <button  
                    disabled={currentPage === 1}
                    onClick={() => onPageChange(currentPage - 1)}
                    className={`px-3 h-9 rounded-l-md border
                    ${currentPage === 1
                        ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                        : "bg-gray-900 text-white hover:bg-gray-800"}
                    `}
                    >
                        Previous
                    </button>
                </li>
                {Array.from({ length: lastPage }, (_, i) => i + 1).map(page => (
                    <li key={page}>
                        <button
                        onClick={() => onPageChange(page)}
                        className={`px-3 h-9 border
                            ${page === currentPage
                            ? "bg-red-600 text-white"
                            : "bg-gray-900 text-gray-300 hover:bg-gray-800"}
                        `}
                        >
                        {page}
                        </button>
                    </li>
                ))}
                <li>
                    <button
                        disabled={currentPage === lastPage}
                        onClick={() => onPageChange(currentPage + 1)}
                        className={`px-3 h-9 rounded-r-md border
                        ${currentPage === lastPage
                            ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                            : "bg-gray-900 text-white hover:bg-gray-800"}
                        `}
                    >
                        Next
                    </button>
                </li>
            </ul>
        </nav>
    )
}