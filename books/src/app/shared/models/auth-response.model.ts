import { UserViewModel } from './user.model';

export interface AuthResponseModel {
    token: string;
    expiresIn: number;
    user: UserViewModel;
    role?: string;
}