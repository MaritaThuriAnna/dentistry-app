package com.example.User_Management.Controller;

import com.example.User_Management.Entities.User;
import com.example.User_Management.Service.UserServiceImplementation;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@CrossOrigin
@RequestMapping("/User")
public class UserController {
    @Autowired
    private final UserServiceImplementation userServiceImplementation;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/Insert")
    public void insert(@RequestBody User user){
        System.out.println(user);
        userServiceImplementation.Insert(user);
    }

    @GetMapping("/ReadAll")
    public ResponseEntity<List<User>> readAll(){
        List<User> users = userServiceImplementation.ReadAll();
        return ResponseEntity.status(HttpStatus.OK).body(users);
    }

    @PutMapping("/Update")
    public ResponseEntity<User> update(@RequestBody User user){
        User updatedUser = userServiceImplementation.Update(user);
        return ResponseEntity.status(HttpStatus.OK).body(updatedUser);
    }

    @DeleteMapping("/Delete/{id}")
    public ResponseEntity<User> delete(@PathVariable("id") UUID id){
        User user = userServiceImplementation.Delete(id);
        return ResponseEntity.status(HttpStatus.OK).body(user);
    }

    @GetMapping("/findUserById/{id}")
    public ResponseEntity<User> findUserById(@PathVariable UUID id) {
        User user = userServiceImplementation.findUserById(id);
        return ResponseEntity.status(HttpStatus.OK).body(user);
    }

    //@CrossOrigin(origins = "http://localhost:4200")
//    @PostMapping("/Login")
//    public ResponseEntity<?> login(@RequestParam String userEmail, @RequestParam String userPassword){
//        User user = userServiceImplementation.findUserByEmail(userEmail);
//        if(user != null && passwordEncoder.matches(userPassword, user.getPassword())){
//            User userWithoutPassword = new User();
//            userWithoutPassword.setUserId(user.getUserId());
//            userWithoutPassword.setSurname(user.getSurname());
//            userWithoutPassword.setForname(user.getForname());
//            userWithoutPassword.setEmail(user.getEmail());
//            userWithoutPassword.setTelNr(user.getTelNr());
//            userWithoutPassword.setRole(user.getRole());
//            userWithoutPassword.setProfilePictureUrl(user.getProfilePictureUrl());
//            return ResponseEntity.ok(userWithoutPassword);
//        }
//        else {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
//        }
//    }
    @PostMapping("/User/Login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> payload) {
        String userEmail = payload.get("userEmail");
        String userPassword = payload.get("userPassword");
        System.out.println("Received login request for email: " + userEmail);
        User user = userServiceImplementation.findUserByEmail(userEmail);
        if (user != null && passwordEncoder.matches(userPassword, user.getPassword())) {
            User userWithoutPassword = new User();
            userWithoutPassword.setUserId(user.getUserId());
            userWithoutPassword.setSurname(user.getSurname());
            userWithoutPassword.setForname(user.getForname());
            userWithoutPassword.setEmail(user.getEmail());
            userWithoutPassword.setTelNr(user.getTelNr());
            userWithoutPassword.setRole(user.getRole());
            userWithoutPassword.setProfilePictureUrl(user.getProfilePictureUrl());
            return ResponseEntity.ok(userWithoutPassword);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        }
    }
}
