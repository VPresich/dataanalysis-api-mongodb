import path from 'node:path';

export const SMTP = {
  SMTP_HOST: 'SMTP_HOST',
  SMTP_PORT: 'SMTP_PORT',
  SMTP_USER: 'SMTP_USER',
  SMTP_PASSWORD: 'SMTP_PASSWORD',
  SMTP_FROM: 'SMTP_FROM',
  SMTP_APIKEY: 'SMTP_APIKEY',
};

export const TEMPLATES_DIR = path.join(process.cwd(), 'src', 'templates');

export const CLOUDINARY = {
  CLOUD_NAME: 'CLOUDINARY_NAME',
  API_KEY: 'CLOUDINARY_API_KEY',
  API_SECRET: 'CLOUDINARY_API_SECRET',
};

export const TEMP_UPLOAD_DIR = path.join(process.cwd(), 'tmp');
export const UPLOAD_DIR = path.join(process.cwd(), 'uploads');

export const SWAGGER_PATH = path.join(process.cwd(), 'docs', 'swagger.json');

export const EMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const PHONE_PATTERN = /^\(\d{3}\) \d{3}-\d{4}$/;
export const NAME_PATTERN =
  /^[a-zA-Z0-9!@#$%^&*()_+={}[\]:;"'<>,.?|`~\s-]{2,32}$/;

export const DEF_THEME = 'green';

export const AVATAR_SIZE = 68;

export const PATH_DEF_VIOLET_AVATAR =
  'https://res.cloudinary.com/dirtbd4yk/image/upload/v1717687718/def-avatar-violet_1x_f2b0ft.jpg';

export const PATH_DEF_LIGHT_AVATAR =
  'https://res.cloudinary.com/dirtbd4yk/image/upload/v1717687717/def-avatar-light_1x_fkwy6u.jpg';

export const PATH_DEF_BLACK_AVATAR =
  'https://res.cloudinary.com/dirtbd4yk/image/upload/v1717687719/def-avatar-dark_1x_mg7mpo.jpg';

export const PATH_DEF_AVATAR =
  'https://res.cloudinary.com/dirtbd4yk/image/upload/v1737918124/defaultUser_ddbbfk.png';

export const NAME_ERR_MESSAGE =
  'must contain only letters, numbers, and special characters, and be between 2 and 32 characters long';

export const NUMERIC_FIELDS = new Set(['X', 'Y', 'Z', 'Time', 'TrackNum']);
