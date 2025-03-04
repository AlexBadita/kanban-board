package com.todo.todo.controllers;

import com.todo.todo.models.Task;
import com.todo.todo.services.TaskService;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api")
@CrossOrigin(origins = "http://localhost:3000")
public class TaskController {
    @Autowired
    private TaskService taskService;

    // Get all tasks
    @GetMapping("/tasks")
    public List<Task> getAllTasks() {
        return taskService.getAllTasks();
    }

    // Get all tasks for a specific user
    @GetMapping("/users/{userId}/tasks")
    public List<Task> getUserTasks(@PathVariable Long userId) {
        return taskService.getTasksByUser(userId);
    }

    // Create task under a specific user
    @PostMapping("/users/{userId}/tasks")
    public ResponseEntity<Task> createTaskForUser(@PathVariable Long userId, @RequestBody Task task) {
        Task createdTask = taskService.createTaskForUser(userId, task);
        return ResponseEntity.ok(createdTask);
    }

    // Get a task by its ID
    @GetMapping("/tasks/{id}")
    public ResponseEntity<Task> getTaskById(@PathVariable Long id) {
        Optional<Task> task = taskService.getTaskById(id);
        return task.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Get a specific task of a user
    @GetMapping("/users/{userId}/tasks/{taskId}")
    public ResponseEntity<Task> getUserTask(@PathVariable Long userId, @PathVariable Long taskId) {
        return taskService.getTaskByUserAndId(userId, taskId)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Update a specific task of a user
    @PutMapping("/users/{userId}/tasks/{taskId}")
    public ResponseEntity<Task> updateUserTask(@PathVariable Long userId, @PathVariable Long taskId, @RequestBody Task task) {
        Task updatedTask = taskService.updateUserTask(userId, taskId, task);
        return updatedTask != null ? ResponseEntity.ok(updatedTask) : ResponseEntity.notFound().build();
    }

    // Delete a specific task of a user
    @DeleteMapping("/users/{userId}/tasks/{taskId}")
    public ResponseEntity<Void> deleteUserTask(@PathVariable Long userId, @PathVariable Long taskId) {
        boolean deleted = taskService.deleteUserTask(userId, taskId);
        return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }

    @PutMapping("/users/{userId}/tasks/{taskId}/move")
    public ResponseEntity<Task> moveTask(@PathVariable Long userId, @PathVariable Long taskId, @RequestBody MoveTaskRequest request) {
        Task movedTask = taskService.moveTask(userId, taskId, request.getNewStatus());

        if (movedTask != null) {
            return ResponseEntity.ok(movedTask);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @Data
    static class MoveTaskRequest {
        @Getter @Setter
        private String newStatus;
    }
}
