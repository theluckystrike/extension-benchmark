# Contributing to extension-benchmark

Thank you for your interest in contributing. This document outlines the process for contributing to extension-benchmark.

## REPORTING ISSUES

When reporting issues, please include:

1. A clear description of the problem
2. Steps to reproduce the issue
3. Expected behavior vs actual behavior
4. Environment details (Chrome version, Node version, OS)
5. Any relevant code samples or error messages

Before submitting, please search existing issues to avoid duplicates.

## DEVELOPMENT WORKFLOW

1. Fork the repository
2. Clone your fork locally
3. Create a feature branch from main
4. Make your changes
5. Run tests if applicable
6. Push to your fork and submit a pull request

### Building

```bash
npm install
npm run build
```

The build process compiles TypeScript to JavaScript in the dist directory.

## CODE STYLE

- Use TypeScript for all new code
- Follow the existing code conventions in the repository
- Use meaningful variable and function names
- Add JSDoc comments for public APIs
- Keep functions focused and concise

### TypeScript Guidelines

- Enable strict mode in tsconfig
- Prefer interfaces over types for object shapes
- Use explicit return types for exported functions
- Avoid any type annotations

## TESTING

Before submitting changes:

1. Verify the build completes without errors
2. Test manually in a Chrome extension environment if possible
3. Check that all TypeScript types are correct

```bash
npm run build
```

## LICENSE

By contributing to extension-benchmark, you agree that your contributions will be licensed under the MIT License.
