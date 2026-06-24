package com.udumalpet.solutions.request;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface ServiceRequestRepository extends MongoRepository<ServiceRequest, String> {
}

