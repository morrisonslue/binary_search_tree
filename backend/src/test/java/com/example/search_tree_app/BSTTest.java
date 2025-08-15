package com.example.search_tree_app;

import org.junit.jupiter.api.Test;
import java.util.Arrays;
import static org.junit.jupiter.api.Assertions.*;

// bst testting
public class BSTTest {

    @Test
    void insert_and_inorder_should_sort_values() {
        BST t = new BST();
        t.insertMany(Arrays.asList(7, 3, 9, 1, 5));
        assertEquals(Arrays.asList(1,3,5,7,9), t.inorder());
    }
    // checks the order from when inserting
    @Test
    void preorder_should_match_expected_shape() {
        BST t = new BST();
        t.insertMany(Arrays.asList(7, 3, 9, 1, 5));

        assertEquals(Arrays.asList(7,3,1,5,9), t.preorder());
    }
}
