# Code Review Checklist

## Clean Code Principles

### Variables

- Meaningful variable names, serving to its purpose of existence.
- Short distance between variable declaration and usage.
- No magic numbers and/or hard-coded values, make use of a constants in an organized manner.

### Methods

- Meaningful method names, serving to its purpose of existence.
- Limited number of methods per class, no redundant or irrelevant methods within a class.
- Limited number of method variables (use of objects instead of primitives if the limit is exceeded)
- Limited number of lines per method, extract to another method if the limit is exceeded.

### Misc

- Easy to read source code.
- No redundant comments, instead the code (thanks to its readibility) justifies itself.
- No nested if-statements, no or low cyclomatic complexity.
- No conditional complexity.
- No duplication (DRY vs WET)
- Same standard and coding style all accross the project, no subtle differences from one file to another.

## OO and SOLID Principles

- Methods comply with single responsibility principle
- Dependencies are injected not wired by hand (no `new FooBar()` to initialize a dep).
- Limited number of inter-dependencies between classes.
- No redundant use of interfaces (or other abstractions)
- Well designed interfaces, with least content and method signatures.
- Open to extension closed to modification

## General Design Principles

- No business-logic incorporated using exceptions or null statements.
- No logic driven by flags to complicate a method's business logic.
- Domain models are well understood and modeled independent of the framework.
- No redundant use of design patterns, responsible usage to solve an actual problem.
- Well designed code that will avoid future 'shotgun-surgeries' when new change requests are made.
- Web standards are respected
- Validation are incorporated as a defense mechanism.
- SOC is respected (i.e. controller, service, repository)
- No business logic incorporated anywhere except service layer (no logic in controller or repo)
- Logging mechanisms are incorporated to display the trace (including error details) when things go south.
- Logging mechanisms are incorporated to display the meaningful information during runtime.
- Exceptions are not ignored but handled accordingly.

## Test Principles

- Tests should cover the class responsibilites and populated with respect to each class behaviour.
- Test suits are well designed and structured (see _GWT_).
- Good usage of mocks to test the behavior.
- Single assertion per test.
- Tests cover the corner cases.
- When source code changes at least one test should fail.

## Others

- README includes the full information to setup/install/run the project for a new born.
- Caching is incorporated for expensive operations.
- Dockerfile or docker-compose best practices are respected.
- No over-engineering no gold-plating no shady libraries/dependencies.
- No redundant dependencies.
- Environment base variables are kept in config, not hard-coded into the code base.
- Git practices are respected (small size, iterative commits, clean history, good commit messages, ignored files/folders etc.)
