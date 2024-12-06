import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, LoginCredentials, RegisterData } from './types';

interface AuthState {
  user: User | null;
  users: User[];
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  login: (credentials: LoginCredentials) => Promise<{ success: boolean; message: string }>;
  register: (data: RegisterData) => Promise<{ success: boolean; message: string }>;
  approveUser: (userId: string) => void;
  rejectUser: (userId: string) => void;
  removeUser: (userId: string) => void;
}

// Simulated admin credentials
const ADMIN_EMAIL = 'admin@legal.ai';
const ADMIN_PASSWORD = 'admin123';

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      users: [
        {
          id: 'admin',
          name: 'Admin',
          email: ADMIN_EMAIL,
          status: 'approved',
          role: 'admin',
          createdAt: new Date().toISOString(),
        },
      ],
      isAuthenticated: false,

      setUser: (user) => set({ user, isAuthenticated: !!user }),

      login: async (credentials) => {
        const { users } = get();
        
        // Admin login
        if (credentials.email === ADMIN_EMAIL && credentials.password === ADMIN_PASSWORD) {
          const adminUser = users.find(u => u.email === ADMIN_EMAIL);
          if (adminUser) {
            set({ user: adminUser, isAuthenticated: true });
            return { success: true, message: 'Welcome, Admin!' };
          }
        }

        // Regular user login
        const user = users.find(u => u.email === credentials.email);
        
        if (!user) {
          return { success: false, message: 'User not found' };
        }

        if (user.status === 'pending') {
          return { success: false, message: 'Your account is pending approval' };
        }

        if (user.status === 'rejected') {
          return { success: false, message: 'Your account has been rejected' };
        }

        set({ user, isAuthenticated: true });
        return { success: true, message: 'Login successful' };
      },

      register: async (data) => {
        const { users } = get();
        
        if (users.some(u => u.email === data.email)) {
          return { success: false, message: 'Email already registered' };
        }

        const newUser: User = {
          id: crypto.randomUUID(),
          name: data.name,
          email: data.email,
          status: 'pending',
          role: 'user',
          createdAt: new Date().toISOString(),
        };

        set({ users: [...users, newUser] });
        return { 
          success: true, 
          message: 'Registration successful. Please wait for admin approval.' 
        };
      },

      approveUser: (userId) => {
        const { users } = get();
        const updatedUsers = users.map(user =>
          user.id === userId ? { ...user, status: 'approved' } : user
        );
        set({ users: updatedUsers });
      },

      rejectUser: (userId) => {
        const { users } = get();
        const updatedUsers = users.map(user =>
          user.id === userId ? { ...user, status: 'rejected' } : user
        );
        set({ users: updatedUsers });
      },

      removeUser: (userId) => {
        const { users } = get();
        set({ users: users.filter(user => user.id !== userId) });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);