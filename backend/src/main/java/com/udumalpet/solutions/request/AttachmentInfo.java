package com.udumalpet.solutions.request;

public record AttachmentInfo(
        String fileId,
        String originalFilename,
        String contentType,
        long size
) {
}

