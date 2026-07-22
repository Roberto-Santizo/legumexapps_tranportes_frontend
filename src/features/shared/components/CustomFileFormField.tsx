import { Upload } from "lucide-react";
import { useState } from "react";
import type { Path, RegisterOptions, UseFormRegister } from "react-hook-form";

type Props<T extends Record<string, any>> = {
    label: string;
    name: Path<T>;
    extension: string;
    errorMessage?: string;
    register: UseFormRegister<T>;
    validation: RegisterOptions<T, Path<T>>;
    onFileChange?: (file: File | null) => void;
}

export function CustomFileFormField<T extends Record<string, any>>({ label, name, extension, errorMessage, register, validation, onFileChange }: Props<T>) {
    const [fileName, setFileName] = useState<string>("");
    const { onChange, ...rest } = register(name, validation);

    return (
        <div className="flex flex-col gap-2">
            <label
                className="text-sm font-medium text-gray-700"
                htmlFor={name}
            >
                {label}
            </label>

            <label
                htmlFor={name}
                className={`flex items-center gap-2 cursor-pointer ${errorMessage ? "text_form_field_error" : "text_form_field"}`}
            >
                <Upload size={18} className="shrink-0 text-gray-400" />
                <span className="truncate text-gray-500">{fileName || `Selecciona un archivo ${extension}`}</span>
            </label>

            <input
                {...rest}
                onChange={(e) => {
                    onChange(e);
                    const file = e.target.files?.[0] ?? null;
                    setFileName(file?.name ?? "");
                    onFileChange?.(file);
                }}
                id={name}
                name={name}
                type="file"
                accept={extension}
                className="hidden"
            />

            <p className="text-red-400 text-xs">{errorMessage}</p>
        </div>
    )
}
