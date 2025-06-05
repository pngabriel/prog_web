package com.ms.user.utils;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ms.user.dtos.AdminRecordDto;
import com.ms.user.dtos.ClientRecordDto;
import com.ms.user.models.Admin;
import com.ms.user.models.Client;

import java.util.Map;

/**
 * Utilitário para converter DTOs em entidades e vice-versa
 */
public class DtoConverter {
    private static final ObjectMapper mapper = new ObjectMapper();
    
    /**
     * Converte um ClientRecordDto para um objeto Client
     */
    public static Client toClient(ClientRecordDto dto) {
        // Converter o DTO para um Map para facilitar o acesso aos campos
        Map<String, Object> data = mapper.convertValue(dto, Map.class);
        return Client.fromMap(data);
    }
    
    /**
     * Atualiza um Client existente com dados de um DTO
     */
    public static void updateClient(Client client, ClientRecordDto dto) {
        Map<String, Object> data = mapper.convertValue(dto, Map.class);
        client.updateFromMap(data);
    }
    
    /**
     * Converte um AdminRecordDto para um objeto Admin
     */
    public static Admin toAdmin(AdminRecordDto dto) {
        Admin admin = new Admin();
        admin.setName(dto.name());
        admin.setEmail(dto.email());
        admin.setUserType(dto.userType());
        admin.setDepartment(dto.department());
        return admin;
    }
}