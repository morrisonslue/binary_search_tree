package com.example.search_tree_app;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Arrays;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class TreeServiceTest {

    @Autowired
    private TreeService service;

    @Test
    void parse_should_return_int_list() {
        assertEquals(Arrays.asList(7,3,9,1,5), service.parseNumbers("7, 3  9,1, 5"));
    }

    @Test
    void process_and_save_should_store_record() {
        TreeRecord r = service.processAndSave("7,3,9");
        assertNotNull(r.id);
        assertNotNull(r.treeJson);
        assertTrue(r.treeJson.contains("7"));
    }
}
