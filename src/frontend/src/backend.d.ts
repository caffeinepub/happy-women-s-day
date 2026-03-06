import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Person {
    name: string;
    shortDescription: string;
    message: string;
}
export interface backendInterface {
    getAllPeople(): Promise<Array<Person>>;
}
