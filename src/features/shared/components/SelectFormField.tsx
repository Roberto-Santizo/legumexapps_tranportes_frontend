import { Controller, type Control, type FieldValues, type Path, type RegisterOptions } from "react-hook-form";
import Select from "react-select";
import type { Option } from "@/features/shared/shared";

type Props<T extends FieldValues> = {
    label: string;
    name: Path<T>;
    options: Option[];
    errorMessage?: string;
    control: Control<T>;
    validation: RegisterOptions<T, Path<T>>;
};

export function SelectFormField<T extends FieldValues>({
    label,
    name,
    options,
    errorMessage,
    control,
    validation
}: Props<T>) {
    return (
        <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700 dark:text-slate-300">
                {label}
            </label>

            <Controller
                name={name}
                control={control}
                rules={validation}
                render={({ field }) => (
                    <Select
                        {...field}
                        options={options}
                        isSearchable
                        placeholder="Seleccione un opción"
                        noOptionsMessage={() => 'Sin opciones'}
                        unstyled
                        value={options.find((opt) => opt.value === field.value) || null}
                        onChange={(selected) => field.onChange(selected?.value)}
                        classNames={{
                            control: ({ isFocused }) =>
                                `w-full rounded-lg border bg-white px-1 py-1 shadow-sm transition-all duration-150 ease-in-out dark:bg-slate-800 ${
                                    isFocused
                                        ? "border-blue-500 ring-2 ring-blue-500/20"
                                        : "border-gray-200 hover:border-gray-300 dark:border-slate-700 dark:hover:border-slate-600"
                                }`,
                            placeholder: () => "text-gray-400 dark:text-slate-500",
                            input: () => "text-gray-900 dark:text-slate-100",
                            singleValue: () => "text-gray-900 dark:text-slate-100",
                            indicatorSeparator: () => "bg-gray-200 dark:bg-slate-700",
                            dropdownIndicator: () => "text-gray-400 dark:text-slate-500",
                            clearIndicator: () => "text-gray-400 dark:text-slate-500",
                            menu: () =>
                                "mt-1 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-800",
                            menuList: () => "py-1",
                            noOptionsMessage: () => "px-3 py-2 text-gray-400 dark:text-slate-500",
                            option: ({ isSelected, isFocused }) =>
                                `cursor-pointer px-3 py-2 ${
                                    isSelected
                                        ? "bg-blue-500 text-white"
                                        : isFocused
                                            ? "bg-blue-50 text-gray-900 dark:bg-slate-700 dark:text-slate-100"
                                            : "text-gray-900 dark:text-slate-100"
                                }`
                        }}
                    />
                )}
            />

            <p className="text-red-400 text-xs">{errorMessage}</p>
        </div>
    );
}