package com.example.User_Management.Entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.management.relation.Role;
import java.io.Serializable;
import java.util.UUID;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(columnDefinition = "BINARY(16)")
    private UUID userId;
    private String surname;
    private String forname;

    @Column(unique = true, nullable = false)
    private String email;

    private String telNr;
    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;

    private String profilePictureUrl;

    public enum Role {
        ADMIN, DENTIST, PATIENT
    }
}
