package com.ms.sales.repositories;

import com.ms.sales.models.Sale;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SaleRepository extends JpaRepository<Sale, Long> {
    Optional<Sale> findByOrderId(Long orderId);
}