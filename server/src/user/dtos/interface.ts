export interface UserRequest extends Request {
  user: { sub: string };
}

export interface MansaAuthenticate {
  message: string;
  data: {
    accessToken: string;
    expiresIn: number;
  };
}
