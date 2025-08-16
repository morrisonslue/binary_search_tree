package com.example.search_tree_app;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.hamcrest.Matchers.*;

// controller testing
@SpringBootTest
@AutoConfigureMockMvc
public class TreeControllerTest {

    @Autowired
    private MockMvc mvc;

    @Test
    void post_then_get_should_work() throws Exception {
        // POST
        mvc.perform(
                        post("/process-numbers")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content("{\"numbers\":\"7,3,9,1,5\"}")
                )
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", notNullValue()))
                .andExpect(jsonPath("$.treeJson", containsString("7")));

        // GET
        mvc.perform(get("/previous-trees"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", not(empty())));
    }
}
