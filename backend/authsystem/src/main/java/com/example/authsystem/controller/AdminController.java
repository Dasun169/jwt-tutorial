package com.example.authsystem.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @GetMapping("/dashboard")
    @PreAuthorize("hasRole('ADMIN')")
    public Map<String, Object> getAdminDashboard() {
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Welcome to Admin Dashboard");
        response.put("description", "Admins have full system access");
        response.put("features", new String[]{
                "Manage Users",
                "View All Orders",
                "System Configuration",
                "Generate Reports"
        });
        return response;
    }

    @GetMapping("/users")
    @PreAuthorize("hasRole('ADMIN')")
    public Map<String, Object> getAllUsers() {
        Map<String, Object> response = new HashMap<>();
        response.put("message", "All System Users");
        response.put("users", new String[]{
                "john_customer - Role: CUSTOMER",
                "jane_vendor - Role: VENDOR",
                "admin_user - Role: ADMIN"
        });
        return response;
    }

    @GetMapping("/stats")
    @PreAuthorize("hasRole('ADMIN')")
    public Map<String, Object> getSystemStats() {
        Map<String, Object> response = new HashMap<>();
        response.put("totalUsers", 150);
        response.put("totalVendors", 25);
        response.put("totalCustomers", 120);
        response.put("totalOrders", 450);
        return response;
    }
}