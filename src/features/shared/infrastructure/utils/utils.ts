import { type Location, type NavigateFunction } from "react-router-dom";

export const convertImageToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;

    reader.readAsDataURL(file);
  });
};


export const getQueryParam = (location: Location<any>, queryParam: string) => {
    const queryParams = new URLSearchParams(location.search);
    return queryParams.get(queryParam);
}

export const queryParamExists = (location: Location<any>, queryParam: string, value?: string): boolean => {
    const queryParams = new URLSearchParams(location.search);
    const show = value ? queryParams.get(queryParam) == value : !!queryParams.get(queryParam);
    return show;
}

export const handleSetQueryParam = (location: Location<any>, navigate: NavigateFunction, queryParam: string, value: string) => {
    const params = new URLSearchParams(location.search);
    params.set(queryParam, value);
    navigate({ pathname: location.pathname, search: params.toString() });
};

export const handleDeleteQueryParam = (location: Location<any>, navigate: NavigateFunction, queryParam: string) => {
    const params = new URLSearchParams(location.search);
    params.delete(queryParam);

    navigate({ pathname: location.pathname, search: params.toString() });
};

export const setQueryParams = <T extends Record<string, unknown>>(filters: T) => {
    const params = new URLSearchParams(Object.entries(filters).filter(([, value]) => value != null && value !== '').map(([key, value]) => [key, String(value)]));
    return params;
}