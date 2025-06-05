package com.ms.stock.controllers;

import com.ms.stock.dtos.StockRecordDto;
import com.ms.stock.models.StockModel;
import com.ms.stock.services.StockService;
import jakarta.validation.Valid;
import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/stocks")
public class StockController {
    final StockService stockService;

    public StockController(StockService stockService) {
        this.stockService = stockService;
    }

    @PostMapping
    public ResponseEntity<StockModel> saveStock(@RequestBody @Valid StockRecordDto stockDto) {
        StockModel stockModel = new StockModel();
        BeanUtils.copyProperties(stockDto, stockModel);
        return ResponseEntity.status(HttpStatus.CREATED).body(stockService.save(stockModel));
    }



    @GetMapping
    public ResponseEntity<List<StockModel>> getAllStocks() {
        return ResponseEntity.status(HttpStatus.OK).body(stockService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getStockById(@PathVariable(value = "id") UUID id) {
        Optional<StockModel> stockOptional = stockService.findById(id);
        if (stockOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Item de estoque não encontrado.");
        }
        return ResponseEntity.status(HttpStatus.OK).body(stockOptional.get());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> updateStock(@PathVariable(value = "id") UUID id,
                                              @RequestBody @Valid StockRecordDto stockDto) {
        Optional<StockModel> stockOptional = stockService.findById(id);
        if (stockOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Item de estoque não encontrado.");
        }

        StockModel existingStock = stockOptional.get();
        BeanUtils.copyProperties(stockDto, existingStock, "id");
        return ResponseEntity.status(HttpStatus.OK).body(stockService.update(existingStock));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteStock(@PathVariable(value = "id") UUID id) {
        Optional<StockModel> stockOptional = stockService.findById(id);
        if (stockOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Item de estoque não encontrado.");
        }

        stockService.deleteById(id);
        return ResponseEntity.status(HttpStatus.OK).body("Item de estoque deletado com sucesso.");
    }
}