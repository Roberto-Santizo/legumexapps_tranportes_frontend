type Props = {
    title: string;
    subtitle: string;
}

export function Title({ title, subtitle } : Props) {
    return (
        <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{title}</h1>
            <p className="mt-1 text-sm text-gray-500 dar:text-gray-300">
                {subtitle}
            </p>
        </div>
    )
}
