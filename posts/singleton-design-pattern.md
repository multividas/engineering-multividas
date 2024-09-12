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
- Conclusion

# Singleton design pattern

The Singleton design pattern ensures that a class has only one instance and provides a global point of access to that instance. It's useful when you need a single, shared resource across the application, such as a configuration manager or a database connection.

Here's a brief overview of how it works:

- **Private Constructor:** The class has a private constructor to prevent external instantiation.
- **Static Instance:** A static instance of the class is created and used to store the single instance.
- **Public Method:** A public static method (often called getInstance()) provides access to the instance. If the instance doesn't exist, it's created; otherwise, the existing instance is returned.

```php
class MultiChatContainer
{
	private static $instance = null;
    
	private function __construct() {
	}

  private function __clone() {
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
```

In this example, `getInstance()` ensures that only one instance of the `Singleton` class exists throughout the application.

**Private Constructor (__construct):** Prevents direct instantiation of the class.

**Private Clone (__clone):** Prevents cloning of the class instance.

:::info
Any state you add in your singleton becomes part of "global state" of your application
:::

# Conclution

As software engineers, we use design patterns daily, this improves readability and lower maintenance cost. We use the singleton pattern to make sure we have the same instance when we resolve it.
