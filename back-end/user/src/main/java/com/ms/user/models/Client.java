package com.ms.user.models;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.Embedded;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Map;

@Entity
@DiscriminatorValue("CLIENT")
@Getter
@Setter
@NoArgsConstructor
public class Client extends UserModel {
    private String nome;
    private String loja;
    private String razao;
    private String tipo;
    private String nomefantasia;
    private String finalidade;
    private String cnpj;
    private String ddd;
    private String telefone;
    private LocalDate abertura;
    private String contato;
    private String homepage;
    private Boolean ativo;
    private String codigo;
    
    /**
     * Atualiza o cliente com dados de um Map (pode ser um DTO convertido)
     * @param data Map contendo os dados a serem atualizados
     */
    public void updateFromMap(Map<String, Object> data) {
        if (data.containsKey("name")) this.setName((String) data.get("name"));
        if (data.containsKey("email")) this.setEmail((String) data.get("email"));
        if (data.containsKey("nome")) this.nome = (String) data.get("nome");
        if (data.containsKey("loja")) this.loja = (String) data.get("loja");
        if (data.containsKey("razao")) this.razao = (String) data.get("razao");
        if (data.containsKey("tipo")) this.tipo = (String) data.get("tipo");
        if (data.containsKey("nomefantasia")) this.nomefantasia = (String) data.get("nomefantasia");
        if (data.containsKey("finalidade")) this.finalidade = (String) data.get("finalidade");
        if (data.containsKey("cnpj")) this.cnpj = (String) data.get("cnpj");
        if (data.containsKey("ddd")) this.ddd = (String) data.get("ddd");
        if (data.containsKey("telefone")) this.telefone = (String) data.get("telefone");
        if (data.containsKey("contato")) this.contato = (String) data.get("contato");
        if (data.containsKey("homepage")) this.homepage = (String) data.get("homepage");
        if (data.containsKey("codigo")) this.codigo = (String) data.get("codigo");
        if (data.containsKey("ativo")) this.ativo = (Boolean) data.get("ativo");
        
        // Fix for the DateTimeParseException
        if (data.containsKey("abertura") && data.get("abertura") != null) {
            String aberturaStr = (String) data.get("abertura");
            // Only try to parse if the string is not empty
            if (aberturaStr != null && !aberturaStr.trim().isEmpty()) {
                this.abertura = LocalDate.parse(aberturaStr);
            } else {
                // Set to null if empty string is provided
                this.abertura = null;
            }
        }
        
        // Atualiza o endereço
        Address address = this.getAddress();
        if (address == null) {
            address = new Address();
            this.setAddress(address);
        }
        
        // Mapear "endereco" para "logradouro" se existir
        if (data.containsKey("endereco")) {
            address.setLogradouro((String) data.get("endereco"));
        } else if (data.containsKey("logradouro")) {
            address.setLogradouro((String) data.get("logradouro"));
        }
        
        if (data.containsKey("numero")) address.setNumero((String) data.get("numero"));
        if (data.containsKey("complemento")) address.setComplemento((String) data.get("complemento"));
        if (data.containsKey("bairro")) address.setBairro((String) data.get("bairro"));
        if (data.containsKey("cidade")) address.setCidade((String) data.get("cidade"));
        if (data.containsKey("estado")) address.setEstado((String) data.get("estado"));
        if (data.containsKey("cep")) address.setCep((String) data.get("cep"));
        if (data.containsKey("pais")) address.setPais((String) data.get("pais"));
        if (data.containsKey("codmunicipio")) address.setCodmunicipio((String) data.get("codmunicipio"));
    }
    
    /**
     * Cria um cliente a partir de um DTO como Map
     * @param data Dados para criar o cliente
     * @return Novo objeto Client
     */
    public static Client fromMap(Map<String, Object> data) {
        Client client = new Client();
        client.setUserType(UserType.CLIENT);
        client.updateFromMap(data);
        return client;
    }
}