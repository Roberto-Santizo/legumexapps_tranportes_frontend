import type { Option } from "@/features/shared/shared";
import type { Brand } from "@/features/brands/brands";

export const brandsOptions = (brands: Brand[]): Option[] => {
    const options: Option[] = brands.map((brand) => {
        return {
            value: brand.id,
            label: brand.name
        }
    })

    return options;
}