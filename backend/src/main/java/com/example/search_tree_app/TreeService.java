package com.example.search_tree_app;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

// building trees and saving records
@Service
public class TreeService {

    @Autowired
    public TreeRecordRepository repo;

    @Autowired
    public ObjectMapper mapper;

    // simple dto for json
    public static class NodeDto {
        public int value;
        public NodeDto left;
        public NodeDto right;
    }

    // make dto from node
    private NodeDto toDto(TreeNode n) {
        if (n == null) return null;
        NodeDto d = new NodeDto();
        d.value = n.value;
        d.left = toDto(n.left);
        d.right = toDto(n.right);
        return d;
    }

    // parse digits
    public List<Integer> parseNumbers(String input) {
        List<Integer> out = new ArrayList<>();
        if (input == null) return out;
        String[] parts = input.split("[,\\s]+");
        for (String p : parts) {
            if (p.isBlank()) continue;
            try {
                out.add(Integer.parseInt(p.trim()));
            } catch (NumberFormatException e) {
                // ignore bad stuff
            }
        }
        return out;
    }

    // Build the tree and save
    public TreeRecord processAndSave(String input) {
        List<Integer> nums = parseNumbers(input);
        BST t = new BST();
        t.insertMany(nums);

        NodeDto root = toDto(t.root);
        String json;
        try {
            json = mapper.writeValueAsString(root);
        } catch (Exception e) {
            json = "{}";
        }

        TreeRecord r = new TreeRecord();
        r.numbersInput = input;
        r.treeJson = json;
        r.createdAt = Instant.now();
        return repo.save(r);
    }

    // list the latest at the beginning
    public List<TreeRecord> findAll() {
        return repo.findAll(Sort.by(Sort.Direction.DESC, "id"));
    }
}
