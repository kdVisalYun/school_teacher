Default branch:
- `dev`: Development Environment
- `staging`: Staging Environment
- `production`: Production Environment

### Branch Strategy
- checkout from `dev` and name the branch `dev/release/YYYY_MM_DD` as initial branch
- again checkout from `dev` and name the branch `ready/release/YYYY_MM_DD` as target branch
- for each task, checkout from `dev/release/YYYY_MM_DD` and name each whatever you want
- after complete one task, merge into `ready/release/YYYY_MM_DD`
- when release:
    - merge `ready/release/YYYY_MM_DD` into `dev`
    - merge `dev` into `staging`
    - merge `staging` into `production`
