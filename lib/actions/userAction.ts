"use server";
import { client } from "@/sanity/lib/client";
import { UserType } from "@/sanity/schemaTypes/user";

export interface UpdateUserType {
    username: string;
    firstName: string | null;
    lastName: string | null;
    photo: string;
}

export async function createUser(userInfo: UserType) {
    try {
        // Create a new user in Sanity
        const newUser = await client.create({
            _type: 'user',
            clerkId: userInfo.clerkId,
            email: userInfo.email,
            username: userInfo.username,
            firstName: userInfo.firstName,
            lastName: userInfo.lastName,
            photo: userInfo.photo,
            creator: false, // Ensure creator is set to false
        });

        console.log("User created successfully:", newUser);
        return newUser;
    } catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
}

export async function updateUser(userId: string, userInfo: UpdateUserType) {
    try {
        // Update an existing user in Sanity
        const updatedUser = await client.patch(userId)
            .set({
                username: userInfo.username,
                firstName: userInfo.firstName,
                lastName: userInfo.lastName,
                photo: userInfo.photo,
            })
            .commit();

        console.log("User updated successfully:", updatedUser);
        return updatedUser;
    } catch (error) {
        console.error("Error updating user:", error);
        throw error;
    }
}

export async function deleteUser(userId: string) {
    try {
        // Delete a user from Sanity
        await client.delete(userId);
        console.log("User deleted successfully:", userId);
    } catch (error) {
        console.error("Error deleting user:", error);
        throw error;
    }
}
