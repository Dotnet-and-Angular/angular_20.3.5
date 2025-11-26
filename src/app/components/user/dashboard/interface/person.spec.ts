import { IUser } from './person';

describe('IUser Interface', () => {
    it('should create a valid IUser object', () => {
        const user: IUser = {
            id: 1,
            name: 'John Doe',
            role: 'admin',
            permissions: ['read', 'write', 'delete']
        };

        expect(user).toBeDefined();
        expect(user.id).toBe(1);
        expect(user.name).toBe('John Doe');
        expect(user.role).toBe('admin');
        expect(user.permissions.length).toBe(3);
    });

    it('should handle empty permissions array', () => {
        const user: IUser = {
            id: 2,
            name: 'Jane Doe',
            role: 'user',
            permissions: []
        };

        expect(user.permissions).toEqual([]);
    });
});
