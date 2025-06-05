package com.ms.email.services;

import com.ms.email.enums.StatusEmail;
import com.ms.email.models.EmailModel;
import com.ms.email.repositories.EmailRepository;
import com.sun.mail.smtp.SMTPSendFailedException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class EmailService {
    final EmailRepository emailRepository;
    final JavaMailSender emailSender;
    public EmailService(EmailRepository emailRepository, JavaMailSender emailSender){
        this.emailRepository = emailRepository;
        this.emailSender = emailSender;
    }
    @Value(value="${spring.mail.username}")
    private String emailFrom;

    @Transactional
    public EmailModel sendEmail(EmailModel emailModel) {
        try {
            // Padronize o endereço de e-mail
            String normalizedEmailTo = emailModel.getEmailTo().trim();

            emailModel.setSendDateEmail(LocalDateTime.now());

            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(emailFrom);
            message.setTo(normalizedEmailTo);
            message.setSubject(emailModel.getSubject());
            message.setText(emailModel.getText());

            emailSender.send(message);

            emailModel.setEmailFrom(emailFrom);
            emailModel.setStatusEmail(StatusEmail.SENT);
        } catch (MailException e) {
            // Log detalhado
            e.printStackTrace();
            System.err.println("Erro ao enviar e-mail: " + e.getMessage());

            emailModel.setStatusEmail(StatusEmail.ERROR);
        } finally {
            return emailRepository.save(emailModel);
        }
    }

}
