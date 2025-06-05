package com.ms.sales.controllers;

import com.ms.sales.dtos.SaleDto;
import com.ms.sales.models.Sale;
import com.ms.sales.services.SaleService;
import jakarta.validation.Valid;
import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/sales")
public class SaleController {
    final SaleService saleService;

    public SaleController(SaleService saleService) {
        this.saleService = saleService;
    }

    @PostMapping
    public ResponseEntity<Sale> saveSale(@RequestBody @Valid SaleDto saleDto) {
        Sale sale = new Sale();
        BeanUtils.copyProperties(saleDto, sale);
        sale.setPaymentDate(LocalDateTime.now());
        return ResponseEntity.status(HttpStatus.CREATED).body(saleService.save(sale));
    }

    @GetMapping
    public ResponseEntity<List<Sale>> getAllSales() {
        return ResponseEntity.status(HttpStatus.OK).body(saleService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getSaleById(@PathVariable(value = "id") Long id) {
        Optional<Sale> saleOptional = saleService.findById(id);
        if (saleOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Sale not found.");
        }
        return ResponseEntity.status(HttpStatus.OK).body(saleOptional.get());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteSale(@PathVariable(value = "id") Long id) {
        Optional<Sale> saleOptional = saleService.findById(id);
        if (saleOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Sale not found.");
        }

        saleService.deleteById(id);
        return ResponseEntity.status(HttpStatus.OK).body("Sale deleted successfully.");
    }
    
    @GetMapping("/order/{orderId}")
    public ResponseEntity<Object> getSaleByOrderId(@PathVariable(value = "orderId") Long orderId) {
        Optional<Sale> saleOptional = saleService.findByOrderId(orderId);
        if (saleOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Sale not found for this order.");
        }
        return ResponseEntity.status(HttpStatus.OK).body(saleOptional.get());
    }
}