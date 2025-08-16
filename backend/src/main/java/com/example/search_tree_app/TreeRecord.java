package com.example.search_tree_app;

import jakarta.persistence.*;
import java.time.Instant;

// record for saving json and input from tree
@Entity
public class TreeRecord {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    @Column(length = 1000)
    public String numbersInput;

    @Lob
    public String treeJson;

    public Instant createdAt;

    public TreeRecord() {}
}
