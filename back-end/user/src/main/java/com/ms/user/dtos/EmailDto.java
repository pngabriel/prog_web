package com.ms.user.dtos;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EmailDto {
    private Long id;
    private String emailTo;
    private String subject;
    private String text;
}