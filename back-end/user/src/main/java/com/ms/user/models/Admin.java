package com.ms.user.models;

import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;

@Entity
@DiscriminatorValue("ADMIN") // Define que esta classe representa um administrador
@Getter
@Setter
public class Admin extends UserModel{
    private String department;
}
