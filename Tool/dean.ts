export interface DiffData {
    a: JSON,
    b: JSON,
    ignoredKeys?: string[],
    expected: boolean,
}
