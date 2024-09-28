export interface UserType {
    clerkId: string;
    email: string;
    username: string;
    firstName: string | null;
    lastName: string | null;
    photo: string;
    creator?: boolean;
}

const userSchema = {
    name: 'user',
    title: 'User',
    type: 'document',
    fields: [
        {
            name: "clerkId",
            title: "ClerkId",
            type: "string",
        },
        {
            name: "email",
            title: "Email",
            type: "string",
        },
        {
            name: "username",
            title: "Username",
            type: "string",
        },
        {
            name: "firstName",
            title: "FirstName",
            type: "string",
        },
        {
            name: "lastName",
            title: "LastName",
            type: "string",
        },
        {
            name: "photo",
            title: "Photo",
            type: "string",
        },
        {
            name: "creator",
            title: "Creator",
            type: "boolean",
            initialValue: false,
        },
    ]
}

export default userSchema;