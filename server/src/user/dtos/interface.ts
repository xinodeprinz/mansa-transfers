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

export interface SendInVoiceOptions {
  reference: string;
  to: string;
  subject: string;
  name: string;
}
