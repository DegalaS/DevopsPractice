# DevopsPractice



Sure, here’s the revised branching strategy using a `develop` branch instead of a `uat` branch.

### Branching Strategy Overview

1. **Main Branches**
   - **`main` or `prod` branch**: Represents the Production environment.
   - **`develop` branch**: Represents the integration environment where features are integrated and tested before release.

2. **Feature Branches**
   - Create a new branch for each feature or set of related features. These branches are based off the `develop` branch.
   - Naming convention: `feature/{feature-name}`.

3. **Release Branches**
   - For promoting specific features to Production, create a release branch.
   - Naming convention: `release/{release-name}`.

### Workflow

1. **Feature Development**
   - Developers create feature branches from the `develop` branch.
   - Naming example: `feature/awesome-feature`.
   - Feature branches are merged into the `develop` branch once they are tested and approved.
  







2. **Develop Integration Testing**
   - The `develop` branch contains all features that are being tested in an integration environment.
   - Continuous Integration (CI) builds and tests are run on this branch to ensure stability.

3. **Promoting Features to Production**
   - When a decision is made to promote specific features to Production, create a release branch from the `main` (or `prod`) branch.
   - Naming example: `release/may-2024`.

4. **Cherry-Picking Features**
   - Identify the commits corresponding to the features that need to be promoted from the `develop` branch.
   - Use cherry-picking to selectively integrate these commits into the release branch.
   - Example: `git checkout release/may-2024`, then `git cherry-pick <commit-hash>` for each desired commit.

5. **Final Testing and Release**
   - Test the release branch thoroughly to ensure all selected features work correctly together.
   - Once testing is complete, merge the release branch into the `main` (or `prod`) branch.
   - Deploy the `main` (or `prod`) branch to Production.

6. **Maintaining Branches**
   - Regularly merge `main` (or `prod`) back into `develop` to ensure that the integration environment includes all fixes and updates from Production.
   - This can be done periodically or as part of each release cycle.

### Detailed Example Workflow

1. **Creating Feature Branches**
   ```bash
   git checkout develop
   git checkout -b feature/awesome-feature
   # Develop and commit changes
   git push origin feature/awesome-feature
   ```

2. **Merging Features into Develop**
   ```bash
   git checkout develop
   git merge feature/awesome-feature
   # Resolve conflicts if any
   git push origin develop
   ```

3. **Creating a Release Branch**
   ```bash
   git checkout main
   git checkout -b release/may-2024
   ```

4. **Cherry-Picking Features**
   ```bash
   git cherry-pick <commit-hash1> <commit-hash2> ...
   # Test the release branch
   git push origin release/may-2024
   ```

5. **Finalizing the Release**
   ```bash
   git checkout main
   git merge release/may-2024
   git push origin main
   ```

6. **Maintaining Branch Consistency**
   ```bash
   git checkout develop
   git merge main
   git push origin develop
   ```

### Azure Repos Integration

- **Pull Requests**: Use Pull Requests (PRs) for merging feature branches into `develop` and release branches into `main`. PRs should include code reviews and automated build/test validations.
- **Build Pipelines**: Set up CI/CD pipelines for the `develop`, release, and `main` branches to automate building, testing, and deployment processes.
- **Branch Policies**: Implement branch policies in Azure Repos to enforce mandatory code reviews, successful builds, and other quality checks before merging PRs.

By using this strategy, the `develop` branch serves as the staging ground for all feature integration and testing, and specific features can be selectively promoted to Production via cherry-picking into release branches. This ensures that only thoroughly tested features reach Production based on business needs.



Yes, there are other strategies you can consider to merge updates from `main` into `develop` while ensuring ongoing changes in `develop` are preserved. Here are a few alternative approaches:

### 1. Rebase `develop` onto `main`

Rebasing can keep your commit history cleaner by making it appear as if all the work on `develop` was done after the latest changes on `main`. This approach can make your history easier to follow, but it rewrites commit history, which can be problematic if multiple developers are working on `develop`.

**Steps:**

1. **Fetch the latest changes:**
   ```bash
   git fetch origin
   ```

2. **Rebase `develop` onto `main`:**
   ```bash
   git checkout develop
   git rebase main
   ```

3. **Resolve any conflicts during the rebase process:**
   Follow the prompts to resolve conflicts. After resolving conflicts, continue the rebase:
   ```bash
   git rebase --continue
   ```

4. **Force-push the rebased `develop` branch to the remote repository:**
   Since rebasing rewrites commit history, you need to force-push:
   ```bash
   git push origin develop --force
   ```

### 2. Merge with Manual Conflict Resolution

Instead of using the `ours` merge strategy, you can manually resolve conflicts during the merge process. This gives you full control over how conflicts are resolved and ensures that both `main` and `develop` changes are integrated properly.

**Steps:**

1. **Merge `main` into `develop`:**
   ```bash
   git checkout develop
   git merge main
   ```

