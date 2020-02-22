# Benchmarks

Similar to [hills](./hills), benchmarks allow you to evaluate the performance of your warrior.  A benchmark is essentially a collection of warriors which have been selected to provide a consistent level of difficulty across a wide and representative range of [strategies](./strategies).

When you wish to gauge how well a new warrior you are writing is performing, you can run that warrior against a benchmark.  When you do this your warrior competes against each warrior in the benchmark in turn over a number of rounds.  The warrior's performance is scored in the same way as when it competes on a hill, its score being calculated from the percentage of rounds it wins and draws.

Benchmark scores are great because you can try out different variations on your warrior and see what effect it is likely to have on the warrior's performance on the hills.  It also allows you to directly compare the performance of different warriors you or others have written.
