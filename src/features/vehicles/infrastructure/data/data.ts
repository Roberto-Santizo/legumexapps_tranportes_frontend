import type { Option } from "@/features/shared/shared";

export enum FuelType {
  gasoline = 'gasoline',
  diesel = 'diesel',
}

export const fuelTypeOptions: Option[] = [
  {
    label: 'Gasolina',
    value: FuelType.gasoline,
  },
  {
    label: 'Diésel',
    value: FuelType.diesel,
  },
];