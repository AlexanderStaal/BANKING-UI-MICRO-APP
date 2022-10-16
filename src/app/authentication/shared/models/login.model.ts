export class User {
    //Id: number | null;
    firstName: string;
    lastName: string;
    userName: string;
    password: string;
    token: string;
    role: string;
    email: string;
}

export class InternalUser {
    userName: string;
    token: string;
    role: string;
}

export class Login {
    userName: string;
    password: string;
}

export class InternalUserData {
    userName: string;
    role: string;
}

export class LoginStatus {
    loginStatus: string;
}