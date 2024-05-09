export interface Role{
    rolId : string;
    rolName : string;
}

export interface RespuestaRol {
    statusCode: number;
    message:    string;
    data:       Role[];
}