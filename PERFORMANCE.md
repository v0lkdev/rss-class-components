# Performance Optimization Report

## Baseline Measurements

### Interaction A: Sort countries

- **Commit duration**: 2.4 s
- **Render duration**: 222.4 ms
- **Screenshot**: ![A_sort_countries](/screenshots/baseline/A_sort_countries.png)
- **Screenshot**: ![A_flamegraph](/screenshots/baseline/A_flamegraph.png)


### Interaction B: Search countries

- **Commit duration**: 2.1 s
- **Render duration**: 118.8 ms
- **Screenshot**: ![B_search_countries](/screenshots/baseline/B_search_countries.png)
- **Screenshot**: ![B_flamegraph](/screenshots/baseline/B_flamegraph.png)

### Interaction C: Change year

- **Commit duration**: 2.8 s
- **Render duration**: 242.3 ms
- **Screenshot**: ![C_change_year](/screenshots/baseline/C_change_year.png)
- **Screenshot**: ![C_flamegrap](/screenshots/baseline/C_flamegraph.png)

### Interaction D: Toggle column

- **Commit duration**: 2.3 s
- **Render duration**: 248.2 ms
- **Screenshot**: ![D_toggle_column_2](/screenshots/baseline/D_toggle_column_2.png)
- **Screenshot**: ![D_flamegraph_2](/screenshots/baseline/D_flamegraph_2.png)


## Optimized Measurements

### Interaction A: Sort countries

- **Commit duration**: 1.9 s
- **Render duration**: 24.4 ms
- **Screenshot**: ![A_sort_countries_updated](/screenshots/optimized/A_sort_countries_updated.png)
- **Screenshot**: ![A_flamegraph_updated](/screenshots/optimized/A_flamegraph_updated.png)

### Interaction B: Search countries

- **Commit duration**: 1.4 s
- **Render duration**: 36.7 ms
- **Screenshot**: ![B_search_countries_updated](/screenshots/optimized/B_search_countries_updated.png)
- **Screenshot**: ![B_flamegraph_updated](/screenshots/optimized/B_flamegraph_updated.png)

### Interaction C: Change year

- **Commit duration**: 2.5 s
- **Render duration**: 67 ms
- **Screenshot**: ![C_change_year_updated](/screenshots/optimized/C_change_year_updated.png)
- **Screenshot**: ![C_flamegraph_updated](/screenshots/optimized/C_flamegraph_updated.png)

### Interaction D: Toggle column

- **Commit duration**: 3 s
- **Render duration**: 30.5 ms
- **Screenshot**: ![D_toggle_column_updated](/screenshots/optimized/D_toggle_column_updated.png)
- **Screenshot**: ![D_flamegraph_updated](/screenshots/optimized/D_flamegraph_updated.png)

## Summary of Improvements

| Interaction      | Baseline (ms) | Optimized (ms) | Improvement |
| ---------------- | ------------- | -------------- | ----------- |
| Sort countries   | 222.4         | 24.4           | 89%         |
| Search countries | 118.8         | 36.7           | 69%         |
| Change year      | 242.3         | 67             | 72%         |
| Toggle column    | 248.2         | 30.5           | 88%         |
| **Average**      | **207.9**     | **39.7.**      | **81%**     |