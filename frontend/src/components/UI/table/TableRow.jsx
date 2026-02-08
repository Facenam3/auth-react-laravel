export default function TableRow({itemKey, children}){
    return (
        <tr key={itemKey} className="border-b-2 border-amber-50">
            {children}
        </tr>
    )
}