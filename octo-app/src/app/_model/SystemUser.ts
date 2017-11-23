import { UserRole } from "./UserRole";

export class SystemUser {
    id: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    role: UserRole;
    enabled: boolean;
    credentialsNonExpired: boolean;
    accountNonExpired: boolean;
    accountNonLocked: boolean;
}