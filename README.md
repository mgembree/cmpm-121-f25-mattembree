# CMPM 121 Section Activity

This section activity is intended to introduce you to many of the tools and workflows that we'll use in CMPM 121, Game Development Patterns.

Key tools:

- [GitHub Codespaces](https://github.com/features/codespaces), a cloud-based development environment based [VS Code](https://code.visualstudio.com/) that runs in your web browser.
- [GitHub Actions](https://github.com/features/actions), a CI/CD service that allows you to automate your build, test, and deployment pipeline.
- [GitHub Pages](https://pages.github.com/), a static site hosting service that allows you to publish web content for free.

Key workflows:

- Forking a project template repository to create your own copy.
- Configuring your repository to enable deployment automation (GitHub Actions) (deployment automation) and publishing (GitHub Pages).
- Accessing that repository using your IDE (Codespaces or local VS Code).
- Launching a local development server to preview your project in a web browser.
- Making a small change to the project.
- Manually testing your change locally.
- Committing and pushing your change to your remote repository on GitHub, verifying that the deployment succeeds.
- Removing this introductory documentation and replacing it with your own so that your project represents your voice, not that of the course staff. (Students: Don't let _this_ README.md be the only documentation in your project! It would be fine to delete all of this text and just add a sentence about your unique contribution to the starter project.)
- Repeating the editing-to-publishing process to build familiarity with the overall workflow.

## Getting Started

With Codespaces (or another environment supporting devcontainers):
3. Run `deno task dev` to start the development server

Without Codespaces (local VS Code):

1. Install the [Deno](https://docs.deno.com/runtime/getting_started/installation/) runtime.
2. Install the Deno VS Code extension (must be done only after installing Deno runtime).
3. Run `./setup-hooks.sh` to enable pre-commit quality checks
4. Run `deno task dev` to start the development server

The setup script configures Git hooks to automatically run formatting, linting, and type checking before commits.

## Deployment

This project is configured for automatic deployment to GitHub Pages using GitHub Actions.

### Setup GitHub Pages Deployment

1. Go to your repository's Settings → Pages
2. Under "Source", select "GitHub Actions"
3. The workflow will automatically deploy on pushes to the `main` branch
4. Your site will be published at `https://<your-github-username>.github.io/<repository-name>/`
