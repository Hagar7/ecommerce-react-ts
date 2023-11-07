export interface registerUser {
  name: string;
  email: string;
  password: string;
  rePassword: string;
  phone: string;
  message?: string | null;
}

export interface authUser {
  email: string;
  name: string;
  role: string;
}

export interface registerResponse {
  message: string;
  user: authUser;
  token: string;
}

export interface loginUser {
  email: string;
  password: string;
  message?: string | null;
  token?: string;
}
