export interface Blog {
    blog_id: number;
    titulo: string;
    contenido: string;
    fecha_lanzamiento: Date;
    etiqueta: string;
    autor: Autor;
}

export interface Autor extends Usuario {
    blogsList: Blog[];
}

export interface Lector extends Usuario {
    
}

export interface Usuario {
    id: number;
    username: string;
    enabled: boolean;
    accountNotExpired: boolean;
    accountNotLocked: boolean;
    credentialsNotExpired: boolean;
    rolesList: Role[];
}

export interface Role {
    id: number;
    role: string;
    permissionList: Permission[];
}

export interface Permission {
    id: number;
    permissionName: string;
}