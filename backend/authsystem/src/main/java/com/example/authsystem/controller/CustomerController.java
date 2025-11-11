package com.example.authsystem.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/customer")
public class CustomerController {

    @GetMapping("/dashboard")
    @PreAuthorize("hasRole('CUSTOMER')")
    public Map<String, Object> getCustomerDashboard() {
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Welcome to Customer Dashboard");
        response.put("description", "Customers can view products and place orders");
        response.put("features", new String[]{
                "Browse Products",
                "Place Orders",
                "View Order History",
                "Manage Profile"
        });
        return response;
    }

    @GetMapping("/orders")
    @PreAuthorize("hasRole('CUSTOMER')")
    public Map<String, Object> getOrders() {
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Customer Orders");
        response.put("orders", new String[]{
                "Order #1001 - Laptop - $999",
                "Order #1002 - Mouse - $25",
                "Order #1003 - Keyboard - $75"
        });
        return response;
    }
}