package com.ms.stock.dtos;

import java.math.BigDecimal;

public record StockRecordDto(
        String name,
        int quantity,
        BigDecimal price
) {
}
