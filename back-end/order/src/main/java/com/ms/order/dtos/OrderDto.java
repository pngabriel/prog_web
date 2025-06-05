package com.ms.order.dtos;

import jakarta.validation.constraints.NotNull;
import java.util.List;

public record OrderDto(
        @NotNull Long clientId,
        @NotNull List<OrderItemDto> items,
        String notes
) {}