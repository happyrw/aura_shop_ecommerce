"use server";
import { UserType } from "@/sanity/schemaTypes/user";
import { client } from "../client";

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
            creator: false,
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
        const userQuery = `*[_type == "user" && clerkId == "${userId}"]`;
        const userExists = await client.fetch(userQuery);

        console.log("userExists", userExists);

        if (!userExists) {
            console.error(`User with ID "${userId}" not found in Sanity.`);
            throw new Error(`User with ID "${userId}" not found.`);
        }

        const userToUpdate = userExists[0];
        // Update the existing user
        const updatedUser = await client
            .patch(userToUpdate._id)
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

    const userQuery = `*[_type == "user" && clerkId == "${userId}"]`;
    const userExists = await client.fetch(userQuery);

    console.log("userExists", userExists);

    if (!userExists) {
        console.error(`User with ID "${userId}" not found in Sanity.`);
        throw new Error(`User with ID "${userId}" not found.`);
    }

    const userToDelete = userExists[0];

    try {
        // Delete a user from Sanity
        await client.delete(userToDelete._id);
        console.log("User deleted successfully:", userId);
    } catch (error) {
        console.error("Error deleting user:", error);
        throw error;
    }
}
