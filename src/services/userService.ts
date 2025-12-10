import api from '../api';

export interface User {
  id?: number;
  username: string;
  password?: string;
  email?: string;
  roles?: string[];
  enabled?: boolean;
}

const BASE_PATH = '/users';

class UserService {
  /** POST /api/users */
  async createUser(user: User): Promise<User> {
    const res = await api.post(BASE_PATH, user);
    return res.data;
  }

  /** PUT /api/users/{id} */
  async updateUser(id: number, user: User): Promise<User> {
    const res = await api.put(`${BASE_PATH}/${id}`, user);
    return res.data;
  }

  /** GET /api/users/{id} */
  async getUserById(id: number): Promise<User> {
    const res = await api.get(`${BASE_PATH}/${id}`);
    return res.data;
  }

  /** GET /api/users/username/{username} */
  async getUserByUsername(username: string): Promise<User> {
    const res = await api.get(`${BASE_PATH}/username/${username}`);
    return res.data;
  }

  /** GET /api/users */
  async getAllUsers(): Promise<User[]> {
    const res = await api.get(BASE_PATH);
    return res.data;
  }

  /** DELETE /api/users/{id} */
  async deleteUser(id: number): Promise<void> {
    await api.delete(`${BASE_PATH}/${id}`);
  }
}

export const userService = new UserService();
