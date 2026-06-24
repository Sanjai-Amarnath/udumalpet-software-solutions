package com.udumalpet.solutions.request;

import java.time.Instant;

public record ServiceRequestResponse(
        String id,
        Instant createdAt,
        String message
) {
}

