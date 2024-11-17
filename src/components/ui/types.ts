export interface IField {
    value: string | number | boolean;
    options?: [{ value: string, label: string }]
    error?: string;
    touched?: boolean;
    label: string;
    type: 'text' | 'number' | 'checkbox' | 'select';
}