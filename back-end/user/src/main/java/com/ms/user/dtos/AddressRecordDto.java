package com.ms.user.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import com.ms.user.models.UserType;
import jakarta.validation.constraints.NotNull;

public record AddressRecordDto(
    String logradouro,
    String numero,
    String complemento,
    String bairro,
    String cidade,
    String estado,
    String cep,
    String pais,
    String codmunicipio
) {
}