<div align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://assets.devsantara.com/kit/logo-dark.png">
    <img alt="@devsantara/kit logo" src="https://assets.devsantara.com/kit/logo-light.png" height="128">
  </picture>
  <h1>@devsantara/kit</h1>
  <a href="https://github.com/devsantara"><img alt="Made by Devsantara" src="https://img.shields.io/badge/Made_By-Devsantara-0F172A.svg?style=for-the-badge&labelColor=000000"></a>
  <a href="./LICENSE"><img alt="MIT License" src="https://img.shields.io/github/license/devsantara/kit?style=for-the-badge&labelColor=000000"></a>
  <a href="https://github.com/devsantara/kit/releases"><img alt="GitHub Release" src="https://img.shields.io/github/v/release/devsantara/kit?display_name=release&style=for-the-badge&labelColor=000000"></a>
  <a href="https://github.com/devsantara/kit/graphs/contributors"><img alt="contributors" src="https://img.shields.io/github/contributors/devsantara/kit?style=for-the-badge&labelColor=000000"></a>
</div>

## Unlock Rapid Development & Flawless Execution

Building a great product often starts with a robust foundation. But setting up new projects from scratch can be a time-consuming and repetitive process, often leading to inconsistent configurations, missed best practices, and wasted development hours. You deserve to focus on innovation, not boilerplate.

That's where **`@devsantara/kit`** comes in. It's more than just a template; it's a meticulously crafted, opinionated boilerplate designed to give developers like you a significant head start. We've baked in **well-thought-out setups, easy maintenance, and up-to-date tooling** so you can jump straight into building your next big idea with confidence and speed.

### Built For Builders

We believe developers should spend their time solving unique problems, not re-solving common setup challenges. **`@devsantara/kit`** is your go-to starting point, providing the clarity and efficiency you need to transform your vision into a tangible product. _Focus on the "what" and let us handle the "how to get started."_

## Why This Is Right For You

- **⚡️ Blazing Fast Project Initialization:** Ditch the repetitive setup tasks. Get a fully configured project ready to code in minutes, not hours or days.
- **🛠️ Robust & Well-Structured Foundation:** Benefit from a logical and scalable project architecture, which ensures _maintainability_ as your product grows, designed with _experience_ and _iterative learning_ in mind.
- **🚀 Modern & Up-to-Date Tooling:** We keep **`@devsantara/kit`** aligned with the _latest industry standards_ and _best practices_, so your project is always up to date with all the benefits it provides.
- **✅ Production-Ready Configuration:** From development to deployment, our sensible defaults and configurations minimize common pitfalls, letting you focus on feature development.

## Features

- [Next.js](https://nextjs.org) with App Router.
- A robust type system with [Typescript](https://www.typescriptlang.org).
- Maintain the best quality commit messages with [Commitlint](https://commitlint.js.org).
- Using [Prettier](https://prettier.io) as a formatter to unify code writing styles.
- With a _strict_ linter system using [Eslint](https://eslint.org) with various strict rules to maintain the quality of your code.
- Will never forget to maintain code quality with [Lint-staged](https://github.com/lint-staged/lint-staged).
- [Husky](https://typicode.github.io/husky), Ultra-fast modern native git hooks.
- Easily create _changelogs_ and perform application _releases_ using [Release-it](https://github.com/release-it/release-it).
- Using [TailwindCSS](https://tailwindcss.com), unapologetically modern styling solution, and takes advantage of all the latest and greatest CSS features to make the developer experience as pleasant as possible.
- _...And many more to come_

## Tooling & Configuration

Let's take a look and get to know more about some of the tools and configurations used.

### Getting started

Before you begin, ensure you have the following installed on your local development machine:

1. [Node.js](https://nodejs.org): Version `v22.14.0` or later.
2. [Pnpm](https://pnpm.io/): A fast, disk space efficient package manager.

#### Step 1: Create a New Repository from This Template

1. Navigate to the main page of [this repository](https://github.com/devsantara/kit) on GitHub.
2. Above the file list, click the green "**Use this template**" button, and then select "**Create a new repository**".
3. On the "**Create a new repository**" page that opens, select an `Owner` (_your personal account or an organization_) and enter a unique repository name for your new project.

> Learn [how to creating a repository from a template here](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template)

#### Step 2: Clone Your New Repository

Once your new repository is created, you need to clone it to your local machine.

> Learn [how to clone GitHub repository here](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository)

#### Step 3: Install Project Dependencies

This project uses `pnpm` for package management. To install all the necessary dependencies defined in the `package.json` file, run:

```bash
pnpm install
```

> Learn [how to install pnpm as your package manager here](https://pnpm.io/installation)

#### Step 4: Run the Scripts

Now you can start developing your ideas, with several scripts available:

| Script name     | Description                                                                                                                                                     |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `dev`           | Runs the Next.js development server with `Turbopack`.                                                                                                           |
| `build`         | Creates an optimized production build of your application.                                                                                                      |
| `start`         | Starts the production server for your built application.                                                                                                        |
| `lint`          | Analyzes code for potential errors and style issues using Next.js's built-in ESLint configuration.                                                              |
| `lint:fix`      | Automatically fixes linting errors and warnings that are fixable.                                                                                               |
| `lint:inspect`  | Allows you to inspect the final ESLint configuration being used.                                                                                                |
| `format`        | Formats `non-code`/`js`/`ts` (`json`/`markdown`/`css`/`...`) files in the project with Prettier.                                                                |
| `commitlint`    | Checks if your commit messages meet the conventional commit format. (_Used on commit-msg git hooks_)                                                            |
| `postinstall`   | A script that runs automatically after pnpm install is completed. (_Put any postinstall command/scripts on [scripts/postinstall.sh](./scripts/postinstall.sh)_) |
| `release:patch` | Creates a new patch release `(e.g., v1.0.0 -> v1.0.1)`.                                                                                                         |
| `release:minor` | Creates a new minor release `(e.g., v1.0.1 -> v1.1.0)`.                                                                                                         |
| `release:major` | Creates a new major release `(e.g., v1.1.0 -> v2.0.0)`.                                                                                                         |

### Visual Studio Code

All information regarding **configurations**, **extensions** and **code snippets** for Visual Studio Code can be [seen here](./.vscode/README.md).

### Eslint

Here are some eslint plugins/tools that are used to support the quality of your code (_full support for eslint flat config_):

- `@eslint/compat`
- `@eslint/js`
- `@next/eslint-plugin-next`
- `@stylistic/eslint-plugin`
- `@typescript-eslint/parser`
- `eslint-plugin-import`
- `eslint-plugin-jsx-a11y`
- `eslint-plugin-react`
- `eslint-plugin-react-hooks`
- `typescript-eslint`
- `eslint-plugin-better-tailwindcss`

### Conventional Commits

This project adheres to the [Conventional Commits](https://www.conventionalcommits.org) specification. A specification for adding human and machine readable meaning to commit messages, make commit messages easier to read and understand.

> To ensure the quality and consistency of commit messages, `commitlint` is used to validate that all commits follow this standard. see the [commitlint config here](./commitlint.config.ts)

## Contribution

We welcome contributions from the community! If you have suggestions for _improvements_, _new features_, or _bug fixes_, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](./LICENSE).
