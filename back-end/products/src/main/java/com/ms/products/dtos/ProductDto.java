package com.ms.products.dtos;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record ProductDto(
        @NotBlank String name,
        @NotBlank String category,
        @NotBlank String description,
        @NotNull @Min(0) double salePrice,
        double rating,
        @NotNull @Min(0) int stock,
        @NotNull String status
) {}
