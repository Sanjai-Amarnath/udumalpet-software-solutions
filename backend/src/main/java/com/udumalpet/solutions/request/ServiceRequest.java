package com.udumalpet.solutions.request;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("service_requests")
public class ServiceRequest {
    @Id
    private String id;

    private String fullName;
    private String email;
    private String phone;
    private String companyName;
    private String serviceRequired;
    private String projectTitle;
    private String requirementDescription;
    private String problemToSolve;
    private String users;
    private String existingSystem;
    private String featuresRequired;
    private String referenceLinks;
    private String expectedCompletionDate;
    private String estimatedBudgetRange;
    private String preferredContactMethod;
    private String bestTimeToContact;
    private String additionalNotes;
    private boolean consent;
    private String deviceType;
    private String brandModel;
    private String operatingSystem;
    private String processor;
    private String ram;
    private String issueDescription;
    private String issueStartedAt;
    private String errorMessages;
    private String canBoot;
    private Instant createdAt = Instant.now();
    private List<AttachmentInfo> attachments = new ArrayList<>();

    public static ServiceRequest from(ServiceRequestDto dto, List<AttachmentInfo> attachments) {
        ServiceRequest request = new ServiceRequest();
        request.fullName = dto.fullName();
        request.email = dto.email();
        request.phone = dto.phone();
        request.companyName = dto.companyName();
        request.serviceRequired = dto.serviceRequired();
        request.projectTitle = dto.projectTitle();
        request.requirementDescription = dto.requirementDescription();
        request.problemToSolve = dto.problemToSolve();
        request.users = dto.users();
        request.existingSystem = dto.existingSystem();
        request.featuresRequired = dto.featuresRequired();
        request.referenceLinks = dto.referenceLinks();
        request.expectedCompletionDate = dto.expectedCompletionDate();
        request.estimatedBudgetRange = dto.estimatedBudgetRange();
        request.preferredContactMethod = dto.preferredContactMethod();
        request.bestTimeToContact = dto.bestTimeToContact();
        request.additionalNotes = dto.additionalNotes();
        request.consent = dto.consent();
        request.deviceType = dto.deviceType();
        request.brandModel = dto.brandModel();
        request.operatingSystem = dto.operatingSystem();
        request.processor = dto.processor();
        request.ram = dto.ram();
        request.issueDescription = dto.issueDescription();
        request.issueStartedAt = dto.issueStartedAt();
        request.errorMessages = dto.errorMessages();
        request.canBoot = dto.canBoot();
        request.attachments = attachments;
        return request;
    }

    public String getId() {
        return id;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }
}

