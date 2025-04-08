---
title: 'Bridge design pattern'
date: 2024-09-12
author: Soulaimane Yahya
gravatar: b07a2846505a2629b7123ad50d5e21c303cf7c562a8893473c2114f7491c7796
twitter: '@soulaimaneyh'
image: 'https://miro.medium.com/v2/resize:fit:720/format:webp/1*pLuuTU7pu1cbzin1Mov3bg.jpeg'
---

In this article, we’ll take a deep dive into Bridge design pattern, exploring its key features and providing practical expls of how to use it.

---

### Table Of Contents

- Bridge design pattern

# Bridge design pattern

The **Bridge** is a structural design pattern that separates an abstraction (interface) from its implementation, allowing them to evolve independently.
It’s useful for avoiding a large inheritance hierarchy by combining different abstractions and implementations dynamically.

### Expl: Messaging System

```php
interface MessageSenderInterface {
    public function send(string $message): void;
}
```

```php
<?php

class SmsSenderService implements MessageSenderInterface
{
    public function send(string $message): void
    {
        echo "Sending SMS: $message\n";
    }
}

class EmailSenderService implements MessageSenderInterface
{
    public function send(string $message): void
    {
        echo "Sending Email: $message\n";
    }
}
```

```php
use App\Services\SmsSenderService;
use App\Services\EmailSenderService;

public function register()
{
    $this->app->singleton(SmsSenderService::class, function ($app) {
        return new SmsSenderService();
    });

    $this->app->singleton(EmailSenderService::class, function ($app) {
        return new EmailSenderService();
    });
}
```

```php
// Message Abstract Class
abstract class Message
{
    protected MessageSenderInterface $messageSender;

    public function __construct(MessageSenderInterface $messageSender)
    {
        $this->messageSender = $messageSender;
    }

    abstract public function sendMessage(string $message): void;
}

// Urgent Message Concrete Class
class UrgentMessage extends Message
{
    public function sendMessage(string $message): void
    {
        echo '[Urgent] ';
        $this->messageSender->send($message);
    }
}

// Normal Message Concrete Class
class NormalMessage extends Message
{
    public function sendMessage(string $message): void
    {
        echo '[Normal] ';
        $this->messageSender->send($message);
    }
}
```

```php
<?php

use App\Services\SmsSenderService;
use App\Services\EmailSenderService;
use App\Messages\UrgentMessage;
use App\Messages\NormalMessage;

class MessageController
{
    protected SmsSenderService $smsSenderService;
    protected EmailSenderService $emailSenderService;

    public function __construct(SmsSenderService $smsSenderService, EmailSenderService $emailSenderService)
    {
        $this->smsSenderService = $smsSenderService;
        $this->emailSenderService = $emailSenderService;
    }

    public function sendUrgentSms()
    {
        $urgentSmsMessage = new UrgentMessage($this->smsSenderService);
        $urgentSmsMessage->sendMessage('System is down!');
    }

    public function sendNormalEmail()
    {
        $normalEmailMessage = new NormalMessage($this->emailSenderService);
        $normalEmailMessage->sendMessage('Monthly report available.');
    }
}
```

### Key features:

- **Decouples abstraction from implementation** (e.g., message type vs. sender).
- **Extensible**: Add new message types or platforms independently.
- **Usage**: Easily manage combinations in messaging, payment gateways, or rendering systems.
