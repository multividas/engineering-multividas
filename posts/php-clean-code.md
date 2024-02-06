---
title: 'PHP Clean Code Best Practices'
date: 2024-02-06
author: Soulaimane Yahya
gravatar: b07a2846505a2629b7123ad50d5e21c303cf7c562a8893473c2114f7491c7796
twitter: '@soulaimaneyh'
image: 'https://i0.wp.com/theorphic.space/wp-content/uploads/2021/10/sombrero-galaxy.jpg'
---

In this article, we'll explore best practices for writing clean PHP code, aiming to improve coding styling and build better software.

---

# PHP Clean Code Best Practices

Writing clean code is an essential part of software development that helps to improve maintainability, readability, and overall quality of the code. PHP, being one of the most popular programming languages, has a lot of features and tools that can help developers write clean code.

### Table Of Contents

- Use a consistent coding style
- A PHP built-in linter
- The PHP Coding styling tools
- PHP doc comments
- Conclusion

## Use a consistent coding style

Consistency is key when it comes to writing clean code. Using a consistent coding style throughout your codebase makes it easier to read and understand.

PHP has a number of coding standards such as PSR-1 and PSR-2, which provide a set of coding style guidelines for PHP, aiming to establish a common coding standard across projects and developers. The key rules prescribed by PSR-2 include:

1. Indentation: Code must use 4 spaces for indentation, not tabs, ensuring consistent and readable code formatting.

2. Namespace and Use Declarations: There should be a blank line after the namespace declaration and each group of use statements.

3. Class and Method Braces: The opening brace for classes and methods must be on the same line, while the closing brace must be on a new line. Methods and properties within a class should be separated by a blank line.

4. Method Visibility: The visibility of methods (e.g., public, private, protected) must be declared explicitly.

5. Control Structure Closing Brace: The closing brace for control structures (if, else, for, while, etc.) must be on the same line as the control keyword.

6. Method and Function Calls: There should not be a space between the method or function name and the opening parenthesis, and there should be no space before the closing parenthesis.

7. Method Arguments: In method arguments, there should be no space before the opening parenthesis and after the closing parenthesis. There should also be no spaces after commas in argument lists.

8. Array Declaration: Arrays must be declared using the short syntax ([]) rather than the traditional syntax (array()).

9. Single and Double Quotes: Strings may be enclosed with single or double quotes, but the chosen style must be consistent throughout the codebase.

10. Concatenation: When concatenating strings, use a space before and after the . operator.

Adhering to these standards can help to ensure consistency in your code.

## A PHP built-in linter

The initial tool to explore is not a standalone code quality tool but an inherent feature within the PHP binary, known as the Linter. It assesses code for syntax errors without executing it, ensuring code functionality post-refactoring or external tool modifications.

### Installation and usage

Since the Linter is already part of your PHP installation, we can immediately start using it by looking at an example.

```php
public function is_verified() bool {
return true;
}
```

Let us assume the preceding class can be found in the **app/Http/Controllers/UserController.php** file in the current folder - then, all we need to type is the following command:

```sh
php -lf app/Http/Controllers/UserController.php
```

We will get the following output:

```sh
PHP Parse error: syntax error, unexpected identifier  "bool", expecting ";" or "{" in UserController.php
```

::: info
The built-in PHP linter stops on the first error - as in, it will not give you a full list of all the detected errors. So, you better make sure to run the command again after resolving the issue.
:::

## The PHP Coding styling tools

### PHP CS Fixer

It scans PHP code for coding standard violations and other bad practices.

[PHP CS Fixer](https://github.com/FriendsOfPHP/PHP-CS-Fixer) is a viable choice to start with, since, as the name already implies, it not only reports the findings but also fixes them right away.

#### Installation and usage

Using Composer, the installation is straightforward:

```sh
composer require friendsofphp/php-cs-fixer --dev
```

If we run the code sniffer with its default settings, the command is nice and short:

```sh
vendor/bin/php-cs-fixer fix
```

#### Rules

PHP CS Fixer utilizes rules and rulesets to define coding standards and formatting instructions. Rules are specific instructions governing aspects of code formatting, organized within rulesets. For instance, to enforce the use of strict types in PHP, a rule like declare_strict_types can be applied using the command:

```sh
vendor/bin/php-cs-fixer fix --allow-risky=yes src --rules=declare_strict_types
```

For comprehensive coding standards like PSR-12, which consists of numerous formatting rules, using individual rules in a command becomes impractical. Instead, rulesets, denoted by the @ symbol, offer a solution. To adhere explicitly to PSR-12, the command is:

```sh
vendor/bin/php-cs-fixer fix src --rules=@PSR12
```

For a detailed list of rules and rulesets, refer to the official [PHP CS Fixer GitHub repository](https://github.com/FriendsOfPHP/PHP-CS-Fixer/tree/master/doc).

### PHP Code Sniffer

An important tool in the toolkit is a code sniffer, such as [PHP Code Sniffer](https://github.com/squizlabs/PHP_CodeSniffer). This tool scans PHP code for coding standard violations and undesirable practices, automatically fixing detected issues.

#### Installation and usage

Using Composer, the installation is straightforward:

```sh
composer require squizlabs/php_codesniffer --dev
```

The typical use case for code sniffers is to take care of the placement of brackets and the number of indentations, whether they're whitespaces or tabs. Let's check out the previous example with its ugly format:

After executing the code sniffer with its default settings using the command:

```sh
./vendor/bin/phpcs --standard=PSR2 app/Http/Controllers/UserController
```

The following errors were identified affecting 2 lines:

```
10 | ERROR | [ ] Method name "UserController::is_verified" is not in camel caps format
10 | ERROR | [x] Opening brace should be on a new line
11 | ERROR | [x] Line indented incorrectly; expected at least 8 spaces, found 4
```

Using PHP Clean code bestpractices

```php
/**
 * is user verified
 *
 * @return bool
 */
public function isVerified(): bool
{
  return true;
}
```

## PHP doc comments

In PHP clean code practices, the inclusion of meaningful doc comments holds paramount importance for code clarity and collaboration.

Doc comments serve as documentation embedded within the code, providing insights into the purpose, functionality, and usage of classes, methods, and functions.

They contribute significantly to the understandability of code, aiding both current developers and future contributors.

Properly documented code eliminates ambiguity and helps developers navigate through complex structures without delving into the source code.

Here's an example illustrating the use of doc comments:

```php
class UserController
{
  /**
   * The username to assign to the User.
   *
   * @var string
   */
  private string $username;

  /**
   * Constructs a new User instance.
   *
   * @param string $username
   */
  public function __construct(string $username)
  {
    $this->username = $username;
  }

  /**
   * Gets the username of the User.
   *
   * @return string
   */
  public function getUsername(): string
  {
    return $this->username;
  }
}

```

We recommend using the [phpdoc-comment-vscode-plugin](https://marketplace.visualstudio.com/items?itemName=imoca.php-doc-comment-vscode-plugin).

This plugin helps you to add phpdoc block automatically for function, variable and class in vscode.

## Additional Resources

- [JS Clean Code Best Practices](https://engineering.multividas.com/posts/javascript-clean-code)

## Conclusion

Writing clean and efficient code is essential for building better software. By following these PHP clean code best practices, you can improve your coding practices, make your code more readable and understandable, and reduce the likelihood of errors and bugs.
