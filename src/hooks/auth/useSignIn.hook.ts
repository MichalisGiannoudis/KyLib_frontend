import { UserStore } from "@/store/user";
import { useState } from "react";

export const useSignInHook = () => {
    
    const API_URL = process.env.NEXT_PUBLIC_LOCAL_API_URL

    const user = UserStore((state) => state.user);
    const setUser = UserStore((state) => state.setUser);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const SingIn = async (email: string, password: string) => {
        
        try {
            setLoading(true);
            setError('');

            const params = new URLSearchParams({ email, password }).toString();
            
            const res = await fetch(`${API_URL}/api/auth/signin?${params}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });

            if (!res.ok){
                throw new Error('Failed to sign in');
            }

            const data = await res.json();
            setUser(data);
            
            if (data) {
                console.log('User signed in successfully:', user);
            }
        }
        catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            }
            
            setUser(null);
        }
        finally {
            setLoading(false);
        }

    }

    return { user, loading, error, SingIn };
}