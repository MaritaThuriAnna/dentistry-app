package com.example.User_Management.Repository;

import com.example.User_Management.Entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
@EnableJpaRepositories
public interface UserRepository extends JpaRepository<User, UUID> {
    User findFirstByUserId(UUID id);
    User findFirstByEmail(String email);
}
