**Branch Creation Guidelines**

   The purpose of this document is to provide a set of guidelines for creating and managing branches in a version control system, ensuring consistent and efficient branch usage while maintaining a stable and manageable codebase.

   Below are the list of branching strategies that we follow:

   **Master branch**: The master branch contains the latest production-ready code. It should be stable and well-tested.
   **Develop branch**: The develop branch is the integration branch for feature branches. It contains the latest code that is ready for the next release.
   **Feature branches**: Feature branches are used to develop new features or fix bugs. They should be isolated from the develop branch until the changes are ready to be merged.
   **Release branches**: Release branches are used to prepare a new release for production. They are created from the develop branch and contain only the changes that are being released.
   **Hotfix branches**: Hotfix branches are used to quickly fix critical production bugs. They should be created from the master branch and contain only the necessary bug fixes.
   **Bugfix branches**: Bugfix branches are used to fix non-critical production bugs. They can be created from either the develop branch or the release branch, depending on the severity of the bug.

  ** Feature Branch Workflow**
   The following workflow can be used for feature branches:
   
      Create a new feature branch from the develop branch.
      Make your changes to the feature branch.
      Commit your changes to the feature branch and push them to Azure Repos.
      Create a pull request to merge the feature branch into the develop branch.
      Have your changes reviewed by another developer.
      Once your changes have been approved, merge the feature branch into the develop branch.
      Delete the feature branch.

  ** Develop Branch Workflow**
   The following workflow can be used for the develop branch:

      Merge approved feature branches into the develop branch.
      Test the develop branch thoroughly to ensure stability.
      Once the develop branch is stable and all planned features are included, create a release branch from the develop branch.
      Merge the develop branch into the master branch as part of the release process.

**   Release Branch Workflow**
   The following workflow can be used for release branches:
   
      Create a new release branch from the develop branch.
      Cherry-pick any necessary bug fixes from the develop branch to the release branch.
      Test the release branch thoroughly.
      Once the release branch is ready, merge it into the master branch.
      Tag the release branch with a release version number.
      Deploy the release branch to production.

  ** Branching Workflow for Hotfixes and Bugfixes**
      The following workflow can be used for hotfixes and bugfixes:
      
      Create a new hotfix or bugfix branch from the appropriate branch (master branch for hotfixes, develop or release branch for bugfixes).
      Make your bug fixes to the hotfix or bugfix branch.
      Commit your changes to the hotfix or bugfix branch and push them to Azure Repos.
      Create a pull request to merge the hotfix or bugfix branch into the appropriate branch.
      Have your changes reviewed by another developer.
      Once your changes have been approved, merge the hotfix or bugfix branch into the appropriate branch.
**Additional Considerations**
   Hotfixes should be deployed to production as quickly as possible.
   Bugfixes should be deployed to production in the next release.
   Hotfix and bugfix branches should be short-lived. They should be merged back into the appropriate branch as soon as possible.

Branch Naming Convention
Use a branch naming convention to help keep track of your branches. You can use the following naming convention:

   Feature branches: feature/<feature-name>
   Develop branch: develop
   Release branches: release/<version-number>
   Hotfix branches: hotfix/<issue-number> or hotfix/critical-security-vulnerability-12345
   Bugfix branches: bugfix/<issue-number> or bugfix/minor-bug-67890-release-1.2.3
Where <issue-number> is the issue number of the bug that is being fixed.

Branch Creation Matrix
The following matrix explains who can create which branches:

Role	Feature Branches	Bugfix Branches	Hotfix Branches	Master Branch	Develop Branch	Release Branch
Contributor	✓	✓	✓	❌	❌	❌
DevOps Team	✓	✓	✓	✓	✓	✓
Project Admin	✓	✓	✓	✓	✓	✓

Contributors: Can create feature, bugfix, and hotfix branches. They cannot create or modify master, develop, or release branches.
DevOps Team: Can create and modify all types of branches including master, develop, and release branches.
Project Admin: Can create and modify all types of branches, ensuring overall branch management and control.
