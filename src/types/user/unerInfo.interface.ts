export interface UserInfo  {
    name: string;
    surname: string;
    email: string;
    password: string;
    phoneNumber?: string;
    role: 'admin' | 'user';
    createdAt: string;
    updatedAt: string;
    isActive: boolean;
    lastLogin?: string;
    address?: {
        street: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
    };
    profilePicture?: string;
    preferences?: {
        theme: 'light' | 'dark';
    }
}