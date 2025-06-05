package com.ms.sales.dtos;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record SaleDto(
        @NotNull Long orderId,
        @NotNull @Positive Double totalValue,
        @NotNull String paymentMethod,
        @NotNull String paymentStatus
) {}