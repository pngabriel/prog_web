CREATE TABLE corelink_users (
    uuid UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    user_type VARCHAR(255) NOT NULL,
    nome VARCHAR(255),
    loja VARCHAR(255),
    razao VARCHAR(255),
    tipo VARCHAR(255),
    nomefantasia VARCHAR(255),
    finalidade VARCHAR(255),
    cnpj VARCHAR(255),
    ddd VARCHAR(255),
    telefone VARCHAR(255),
    abertura DATE,
    contato VARCHAR(255),
    homepage VARCHAR(255),
    ativo BOOLEAN,
    department VARCHAR(255),
    street VARCHAR(255),
    city VARCHAR(255),
    state VARCHAR(255),
    postal_code VARCHAR(20),
    country VARCHAR(255)
);