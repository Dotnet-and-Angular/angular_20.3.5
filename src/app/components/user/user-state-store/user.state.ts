import { IUser } from "../dashboard/interface/person";
import { authToken, User } from "./user.interface";


export const initialState: User = {
    username: '',
    role: '',
    persons: [] as IUser[],
    profile: {
        firstName: 'John',
        lastName: 'Doe',
        bio: 'Senior Software Developer',
        email: 'john.doe@example.com',
        phone: '+1 (555) 123-4567',
        location: 'San Francisco, CA',
        department: 'Engineering',
        role: 'Administrator',
        memberSince: 'January 15, 2024',
        status: 'Active',
        lastLogin: '2 hours ago',
        verified: true
    },
    analytics: {
        stats: [
            { label: 'Total Users', value: '12,543' },
            { label: 'Active Users', value: '3,421' },
            { label: 'Revenue', value: '$45,678' },
            { label: 'Avg. Session', value: '4m 32s' }
        ],
        userGrowth: [
            { label: 'Jan', value: 400 },
            { label: 'Feb', value: 520 },
            { label: 'Mar', value: 680 },
            { label: 'Apr', value: 750 },
            { label: 'May', value: 920 },
            { label: 'Jun', value: 1050 }
        ],
        performanceData: [
            { label: 'Jan', value: 85 },
            { label: 'Feb', value: 88 },
            { label: 'Mar', value: 92 },
            { label: 'Apr', value: 89 },
            { label: 'May', value: 94 },
            { label: 'Jun', value: 96 }
        ]
    }
};

export const initialAuthToken: authToken = {
    token: '',
    role: ''
};

