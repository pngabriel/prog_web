package com.ms.stock.services;

import com.ms.stock.models.StockModel;
import com.ms.stock.producers.StockProducer;
import com.ms.stock.repositories.StockRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class StockService {
    @Autowired
    final StockRepository stockRepository;
    final StockProducer stockProducer;

    public StockService(StockRepository stockRepository, StockProducer stockProducer){
        this.stockRepository = stockRepository;
        this.stockProducer = stockProducer;
    }

    @Transactional
    public StockModel save(StockModel stock){
        stock = stockRepository.save(stock);
//        stockProducer.publishStockUpdate(stock);
        return stockRepository.save(stock);
    }

    public List<StockModel> findAll() {
        return stockRepository.findAll();
    }

    public Optional<StockModel> findById(UUID id) {
        return stockRepository.findById(id);
    }

    @Transactional
    public void delete(StockModel stock) {
        stockRepository.delete(stock);
    }

    @Transactional
    public void deleteById(UUID id) {
        stockRepository.deleteById(id);
    }

    @Transactional
    public StockModel update(StockModel stock) {
        return stockRepository.save(stock);
    }
}
