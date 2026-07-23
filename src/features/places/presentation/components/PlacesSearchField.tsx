import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Loader2, MapPin, Search } from "lucide-react";
import { placesRepositoryProvider, type Place } from "@/features/places/places";

type Props = {
    label?: string;
    placeholder?: string;
    onSelect?: (place: Place) => void;
};

export function PlacesSearchField({ label, placeholder = "Buscar dirección...", onSelect }: Props) {
    const [text, setText] = useState('');
    const [debounced, setDebounced] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const timeout = setTimeout(() => setDebounced(text.trim()), 400);
        return () => clearTimeout(timeout);
    }, [text]);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const { data, isFetching } = useQuery({
        queryKey: ['searchPlaces', debounced],
        queryFn: () => placesRepositoryProvider.getPlaces(debounced),
        enabled: debounced.length > 0,
    });

    async function handleSelect(place: Place) {
        const instance = await placesRepositoryProvider.getPlaceById(place.id);
        console.log(instance);

        setText(place.address);
        setIsOpen(false);
        onSelect?.(instance);
    }

    const results = data ?? [];

    return (
        <div ref={containerRef} className="relative flex flex-col gap-2">
            {label && (
                <label className="text-sm font-medium text-gray-700 dark:text-slate-300">
                    {label}
                </label>
            )}

            <div
                className={`flex w-full items-center gap-2 rounded-lg border bg-white px-3 py-2 shadow-sm transition-all duration-150 ease-in-out dark:bg-slate-800 ${isOpen
                        ? "border-blue-500 ring-2 ring-blue-500/20"
                        : "border-gray-200 hover:border-gray-300 dark:border-slate-700 dark:hover:border-slate-600"
                    }`}
            >
                <Search className="size-4 shrink-0 text-gray-400 dark:text-slate-500" />

                <input
                    type="text"
                    value={text}
                    placeholder={placeholder}
                    onChange={(event) => {
                        setText(event.target.value);
                        setIsOpen(true);
                    }}
                    onFocus={() => setIsOpen(true)}
                    className="w-full bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400 dark:text-slate-100 dark:placeholder:text-slate-500"
                />

                {isFetching && <Loader2 className="size-4 shrink-0 animate-spin text-gray-400 dark:text-slate-500" />}
            </div>

            {isOpen && debounced.length > 0 && (
                <div className="absolute top-full z-10 mt-1 w-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-800">
                    <ul className="max-h-64 overflow-y-auto py-1">
                        {!isFetching && results.length === 0 && (
                            <li className="px-3 py-2 text-sm text-gray-400 dark:text-slate-500">
                                Sin resultados
                            </li>
                        )}

                        {results.map((place) => (
                            <li key={place.id}>
                                <button
                                    type="button"
                                    onClick={() => handleSelect(place)}
                                    className="flex w-full cursor-pointer items-center gap-2 px-3 py-2 text-left text-sm text-gray-900 hover:bg-blue-50 dark:text-slate-100 dark:hover:bg-slate-700"
                                >
                                    <MapPin className="size-4 shrink-0 text-gray-400 dark:text-slate-500" />
                                    <span className="truncate">{place.address}</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
