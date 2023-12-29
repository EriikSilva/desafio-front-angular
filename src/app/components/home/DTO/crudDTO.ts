export interface MensagemRetorno{
    dados:any;
    mensagem?:string;
    status?:boolean;
}

export interface PostUserDTO {
    nome:         string;
    sobrenome:    string;
    email:        string;
    senha:        string;
    nivel_Acesso: string;
}

export interface PutUserDTO {
    id:           number;
    nome:         string;
    sobrenome:    string;
    email:        string;
    senha:        string;
    nivel_Acesso: string;
}


export interface UsuarioDTO {
    id:                number;
    nome:              string;
    sobrenome:         string;
    email:             string;
    senha:             string;
    nivel_Acesso:      string;
    dataDeCriacao:     string;
    dataDeAtualizacao: string;
}