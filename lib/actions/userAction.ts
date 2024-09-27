"use server";
import { UserType } from "@/sanity/schemaTypes/user";

export interface UpdateUserType {
    username: string;
    firstName: string | null;
    lastName: string | null;
    photo: string;
}

export async function createUser(userInfo: UserType) {
    console.log(userInfo);
    const newUser = { _id: "INVALID" }
    return newUser;
}
export async function updateUser(userId: string, userInfo: UpdateUserType) {
    console.log(userInfo, userId);
}
export async function deleteUser(userId: string) {
    console.log(userId);
}