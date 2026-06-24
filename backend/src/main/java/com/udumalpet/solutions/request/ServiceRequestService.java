package com.udumalpet.solutions.request;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class ServiceRequestService {
    private final ServiceRequestRepository repository;
    private final GridFsTemplate gridFsTemplate;

    public ServiceRequestService(ServiceRequestRepository repository, GridFsTemplate gridFsTemplate) {
        this.repository = repository;
        this.gridFsTemplate = gridFsTemplate;
    }

    public ServiceRequest save(ServiceRequestDto dto, List<MultipartFile> files) throws IOException {
        List<AttachmentInfo> attachments = storeAttachments(files);
        return repository.save(ServiceRequest.from(dto, attachments));
    }

    private List<AttachmentInfo> storeAttachments(List<MultipartFile> files) throws IOException {
        List<AttachmentInfo> attachments = new ArrayList<>();
        if (files == null) {
            return attachments;
        }

        for (MultipartFile file : files) {
            if (file.isEmpty()) {
                continue;
            }
            ObjectId fileId = gridFsTemplate.store(file.getInputStream(), file.getOriginalFilename(), file.getContentType());
            attachments.add(new AttachmentInfo(
                    fileId.toHexString(),
                    file.getOriginalFilename(),
                    file.getContentType(),
                    file.getSize()
            ));
        }
        return attachments;
    }
}

