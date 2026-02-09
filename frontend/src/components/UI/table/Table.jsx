export default function Table({option, option1, option2, option3, option4, option5, option6, task, admin, children}) {
    return (
        <div className="body overflow-hidden rounded-xl border border-white/30">
            <table className="w-full text-md text-left table-fixed rounded-md">
                <thead className="capitalize bg-slate-900 ">
                    <tr >
                        <th className="px-2 py-2">
                            {option}
                        </th>
                        <th className="px-2 py-2">
                            {option1}
                        </th>
                        <th className="px-2 py-2">
                            {option2}
                        </th>
                        <th className="px-2 py-2">
                            {option3}
                        </th>
                        <th className="px-2 py-2">
                            {option4}
                        </th>
                        {option5 && (<th className="px-2 py-2">
                            {option5}
                        </th>)}
                        {option6 && (<th className="px-2 py-2">
                            {option6}
                        </th>)}
                        {admin && (<th className="px-2 py-2">
                            actions
                        </th>)}                        
                        {task && (
                            <th className="px-2 py-2">
                                {task}
                            </th>
                        )}
                    </tr>    
                </thead> 
                <tbody className="mt-2 bg-amber-100/15">
                        {children}
                </tbody>
            </table>
        </div>
    );
}