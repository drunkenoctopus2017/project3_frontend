export class SystemUser {
    id: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    role: number;
    enabled: boolean;
    credentialsNonExpired: boolean;
    accountNonExpired: boolean;
    accountNonLocked: boolean;
}