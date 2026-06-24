package com.udumalpet.solutions.request;

import java.io.IOException;
import java.util.List;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/service-requests")
@CrossOrigin(origins = "${app.frontend-origin}")
public class ServiceRequestController {
    private final ServiceRequestService service;

    public ServiceRequestController(ServiceRequestService service) {
        this.service = service;
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public ServiceRequestResponse createRequest(
            @Valid @RequestPart("request") ServiceRequestDto request,
            @RequestPart(value = "files", required = false) List<MultipartFile> files
    ) throws IOException {
        ServiceRequest saved = service.save(request, files);
        return new ServiceRequestResponse(saved.getId(), saved.getCreatedAt(), "Service request received");
    }
}

