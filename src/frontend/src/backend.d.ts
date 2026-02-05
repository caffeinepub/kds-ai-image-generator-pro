import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Time = bigint;
export interface Project {
    id: string;
    projectName: string;
    owner: Principal;
    inputAssets: Array<AssetMetadata>;
    createdAt: Time;
    outputAssets: Array<AssetMetadata>;
    updatedAt: Time;
    preset: string;
    toolType: string;
    configuration: string;
}
export interface AssetMetadata {
    assetId: string;
    description: string;
    assetType: string;
}
export interface UserProfile {
    name: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    deleteProject(projectId: string): Promise<void>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getProject(projectId: string): Promise<Project>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    listProjects(): Promise<Array<Project>>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    saveProject(projectName: string, toolType: string, preset: string, configuration: string, inputAssets: Array<AssetMetadata>, outputAssets: Array<AssetMetadata>): Promise<string>;
    updateProjectText(projectId: string, newConfiguration: string, newProjectName: string): Promise<void>;
}
