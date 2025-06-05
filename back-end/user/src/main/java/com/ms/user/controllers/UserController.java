package com.ms.user.controllers;

import com.ms.user.dtos.AdminRecordDto;
import com.ms.user.dtos.ClientRecordDto;
import com.ms.user.dtos.UserRecordDto;
import com.ms.user.models.Admin;
import com.ms.user.models.Client;
import com.ms.user.models.UserModel;
import com.ms.user.models.UserType;
import com.ms.user.services.UserService;
import com.ms.user.utils.DtoConverter;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/users")
public class UserController {
    final UserService userService;

    public UserController(UserService userService){
        this.userService = userService;
    }

    @PostMapping("/client")
    public ResponseEntity<UserModel> saveClient(@RequestBody @Valid ClientRecordDto clientDto) {
        // Usar o conversor para transformar o DTO em entidade
        Client client = DtoConverter.toClient(clientDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(userService.save(client));
    }

    @PostMapping("/admin")
    public ResponseEntity<UserModel> saveAdmin(@RequestBody @Valid AdminRecordDto adminDto) {
        Admin admin = DtoConverter.toAdmin(adminDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(userService.save(admin));
    }

    @GetMapping
    public ResponseEntity<List<UserModel>> getAllUsers() {
        return ResponseEntity.status(HttpStatus.OK).body(userService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getUserById(@PathVariable(value = "id") Long id) {
        Optional<UserModel> userModelOptional = userService.findById(id);
        if (userModelOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuário não encontrado.");
        }
        return ResponseEntity.status(HttpStatus.OK).body(userModelOptional.get());
    }

    @PutMapping("/client/{id}")
    public ResponseEntity<Object> updateClient(@PathVariable(value = "id") Long id,
                                             @RequestBody @Valid ClientRecordDto clientDto) {
        Optional<UserModel> userModelOptional = userService.findById(id);
        if (userModelOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cliente não encontrado.");
        }
        
        if (!(userModelOptional.get() instanceof Client)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("O usuário encontrado não é um cliente.");
        }

        Client existingClient = (Client) userModelOptional.get();
        // Atualizar o cliente existente com dados do DTO
        DtoConverter.updateClient(existingClient, clientDto);
        
        return ResponseEntity.status(HttpStatus.OK).body(userService.update(existingClient));
    }

    @PutMapping("/admin/{id}")
    public ResponseEntity<Object> updateAdmin(@PathVariable(value = "id") Long id,
                                             @RequestBody @Valid AdminRecordDto adminDto) {
        Optional<UserModel> userModelOptional = userService.findById(id);
        if (userModelOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Admin não encontrado.");
        }
        
        if (!(userModelOptional.get() instanceof Admin)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("O usuário encontrado não é um admin.");
        }

        Admin existingAdmin = (Admin) userModelOptional.get();
        existingAdmin.setName(adminDto.name());
        existingAdmin.setEmail(adminDto.email());
        existingAdmin.setDepartment(adminDto.department());
        
        return ResponseEntity.status(HttpStatus.OK).body(userService.update(existingAdmin));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteUser(@PathVariable(value = "id") Long id) {
        Optional<UserModel> userModelOptional = userService.findById(id);
        if (userModelOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuário não encontrado.");
        }

        userService.deleteById(id);
        return ResponseEntity.status(HttpStatus.OK).body("Usuário deletado com sucesso.");
    }
}