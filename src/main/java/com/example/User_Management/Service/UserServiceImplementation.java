package com.example.User_Management.Service;

import com.example.User_Management.Entities.User;
import com.example.User_Management.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
@Service
public class UserServiceImplementation implements UserService{
    @Autowired
    public UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void Insert(User user) {
        String hashedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(hashedPassword);
        userRepository.save(user);
    }
    @Override
    public List<User> ReadAll() {
        return userRepository.findAll();
    }

    @Override
    public User Update(User user) {
        return userRepository.save(user);
    }

    @Override
    public User Delete(UUID id) {
        User userToDelete = userRepository.findFirstByUserId(id);
        if (userToDelete != null){
            userRepository.delete(userToDelete);
        }
        return userToDelete;
    }

    @Override
    public User findUserById(UUID id) {
        return userRepository.findFirstByUserId(id);
    }

    @Override
    public User findUserByEmail(String email) {
        return userRepository.findFirstByEmail(email);
    }
}
