export class SystemUser {
    id: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    role: {id: number, name: string};
    enabled: boolean;
    credentialsNonExpired: boolean;
    accountNonExpired: boolean;
    accountNonLocked: boolean;
   
}
