package com.todo.todo.services;

import com.todo.todo.models.User;
import com.todo.todo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

    public Optional<User> getUserById(Long id){
        return userRepository.findById(id);
    }

    public Optional<User> getUserByEmail(String email){
        return userRepository.findByEmail(email);
    }

    public User createUser(User user){
        return userRepository.save(user);
    }

    public User updateUser(Long id, User user){
        if(userRepository.findById(id).isPresent()){
            user.setId(id);
            return userRepository.save(user);
        }
        return null;
    }

    @Transactional
    public void deleteUser(Long id){
        userRepository.deleteById(id);
    }
}
