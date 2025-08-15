package com.example.search_tree_app;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {
    @GetMapping("/ping")
    public String ping() {
        return "pong";
    }
}
