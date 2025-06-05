package com.ms.user.dtos;

import com.ms.user.models.UserType;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record ClientRecordDto(
        String name,
        String email,
        UserType userType,
        String loja,
        String razao,
        String tipo,
        String nomefantasia,
        String finalidade,
        String cnpj,
        String ddd,
        String telefone,
        String abertura,  // String para facilitar a conversão
        String contato,
        String homepage,
        Boolean ativo,
        String codigo,
        
        // Campo "endereco" como vem na requisição
        String endereco,
        String numero,
        String complemento,
        String bairro,
        String cidade,
        String estado,
        String cep,
        String pais,
        String codmunicipio
) {
    // Este construtor é implicitamente gerado pelo Java,
    // não precisamos implementá-lo explicitamente
}