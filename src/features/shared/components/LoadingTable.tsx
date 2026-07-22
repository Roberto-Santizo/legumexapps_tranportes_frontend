export function LoadingTable() {
    return (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm animate-pulse dark:border-slate-800 dark:bg-slate-900">
            <table className="w-full">
                <thead className="bg-slate-50 dark:bg-slate-800">
                    <tr>
                        {[...Array(5)].map((_, index) => (
                            <th key={index} className="px-6 py-4">
                                <div className="h-3 w-20 rounded bg-slate-200 dark:bg-slate-700" />
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {[...Array(6)].map((_, row) => (
                        <tr key={row}>
                            <td className="px-6 py-4">
                                <div className="h-4 w-32 rounded bg-slate-200 dark:bg-slate-700" />
                            </td>

                            <td className="px-6 py-4">
                                <div className="h-4 w-24 rounded bg-slate-200 dark:bg-slate-700" />
                            </td>

                            <td className="px-6 py-4">
                                <div className="h-4 w-40 rounded bg-slate-200 dark:bg-slate-700" />
                            </td>

                            <td className="px-6 py-4">
                                <div className="h-7 w-20 rounded-full bg-slate-200 dark:bg-slate-700" />
                            </td>

                            <td className="px-6 py-4">
                                <div className="h-4 w-24 rounded bg-slate-200 dark:bg-slate-700" />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}