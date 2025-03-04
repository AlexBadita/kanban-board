package com.todo.todo.services;

import com.todo.todo.models.Task;
import com.todo.todo.repository.TaskRepository;
import com.todo.todo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaskService {
    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private UserRepository userRepository;

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public List<Task> getTasksByUser(Long userId) {
        return taskRepository.findByUserId(userId);
    }

    public Task createTaskForUser(Long userId, Task task) {
        return userRepository.findById(userId).map(user -> {
            task.setUser(user);
            return taskRepository.save(task);
        }).orElse(null);
    }

    public Optional<Task> getTaskById(Long id) {
        return taskRepository.findById(id);
    }

    public Optional<Task> getTaskByUserAndId(long userId, long taskId) {
        return taskRepository.findByIdAndUserId(taskId, userId);
    }

    public Task updateUserTask(Long userId, Long taskId, Task task) {
        return taskRepository.findByIdAndUserId(taskId, userId).map(existingTask -> {
            if (task.getTitle() != null) existingTask.setTitle(task.getTitle());
            if (task.getDescription() != null) existingTask.setDescription(task.getDescription());
            if (task.getStatus() != null) existingTask.setStatus(task.getStatus());
            return taskRepository.save(existingTask);
        }).orElse(null);
    }

    public boolean deleteUserTask(Long userId, Long taskId) {
        return taskRepository.findByIdAndUserId(taskId, userId).map(task -> {
            taskRepository.delete(task);
            return true;
        }).orElse(false);
    }

    public Task moveTask(Long userId, Long taskId, String newStatus) {
        return taskRepository.findByIdAndUserId(taskId, userId).map(task -> {
            task.setStatus(newStatus);
            return taskRepository.save(task);
        }).orElse(null);
    }
}
