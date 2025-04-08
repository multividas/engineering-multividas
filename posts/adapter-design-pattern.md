---
title: 'Adapter design pattern'
date: 2024-09-12
author: Soulaimane Yahya
gravatar: b07a2846505a2629b7123ad50d5e21c303cf7c562a8893473c2114f7491c7796
twitter: '@soulaimaneyh'
image: 'https://miro.medium.com/v2/resize:fit:720/format:webp/1*pLuuTU7pu1cbzin1Mov3bg.jpeg'
---

In this article, we’ll take a deep dive into Adapter design pattern, exploring its key features and providing practical expls of how to use it.

---

### Table Of Contents

- Adapter design pattern

# Adapter design pattern

The **Adapter** is a structural design pattern that allows incompatible interfaces to work together.
It acts as a bridge between *two objects* by converting the *interface of one class into an interface* expected by the client.

### Expl: Logging Adapter

```php
<?php

class LegacyFileLogger
{
    public function saveLogToFile(string $message): void
    {
        echo "Log saved to file: $message\n";
    }
}
```

```php
<?php

interface LoggerInterface
{
    public function log(string $message): void;
}
```

```php
<?php

use App\Legacy\LegacyFileLogger;
use App\Contracts\LoggerInterface;

class FileLoggerAdapter implements LoggerInterface
{
    private LegacyFileLogger $legacyLogger;

    public function __construct(LegacyFileLogger $legacyLogger)
    {
        $this->legacyLogger = $legacyLogger;
    }

    public function log(string $message): void
    {
        $this->legacyLogger->saveLogToFile($message);
    }
}
```

```php
<?php

use App\Legacy\LegacyFileLogger;
use App\Contracts\LoggerInterface;
use App\Adapters\FileLoggerAdapter;

class LoggerServiceProvider
{
    public function register()
    {
        $this->app->bind(LoggerInterface::class, function ($app) {
            $legacyLogger = new LegacyFileLogger();
            return new FileLoggerAdapter($legacyLogger);
        });
    }
}
```

```php
<?php

class LogController
{
    private LoggerInterface $logger;

    public function __construct(LoggerInterface $logger)
    {
        $this->logger = $logger;
    }

    public function logAction()
    {
        // Logging an action using the adapted logger
        $this->logger->log('An important action has been executed.');
    }
}
```

### Key features:

- **Integrates legacy systems**: Use old code without rewriting it.
- **Flexibility**: You can switch to another logging system (e.g., cloud logs) by creating a new adapter.
- **Maintainability**: Decouples your application from specific implementations, following the Dependency Inversion Principle.

