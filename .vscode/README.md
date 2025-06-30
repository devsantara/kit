# Visual Studio Code Workspace Settings

## Settings

VS Code stores setting values in a [`settings.json`](./settings.json) file. There are several configurations that have been made to make the work process easier and more comfortable with the following settings:

- **Format on save** for Prettier.
- **Auto fixAll** on save for Eslint.
- Not to show errors in your editor (for `@stylistic` rules), but still have the ability to auto-fix them.
- Enable **TailwindCSS** syntax highlighting for `.css` files.
- Enable intellisense suggestions inside strings (e.g., in `className="..."`)
- Recognize class attributes and functions for **TailwindCSS** Intellisense.
- Disable **TailwindCSS** Intellisense warnings on utility class conflicts (_Eslint already handle this_).

## Extensions

You can see a list of recommended extensions using Show Recommended Extensions, which sets the `@recommended` filter. All recommended extensions are in a [`extensions.json`](./extensions.json) file.

- [`Eslint`](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [`Prettier`](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [`Tailwind CSS IntelliSense`](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)

## Code Snippets

All available code snippets are listed in the file with the subfix `code-snippets`, here is a list of all code snippets available to you:

| Scope                          | Prefix | Description                            |
| ------------------------------ | ------ | -------------------------------------- |
| [React](./react.code-snippets) | `ir`   | React Namespace Import                 |
|                                | `uc`   | Add `use client` directive             |
|                                | `us`   | Add `use server` directive             |
|                                | `rfc`  | React Function Component Without Props |
|                                | `rfcp` | React Function Component With Props    |
|                                | `rf`   | React Fragment Element                 |
|                                | `rs`   | React Suspense Element                 |
|                                | `rch`  | React Custom Hook                      |
|                                | `rus`  | React useState Hook                    |
|                                | `rue`  | React useEffect Hook                   |
|                                | `rur`  | React useRef Hook                      |
|                                | `rcc`  | React Create Context                   |
|                                | `ruc`  | React Context Hook                     |
