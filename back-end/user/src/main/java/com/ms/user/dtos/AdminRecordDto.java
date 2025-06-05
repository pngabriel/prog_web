package com.ms.user.dtos;

import com.ms.user.models.UserType;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record AdminRecordDto(
        @NotBlank String name,
        @NotBlank @Email String email,
        @NotNull UserType userType,
        @NotBlank String department
) {
}