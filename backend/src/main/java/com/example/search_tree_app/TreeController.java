package com.example.search_tree_app;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// api stuff
@RestController
public class TreeController {

    @Autowired
    public TreeService service;

    // dto request
    public static class NumbersRequest {
        public String numbers;
    }

    // post numbers then build tree and save record
    @PostMapping("/process-numbers")
    public TreeRecord process(@RequestBody NumbersRequest req) {
        String input = req == null ? "" : req.numbers;
        return service.processAndSave(input);
    }

    // LIST the saved trees
    @GetMapping("/previous-trees")
    public List<TreeRecord> previous() {
        return service.findAll();
    }
}
