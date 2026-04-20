export type Difficulty = "Easy" | "Medium" | "Hard";
export type Status = "Not Started" | "In Progress" | "Completed";
export type Category = "Arrays" | "Graphs" | "Dynamic Programming" | "Trees" | "Strings" | "Recursion" | "Sorting" | "System Design";

export interface Challenge {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  difficulty: Difficulty;
  category: Category;
  timeEstimate: string;
  xp: number;
  tags: string[];
  starterCode: string;
  hints: string[];
  examples: { input: string; output: string; explanation?: string }[];
}

export const CHALLENGES: Challenge[] = [
  {
    id: "ch-001",
    title: "Two Sum",
    description: "Find two numbers in an array that add up to a target value and return their indices.",
    longDescription: "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.",
    difficulty: "Easy",
    category: "Arrays",
    timeEstimate: "15 min",
    xp: 100,
    tags: ["hash-map", "arrays", "searching"],
    starterCode: `function twoSum(nums, target) {\n  // Your solution here\n  \n}`,
    hints: [
      "Try using a hash map to store complement values.",
      "For each number, check if (target - number) already exists in the map.",
    ],
    examples: [
      { input: "nums = [2,7,11,15], target = 9", output: "[0,1]", explanation: "nums[0] + nums[1] == 9, so return [0, 1]." },
      { input: "nums = [3,2,4], target = 6", output: "[1,2]" },
    ],
  },
  {
    id: "ch-002",
    title: "Maximum Subarray",
    description: "Find the contiguous subarray which has the largest sum using Kadane's algorithm.",
    longDescription: "Given an integer array `nums`, find the subarray with the largest sum, and return its sum. A subarray is a contiguous non-empty sequence of elements within an array.",
    difficulty: "Medium",
    category: "Dynamic Programming",
    timeEstimate: "25 min",
    xp: 250,
    tags: ["dp", "kadane", "arrays"],
    starterCode: `function maxSubArray(nums) {\n  // Your solution here\n  \n}`,
    hints: [
      "Think about maintaining a running sum.",
      "At each step, decide whether to extend the current subarray or start fresh.",
    ],
    examples: [
      { input: "nums = [-2,1,-3,4,-1,2,1,-5,4]", output: "6", explanation: "Subarray [4,-1,2,1] has the largest sum 6." },
      { input: "nums = [1]", output: "1" },
    ],
  },
  {
    id: "ch-003",
    title: "Graph BFS Shortest Path",
    description: "Find the shortest path between two nodes in an unweighted directed graph using BFS.",
    longDescription: "Given a directed graph represented as an adjacency list and two nodes `source` and `target`, return the length of the shortest path between them. If no path exists, return -1.",
    difficulty: "Medium",
    category: "Graphs",
    timeEstimate: "30 min",
    xp: 300,
    tags: ["bfs", "graphs", "shortest-path"],
    starterCode: `function shortestPath(graph, source, target) {\n  // Your solution here\n  \n}`,
    hints: [
      "Use a queue to implement BFS level by level.",
      "Track visited nodes to avoid cycles.",
    ],
    examples: [
      { input: "graph = {0:[1,2], 1:[3], 2:[3]}, source=0, target=3", output: "2" },
    ],
  },
  {
    id: "ch-004",
    title: "Binary Tree Level Order Traversal",
    description: "Traverse a binary tree level by level and return all node values in a 2D array.",
    longDescription: "Given the root of a binary tree, return the level order traversal of its nodes' values (i.e., from left to right, level by level). Each level's values should be grouped in a separate list.",
    difficulty: "Easy",
    category: "Trees",
    timeEstimate: "20 min",
    xp: 150,
    tags: ["bfs", "trees", "traversal"],
    starterCode: `function levelOrder(root) {\n  // Your solution here\n  \n}`,
    hints: [
      "Use a queue and process nodes level by level.",
      "Track the number of nodes at each level before processing.",
    ],
    examples: [
      { input: "root = [3,9,20,null,null,15,7]", output: "[[3],[9,20],[15,7]]" },
    ],
  },
  {
    id: "ch-005",
    title: "Longest Palindromic Substring",
    description: "Given a string, return the longest substring that reads the same forward and backward.",
    longDescription: "Given a string `s`, return the longest palindromic substring in `s`. A palindrome is a string that reads the same forward and backward.",
    difficulty: "Medium",
    category: "Strings",
    timeEstimate: "30 min",
    xp: 280,
    tags: ["strings", "dp", "two-pointers"],
    starterCode: `function longestPalindrome(s) {\n  // Your solution here\n  \n}`,
    hints: [
      "Try expanding around each character as a potential center.",
      "Handle both odd-length and even-length palindromes.",
    ],
    examples: [
      { input: 's = "babad"', output: '"bab"', explanation: '"aba" is also a valid answer.' },
      { input: 's = "cbbd"', output: '"bb"' },
    ],
  },
  {
    id: "ch-006",
    title: "Merge K Sorted Lists",
    description: "Merge k sorted linked lists and return one sorted list using a heap-based approach.",
    longDescription: "You are given an array of k linked-lists lists, each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it.",
    difficulty: "Hard",
    category: "Sorting",
    timeEstimate: "45 min",
    xp: 500,
    tags: ["heap", "linked-list", "divide-conquer"],
    starterCode: `function mergeKLists(lists) {\n  // Your solution here\n  \n}`,
    hints: [
      "Consider using a min-heap to always extract the smallest element.",
      "Alternatively, use divide and conquer — merge pairs of lists recursively.",
    ],
    examples: [
      { input: "lists = [[1,4,5],[1,3,4],[2,6]]", output: "[1,1,2,3,4,4,5,6]" },
    ],
  },
  {
    id: "ch-007",
    title: "Coin Change",
    description: "Find the minimum number of coins needed to make up a given amount.",
    longDescription: "You are given an integer array `coins` representing coins of different denominations and an integer `amount` representing a total amount of money. Return the fewest number of coins that you need to make up that amount. If that amount cannot be made up by any combination, return -1.",
    difficulty: "Medium",
    category: "Dynamic Programming",
    timeEstimate: "35 min",
    xp: 320,
    tags: ["dp", "bottom-up", "memoization"],
    starterCode: `function coinChange(coins, amount) {\n  // Your solution here\n  \n}`,
    hints: [
      "Build a DP table where dp[i] = minimum coins to make amount i.",
      "Initialize dp[0] = 0 and all other values to Infinity.",
    ],
    examples: [
      { input: "coins = [1,5,11], amount = 15", output: "3", explanation: "5 + 5 + 5 = 15" },
      { input: "coins = [2], amount = 3", output: "-1" },
    ],
  },
  {
    id: "ch-008",
    title: "Detect Cycle in Directed Graph",
    description: "Determine whether a directed graph contains a cycle using DFS with coloring.",
    longDescription: "Given a directed graph with V vertices and E edges, check whether the graph contains any cycle. Use DFS with a 3-color (white/gray/black) approach to detect back edges.",
    difficulty: "Hard",
    category: "Graphs",
    timeEstimate: "40 min",
    xp: 480,
    tags: ["dfs", "graphs", "cycle-detection"],
    starterCode: `function hasCycle(V, edges) {\n  // Your solution here\n  \n}`,
    hints: [
      "White = unvisited, Gray = in-stack, Black = fully processed.",
      "A back edge (gray → gray) indicates a cycle.",
    ],
    examples: [
      { input: "V=4, edges=[[0,1],[1,2],[2,3],[3,1]]", output: "true" },
      { input: "V=3, edges=[[0,1],[1,2]]", output: "false" },
    ],
  },
  {
    id: "ch-009",
    title: "Valid Parentheses",
    description: "Check if a string of brackets is valid — every opening bracket has a matching closing bracket.",
    longDescription: "Given a string `s` containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid. An input string is valid if: open brackets must be closed by the same type, and in the correct order.",
    difficulty: "Easy",
    category: "Strings",
    timeEstimate: "15 min",
    xp: 120,
    tags: ["stack", "strings"],
    starterCode: `function isValid(s) {\n  // Your solution here\n  \n}`,
    hints: [
      "Use a stack to track opening brackets.",
      "When you see a closing bracket, check if the top of the stack matches.",
    ],
    examples: [
      { input: 's = "()"', output: "true" },
      { input: 's = "()[]{}"', output: "true" },
      { input: 's = "(]"', output: "false" },
    ],
  },
  {
    id: "ch-010",
    title: "Fibonacci Memoization",
    description: "Implement an efficient Fibonacci function using memoization to reduce exponential time.",
    longDescription: "Write a function that returns the nth Fibonacci number. Optimize it using memoization (top-down DP) to achieve O(n) time complexity instead of O(2^n).",
    difficulty: "Easy",
    category: "Recursion",
    timeEstimate: "15 min",
    xp: 100,
    tags: ["recursion", "memoization", "dp"],
    starterCode: `function fib(n, memo = {}) {\n  // Your solution here\n  \n}`,
    hints: [
      "Store previously computed values in a memo object.",
      "Check if fib(n) is already in the memo before computing.",
    ],
    examples: [
      { input: "n = 10", output: "55" },
      { input: "n = 0", output: "0" },
    ],
  },
  {
    id: "ch-011",
    title: "Design Rate Limiter",
    description: "Design a rate limiter that allows at most N requests per time window using a sliding window.",
    longDescription: "Design and implement a rate limiter class that limits an API endpoint to N requests per time window (in seconds). Support multiple users. Use the sliding window algorithm for accurate rate limiting.",
    difficulty: "Hard",
    category: "System Design",
    timeEstimate: "60 min",
    xp: 600,
    tags: ["system-design", "sliding-window", "data-structures"],
    starterCode: `class RateLimiter {\n  constructor(maxRequests, windowSeconds) {\n    // Initialize\n  }\n  \n  isAllowed(userId) {\n    // Return true if the request is allowed\n  }\n}`,
    hints: [
      "Store request timestamps per user in a queue.",
      "Remove timestamps older than windowSeconds on each check.",
    ],
    examples: [
      { input: "maxRequests=3, window=1s, 4 calls in 0.5s", output: "[true, true, true, false]" },
    ],
  },
  {
    id: "ch-012",
    title: "Quick Sort Implementation",
    description: "Implement the QuickSort algorithm in-place with efficient pivot selection.",
    longDescription: "Implement the QuickSort algorithm to sort an array of integers in ascending order. Choose the pivot using the median-of-three technique for better average performance and implement the partition step in-place.",
    difficulty: "Medium",
    category: "Sorting",
    timeEstimate: "30 min",
    xp: 260,
    tags: ["sorting", "divide-conquer", "in-place"],
    starterCode: `function quickSort(arr, low = 0, high = arr.length - 1) {\n  // Your solution here\n  \n}`,
    hints: [
      "Choose a pivot and partition the array around it.",
      "Recursively sort the left and right sub-arrays.",
    ],
    examples: [
      { input: "arr = [3,6,8,10,1,2,1]", output: "[1,1,2,3,6,8,10]" },
    ],
  },
];
