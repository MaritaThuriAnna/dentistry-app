package com.example.User_Management.Entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.UUID;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Patient implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(columnDefinition = "BINARY(16)")
    private UUID patientId;
    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    private String dateOfBirth;
    private String address;
    private String medicalHistory;
    private String otherPatientInfo;
}
