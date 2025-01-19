---
title: 'Singleton design pattern'
date: 2024-09-12
author: Soulaimane Yahya
gravatar: b07a2846505a2629b7123ad50d5e21c303cf7c562a8893473c2114f7491c7796
twitter: '@soulaimaneyh'
image: 'https://miro.medium.com/v2/resize:fit:720/format:webp/1*pLuuTU7pu1cbzin1Mov3bg.jpeg'
---

In this article, we’ll take a deep dive into Singleton design pattern, exploring its key features and providing practical expls of how to use it.

---

### Table Of Contents

- Singleton design pattern
- Global Access Point
- How to implement Singleton
- Creating Singleton class
- Conclusion

# Singleton design pattern

The **Singleton** is a creational design pattern ensures that a class has only one instance and provides a global point of access to that instance. It's useful when you need a single, shared resource across the application, such as a configuration manager or a database connection.

<img src="https://refactoring.guru/images/patterns/diagrams/singleton/structure-en.png" alt="singleton-design-pattern" />

## Global Access Point

A Singleton provides a `global access point` to the instance. The class typically has a static method (often getInstance()) that returns the unique instance, allowing different parts of the application to access the same object.

## How to implement Singleton

Controlling instance creation.

- **Private Constructor (__construct):** Prevents direct instantiation of the class.
- **Private Clone (__clone):** Prevents cloning of the class instance.
- **static:** Uses late static binding, allowing subclasses to have their own instance when `getInstance()` is called on them.
- **self:** Refers to the class where the method is defined, so it does not support subclassing in the same way.

### Two options of implementing a singleton

- Early initialization - Eager Singleton
- Create singleton as soon as class is loaded

- Lazy initialization - Lazy Singleton
- Singleton is created when it is first required

## Creating Singleton class

```php
class MultiChatContainer
{
  private static $instance = null;

  // Private constructor to prevent direct instantiation
  private function __construct()
  {
  }

  // Private __clone to prevent cloning
  private function __clone()
  {
  }
    
  /**
   * Get the globally available instance of the container.
   *
   * @return static
   */
  public static function getInstance(): static
  {
    if (is_null(static::$instance)) {
      static::$instance = new static;
    }

    return static::$instance;
  }
}

$app = MultiChatContainer::getInstance();
```

Giving access to a `Singleton` instance throughout the application, using public static method `getInstance()`.

## Additional Resources

- [Github Repo Explaining how PHP IoC works](https://github.com/soulaimaneyahya/php-ioc)
- [Laravel service container](https://engineering.multividas.com/posts/php-laravel-service-container)

## Conclusion

As software engineers, we use design patterns daily, this improves readability and lower maintenance cost. We use the singleton pattern to make sure we have the same instance when we resolve it.