2. **Resolve conflicts manually:**
   Git will prompt you to resolve any conflicts. Open the conflicting files, decide how to integrate the changes from both branches, and mark them as resolved:
   ```bash
   git add <resolved-file>
   ```

3. **Complete the merge:**
   ```bash
   git commit
   ```

4. **Push the merged `develop` branch to the remote repository:**
   ```bash
   git push origin develop
   ```

### 3. Use a "Promotion" Branch

Introduce an intermediate "promotion" branch that acts as a buffer between `develop` and `main`. You can use this branch to integrate changes from `main` and resolve conflicts without affecting ongoing development directly.

**Steps:**

1. **Create the promotion branch from `main`:**
   ```bash
   git checkout main
   git checkout -b promotion
   ```

2. **Merge `develop` into `promotion`:**
   ```bash
   git merge develop
   ```

3. **Resolve conflicts on the `promotion` branch:**
   Resolve any conflicts manually and commit the changes.

4. **Merge `promotion` into `develop`:**
   ```bash
   git checkout develop
   git merge promotion
   ```

5. **Push the `develop` branch to the remote repository:**
   ```bash
   git push origin develop
   ```

### 4. Feature Toggle or Feature Flags

If applicable, you can use feature toggles or feature flags to control which features are enabled in `develop` and `main`. This approach doesn't directly address the merge strategy but allows you to control feature visibility without complex merges.

**Steps:**

1. **Implement feature toggles in your code:**
   Wrap new features in conditional checks that can be toggled on or off.

2. **Deploy all features to `develop` with toggles off for features not yet ready:**
   Merge all features to `develop` as usual.

3. **When ready, toggle features on in `main`:**
   Use your feature flagging system to enable features in production gradually.

### Conclusion

Each of these strategies has its advantages and trade-offs:

- **Rebasing** keeps a clean history but rewrites commit history.
- **Manual Conflict Resolution** gives full control but can be time-consuming.
- **Promotion Branch** adds an intermediate step but isolates conflict resolution.
- **Feature Toggles** decouple feature deployment from code integration but require additional infrastructure.

Choose the strategy that best fits your team's workflow, the complexity of your project, and your comfort level with Git operations.



To ensure that ongoing changes in the `develop` branch are not discarded when merging the `main` (or `prod`) branch back into `develop` as part of each release cycle, you should use a **recursive merge strategy** with the **ours** option to prioritize the changes in `develop` while still integrating the updates from `main`. This approach will effectively bring in the necessary updates from the `main` branch without overwriting the ongoing work in `develop`.

Here’s how you can implement this:

### Step-by-Step Workflow

1. **Finalizing the Release**
   - After the release branch is thoroughly tested and ready for production, merge it into the `main` branch.
   ```bash
   git checkout main
   git merge release/may-2024
   git push origin main
   ```

2. **Merging `main` into `develop`**
   - Ensure you are on the `develop` branch.
   ```bash
   git checkout develop
   ```

   - Merge the `main` branch into `develop` using the recursive merge strategy with the `ours` option. This strategy resolves conflicts by keeping the changes from the current branch (`develop`) in case of conflicts, while still incorporating changes from the `main` branch.
   ```bash
   git merge -s recursive -X ours main
   ```

   - Push the merged changes to the remote repository.
   ```bash
   git push origin develop
   ```

### Detailed Explanation

- **`git merge -s recursive -X ours main`**:
  - **`-s recursive`**: This specifies the recursive merge strategy, which is a default and commonly used merge strategy for merging two branches.
  - **`-X ours`**: This option tells Git to use the "ours" merge strategy for resolving conflicts. This means that if there are conflicts, the version from the current branch (`develop`) will be used.

By following this method, you ensure that:

- All updates from the `main` branch are incorporated into `develop`, which includes hotfixes and any other changes that were made directly to `main`.
- Ongoing development work in the `develop` branch is not overridden by the updates from the `main` branch.

### Example Workflow

1. **Finalizing the Release and Merging into `main`**:
   ```bash
   git checkout main
   git merge release/may-2024
   git push origin main
   ```

2. **Merging `main` into `develop`**:
   ```bash
   git checkout develop
   git merge -s recursive -X ours main
   git push origin develop
   ```

### Azure Repos Integration

- **Branch Policies**: Enforce branch policies in Azure Repos to require PR reviews and build validations before merging changes into `develop` and `main`.
- **Pull Requests**: Use PRs for merging `release` branches into `main` and `main` into `develop`. Even when using the `ours` strategy, you can open a PR to ensure visibility and additional validation steps are followed.
- **CI/CD Pipelines**: Ensure that both `develop` and `main` branches have CI/CD pipelines configured to run automated tests and deployment steps.

By using this merge strategy, you maintain the integrity of ongoing development work while incorporating necessary updates from production, creating a robust and efficient workflow.






apk add --no-cache \
    ca-certificates \
    less \
    ncurses-terminfo-base \
    krb5-libs \
    libgcc \
    libintl \
    libssl3 \
    libstdc++ \
    tzdata \
    userspace-rcu \
    zlib \
    icu-libs \
    curl
