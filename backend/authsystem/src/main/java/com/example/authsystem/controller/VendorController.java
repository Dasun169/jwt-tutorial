package com.example.authsystem.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/vendor")
public class VendorController {

    @GetMapping("/dashboard")
    @PreAuthorize("hasRole('VENDOR')")
    public Map<String, Object> getVendorDashboard() {
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Welcome to Vendor Dashboard");
        response.put("description", "Vendors can manage products and view sales");
        response.put("features", new String[]{
                "Add Products",
                "Update Inventory",
                "View Sales Reports",
                "Manage Orders"
        });
        return response;
    }

    @GetMapping("/products")
    @PreAuthorize("hasRole('VENDOR')")
    public Map<String, Object> getProducts() {
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Vendor Products");
        response.put("products", new String[]{
                "Product #1 - Laptop - Stock: 50",
                "Product #2 - Mouse - Stock: 200",
                "Product #3 - Keyboard - Stock: 150"
        });
        return response;
    }
}