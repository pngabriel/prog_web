package com.ms.stock.repositories;

import com.ms.stock.models.StockModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface StockRepository extends JpaRepository<StockModel, UUID> {
}
