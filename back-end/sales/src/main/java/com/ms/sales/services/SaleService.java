package com.ms.sales.services;

import com.ms.sales.models.Sale;
import com.ms.sales.repositories.SaleRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SaleService {
    @Autowired
    final SaleRepository saleRepository;

    public SaleService(SaleRepository saleRepository) {
        this.saleRepository = saleRepository;
    }

    @Transactional
    public Sale save(Sale sale) {
        return saleRepository.save(sale);
    }

    public List<Sale> findAll() {
        return saleRepository.findAll();
    }

    public Optional<Sale> findById(Long id) {
        return saleRepository.findById(id);
    }
    
    public Optional<Sale> findByOrderId(Long orderId) {
        return saleRepository.findByOrderId(orderId);
    }

    @Transactional
    public void deleteById(Long id) {
        saleRepository.deleteById(id);
    }
}