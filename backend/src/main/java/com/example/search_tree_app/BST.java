package com.example.search_tree_app;

import java.util.ArrayList;
import java.util.List;

// bst class setup
public class BST {
    public TreeNode root;

    public BST() {
        this.root = null;
    }

    // insert one number into bst
    public void insert(int n) {
        if (root == null) {
            root = new TreeNode(n);
            return;
        }
        TreeNode cur = root;
        while (true) {
            if (n <= cur.value) {
                if (cur.left == null) {
                    cur.left = new TreeNode(n);
                    return;
                } else {
                    cur = cur.left;
                }
            } else {
                if (cur.right == null) {
                    cur.right = new TreeNode(n);
                    return;
                } else {
                    cur = cur.right;
                }
            }
        }
    }

    // insert a bunch of numbers in order
    public void insertMany(List<Integer> nums) {
        for (Integer x : nums) {
            if (x != null) insert(x);
        }
    }

    // inorder traversal
    public List<Integer> inorder() {
        List<Integer> out = new ArrayList<>();
        inorderDo(root, out);
        return out;
    }

    private void inorderDo(TreeNode node, List<Integer> out) {
        if (node == null) return;
        inorderDo(node.left, out);
        out.add(node.value);
        inorderDo(node.right, out);
    }

    // preorder
    public List<Integer> preorder() {
        List<Integer> out = new ArrayList<>();
        preorderDo(root, out);
        return out;
    }

    private void preorderDo(TreeNode node, List<Integer> out) {
        if (node == null) return;
        out.add(node.value);
        preorderDo(node.left, out);
        preorderDo(node.right, out);
    }

    // postorder
    public List<Integer> postorder() {
        List<Integer> out = new ArrayList<>();
        postorderDo(root, out);
        return out;
    }

    private void postorderDo(TreeNode node, List<Integer> out) {
        if (node == null) return;
        postorderDo(node.left, out);
        postorderDo(node.right, out);
        out.add(node.value);
    }
}
