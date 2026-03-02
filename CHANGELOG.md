# Changelog

## 0.4.0

### Minor Changes

- eaa7b64: feat(seo): using @devsantara/head to manage head
- eaa7b64: feat(db): setup cloudflare d1 with drizzle-orm
- eaa7b64: feat(db): add drizzle studio for local and remote db
- eaa7b64: feat(auth): setup authentication with better-auth
- eaa7b64: feat(form): setup tanstack form
- eaa7b64: feat(ui): introduce new ui style
- eaa7b64: feat(i18n): add markup and text direction support

### Patch Changes

- eaa7b64: fix(ui): use text-pretty for title and description
- eaa7b64: fix(ui): invalid switch checked and unchecked selector
- eaa7b64: chore(bump): update dependencies
- eaa7b64: chore(agent): add basic skills
- eaa7b64: chore(release): migrate to changesets

## [0.3.0](https://github.com/devsantara/kit/compare/0.2.0...0.3.0) (2026-01-16)

### Features

- **i18n:** setup paraglide ([3435a64](https://github.com/devsantara/kit/commit/3435a647c1600d1264ca4195a9571d69952427e6))
- **observability:** setup posthog ([7f4c399](https://github.com/devsantara/kit/commit/7f4c3991d99acb437e80fa0b35d6c404623f89b9))
- **seo:** add metadata, opengraph, web manifest and icons ([5c0e864](https://github.com/devsantara/kit/commit/5c0e864792972ba09239d8408365a48d7bf74f6d))
- **seo:** create head metadata builder ([b3c41ec](https://github.com/devsantara/kit/commit/b3c41ec2378fb83a4d491a548c304f76d73973c5))

### Bug Fixes

- **storybook:** missing iframe.html on production build ([13ff3ab](https://github.com/devsantara/kit/commit/13ff3ab1d6debda0a39ceeb23125d4038f676487))

### Build System

- manually split posthog-js and @posthog/react from main bundle ([a0ecfb0](https://github.com/devsantara/kit/commit/a0ecfb040041cadfa1d519f86ad828855d6740c0))

### Continuous Integration

- **workflow:** split deployment and cleanup workflows ([1e2753a](https://github.com/devsantara/kit/commit/1e2753a437378dec73416946e2e23d8fc3b6467a))

### Chores

- **linter:** turn off capitalized comments rule ([ea65319](https://github.com/devsantara/kit/commit/ea6531995169a001a4b60d62b3c0ace0cea91788))
- **oxfmt:** update and add import and tailwindcss options ([c56f260](https://github.com/devsantara/kit/commit/c56f2608bb0cf6a0246900fc5126eef9da8ffff9))

## [0.2.0](https://github.com/devsantara/kit/compare/0.1.0...0.2.0) (2026-01-06)

### Features

- **server:** add server wait until ([e3e9ad4](https://github.com/devsantara/kit/commit/e3e9ad45a76a03f9427ef9b70bb84aa9709894d6))
- **ui:** add custom sans and mono fonts ([65a1f90](https://github.com/devsantara/kit/commit/65a1f905f7515a180f67c144234460d2faa5f0c3))
- **ui:** setup tailwindcss ([ca471dc](https://github.com/devsantara/kit/commit/ca471dcb4cbd90308d275a788df4fa0e3b7eb000))
- **ui:** setup ui library ([2c0647e](https://github.com/devsantara/kit/commit/2c0647e115bca204d8cde8658bd698c687e96dc8))

### Bug Fixes

- **deps:** some package imported from external module but never used ([968b7b2](https://github.com/devsantara/kit/commit/968b7b2c64165610d9a98845641254af381c2fe2))
- **typescript:** server bundles can leaking into client bundles ([c691288](https://github.com/devsantara/kit/commit/c6912881434110cb84ba85d25da907a615aad25f))

### Performance

- **react:** add react-compiler ([b180469](https://github.com/devsantara/kit/commit/b18046948e2834b9e1b5b861459e5a44e2c1de8c))

### Continuous Integration

- **deployment:** setup infrastructure and workflows ([39a0169](https://github.com/devsantara/kit/commit/39a0169758d01c45fcb792510b3f7915369bd023))

### Chores

- **bump:** update packages ([d8d9e57](https://github.com/devsantara/kit/commit/d8d9e573f50837ab6c7339e7fe7842e954a12e22))
- **formatter:** migrate prettier to oxfmt ([975a6c1](https://github.com/devsantara/kit/commit/975a6c17e47e7ff8d1adc3340d956f9cb1722488))
- **linter:** migrate eslint to oxlint ([b8ef08b](https://github.com/devsantara/kit/commit/b8ef08b8deef8d6b13f01e0aa313309ba7cacb8c))
- **vscode:** prevent routeTree file from being exposed in the editor ([56f72ed](https://github.com/devsantara/kit/commit/56f72ed287d895b67d40cddd0f539df03e1ba1a6))

## [0.1.0](https://github.com/devsantara/kit/compare/...0.1.0) (2025-12-14)

### Features

- **setup:** initialize base project with tanstack start ([0fedec6](https://github.com/devsantara/kit/commit/0fedec6cb03caf1f165fe9350bf5099f977b1002))
- **devtools:** setup router devtools ([0a9e41c](https://github.com/devsantara/kit/commit/0a9e41c2692a058ce59ad3aa405a2c6ea3ccff2b))

### Documentation

- **license:** add MIT license file ([d05b900](https://github.com/devsantara/kit/commit/d05b90023d0c09faff9e4da6861ec85727b3632d))
- **readme:** add header section ([7c7f15e](https://github.com/devsantara/kit/commit/7c7f15ec1fd2c4bab6ed45e87f13ab46f696a05e))
- **readme:** github don't render header tag properly ([e33e461](https://github.com/devsantara/kit/commit/e33e461c741b7725f5091f16e9c7cc1615224698))

### Continuous Integration

- **release:** setup release-it with conventional changelog ([d25df53](https://github.com/devsantara/kit/commit/d25df531fcb14f62aedb5961307ab9ca8e582fde))

### Chores

- **eslint:** add tanstack router plugin ([beb0bfa](https://github.com/devsantara/kit/commit/beb0bfa93cfebb1736b77011ca5e5a54db314ec7))
- **formatter:** setup prettier with oxc plugin ([f102641](https://github.com/devsantara/kit/commit/f10264103db317ee1c5975a10d230697687b3641))
- **lint-staged:** add eslint command ([32aad24](https://github.com/devsantara/kit/commit/32aad24533059aa08497f698d25f7df8805124a1))
- **linter:** check types with tsc ([03d6cc4](https://github.com/devsantara/kit/commit/03d6cc4836da827d969d44871886f43a1e3b62c3))
- **linter:** setup eslint ([2a81112](https://github.com/devsantara/kit/commit/2a811128b5ea801c999b032098f8ab152e098e27))
- **nvmrc:** add node version file ([2a80f44](https://github.com/devsantara/kit/commit/2a80f44a868282160eaa96a3cbb2fef9068c99a9))
- setup git hooks with commitlint ([e542142](https://github.com/devsantara/kit/commit/e5421422b8b17c1a8d43a812c0841ef0e4371a1c))
- **vscode:** add typescript settings ([bb01d5b](https://github.com/devsantara/kit/commit/bb01d5b96df13d62beac6d9a1cf75fc2c44a1e7d))
