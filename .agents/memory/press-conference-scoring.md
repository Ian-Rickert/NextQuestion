---
name: Press conference scoring calibration
description: Product expectations for relevance scoring and rejecting gibberish in the simulator.
---

Use contextual semantic evaluation, not fixed phrase matching. Relevance includes a plausible explanation or causal context even when the answer does not repeat the question's keywords or explicitly confirm/deny the allegation. Examples include sleep deprivation for the milk-carton question, a family connection to the pilot for the clapping question, inventory and comedic timing for the chicken interview, and a leg injury or crutches for the low step count. Keep examples as calibration anchors, not required wording.

**Why:** The user asked to replace preset grading with a contextual judgment because plausible explanations were under-scored by keyword matching. The earlier grader also awarded baseline points to gibberish.

**How to apply:** When changing answer scoring, verify those contextual explanations alongside nonsense input. Invalid or incoherent input must receive zero across all categories, while valid brief English answers such as “No comment” should remain scoreable even when their relevance is low.
