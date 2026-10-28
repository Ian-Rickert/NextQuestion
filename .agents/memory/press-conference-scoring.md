---
name: Press conference scoring calibration
description: Product expectations for relevance scoring and rejecting gibberish in the simulator.
---

Relevance includes a plausible explanation or causal context, even when the answer does not repeat the question's keywords. Examples include sleep deprivation for the milk-carton question, a family connection to the pilot for the clapping question, inventory and comedic timing for the chicken interview, and a leg injury or crutches for the low step count.

**Why:** The user reported these as good answers that the earlier keyword-only grader under-scored. The prior grader also awarded baseline points to gibberish.

**How to apply:** When changing answer scoring, verify those kinds of contextual answers alongside nonsense input. Invalid or incoherent input must receive zero across all categories, while valid brief English answers such as “No comment” should remain scoreable even when their relevance is low.
