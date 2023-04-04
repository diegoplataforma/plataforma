export enum TYPE_INPUT {
    TEXT = "text",
    PASSWORD = "password"
}

export enum EXPRESIONES_REGULARES {
    CONTRASENA_SEGURA = ".{7,}",
    CORREO = "^[^@\s]+@[^@\s]+\.[^@\s]+$"
}

export enum TIPO_USUARIO {
    OFERTA_ID = "Iae4nALYkC1rROCX7KB9",
    DEMANDA_ID = "KZrm3Hq2dLrPGr5IOyXh",
    OFERTA = "oferta",
    DEMANDA = "demanda"
}

export enum FIRESTORE_TABLES {
    USUARIOS = "usuarios",
    TIPO_USUARIOS = "tipo_usuario"
}

export enum ERRORES_FIREBASE {
    AUTH_USER_NOT_FOUND = "auth/user-not-found",
    AUTH_TOO_MANY_REQUEST = "auth/too-many-requests",
    AUTH_CLOSED_BY_USER = "auth/popup-closed-by-user"
}

export enum PROVIDER_ID {
    PASSWORD = "password",
    GOOGLE = "google.com"
}