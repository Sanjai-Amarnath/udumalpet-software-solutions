package com.udumalpet.solutions.request;

import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record ServiceRequestDto(
        @NotBlank String fullName,
        @Email @NotBlank String email,
        @NotBlank String phone,
        String companyName,
        @NotBlank String serviceRequired,
        @NotBlank String projectTitle,
        @NotBlank String requirementDescription,
        String problemToSolve,
        String users,
        String existingSystem,
        String featuresRequired,
        String referenceLinks,
        String expectedCompletionDate,
        String estimatedBudgetRange,
        String preferredContactMethod,
        String bestTimeToContact,
        String additionalNotes,
        @AssertTrue boolean consent,
        String deviceType,
        String brandModel,
        String operatingSystem,
        String processor,
        String ram,
        String issueDescription,
        String issueStartedAt,
        String errorMessages,
        String canBoot
) {
}

