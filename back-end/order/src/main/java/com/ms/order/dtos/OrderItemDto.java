package com.ms.order.dtos;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public record OrderItemDto(
        @NotNull Long productId,
        @NotNull @Min(1) Integer quantity,
        @NotNull BigDecimal unitPrice
) {}