---
title: 'Explaining PHP Laravel Service Container'
date: 2024-09-12
author: Soulaimane Yahya
gravatar: b07a2846505a2629b7123ad50d5e21c303cf7c562a8893473c2114f7491c7796
twitter: '@soulaimaneyh'
image: 'https://miro.medium.com/v2/resize:fit:720/format:webp/1*IltI-lwvJR2OeZJKMgr81A.png'
---

In this article, we’ll take a deep dive into Laravel service container, exploring its key features and providing practical expls of how to use it.

---

# Explaining PHP Laravel Service Container

Laravel service container is a powerful tool that enables developers to manage dependencies and simplify the process of building large-scale web applications. In this article, we’ll take a deep dive into Laravel service container, exploring its key features and providing practical expls of how to use it.

### Table Of Contents

- Laravel service container
- How to Use Laravel Service Container?
- How to Register a Class Service and Resolve it
- Bind and Singleton Registrations
- Conclusion

## Laravel Service Container

At its core, Laravel’s service container is a dependency injection (DI) container that manages the instantiation of objects and their dependencies. In simpler terms, the service container is a container that holds and manages all of the objects and services that your application needs to function.

The service container is responsible for creating these objects and their dependencies, and then injecting them into your application’s code when they are needed.

The service container in Laravel is implemented using a technique called inversion of control (IoC). This technique is a design pattern that allows the framework to control the flow of your application's logic. Instead of your application code explicitly calling dependencies, the service container takes control of the process, creating and injecting dependencies as needed.

In traditional programming, if a class or function needs another class to perform its task (a dependency), you would typically create an instance of that dependency manually within your code. For expl:

```php
class OrderController
{
  public function __construct()
  {
    // Explicitly calling dependency
    $this->orderService = new OrderService();
  }
}
```

In this case, the OrderController is explicitly creating the OrderService instance. This tight coupling makes the code harder to maintain and test.

With Inversion of Control (IoC), the Laravel Service Container takes over the responsibility of creating and injecting the dependencies. Instead of manually creating the OrderService, the container automatically provides it when needed:

```php
class OrderController
{
  public function __construct(OrderService $orderService)
  {
    // Dependency is injected
    $this->orderService = $orderService;
  }
}
```

::: warning
Dependency refers to the instance of OrderService
:::

- [Github Repo Explaining how PHP IoC works:](https://github.com/soulaimaneyahya/php-ioc)

## How to Use Laravel Service Container?

Now that we've explored the benefits of Laravel's service container, let's dive into how to use it in your own Laravel applications. Here are the key steps to follow:

### Step 1: Define a Service Provider

The first step in using Laravel's service container is to define a service provider. A service provider is a class that tells the container how to create a particular service. To define a service provider, you can use Laravel's built-in artisan command:

```sh
php artisan make:provider UserServiceProvider
````

This command will create a new service provider class in the app/Providers directory. You can then define the service you want to create by adding it to the provider's register() method.

For example, let's say we want to create a new UserService that handles user authentication. We can define this service in our provider like this:

```php
use App\Services\UserService;

public function register()
{
  $this->app->singleton(UserService::class, function ($app) {
    return new UserService($app->make('Illuminate\Contracts\Hashing\Hasher'));
  });
}
```

In this example, we define a singleton service called UserService that depends on the Hasher interface. The Hasher interface is injected using the make() method, which retrieves it from the service container. We then use the returned Hasher instance to instantiate our UserService.

### Step 2: Register the Service Provider

Once we have defined our service provider, we need to register it with Laravel's service container. We can do this by adding it to the providers array in the config/app.php file:

```php
'providers' => [
    // ...
    App\Providers\UserServiceProvider::class,
],
```

This tells Laravel to load our service provider and use it to create our UserService when it is needed.

### Step 3: Use the Service

Finally, we can use our new UserService in our application code by injecting it into a controller or other class. We can do this using constructor injection, like this:

```php
use App\Services\UserService;

class UserController extends Controller
{
  protected $userService;

  public function __construct(UserService $userService)
  {
    $this->userService = $userService;
  }

  public function index()
  {
    // Use the UserService
    $user = $this->userService->authenticate(request('email'), request('password'));
    // ...
  }
}
```

In this example, we inject our UserService into our UserController using constructor injection. We then use the authenticate() method of our UserService to authenticate a user based on their email and password.

## How to Register a Class Service and Resolve it

Here is an expl of how to register a service named `ProductService` with the Laravel service container:

```php
use App\Services\ProductService;

app()->bind(ProductService::class, function() {
  $apiKey = env('PRODUCT_API_KEY');
  return new ProductService($apiKey);
});
```

Now, whenever Laravel sees the ProductService type-hint, it will automatically resolve an instance of the ProductService class from the service container and inject it with $apiKey.

::: info
The service container is responsible for creating these objects and their dependencies, and then injecting them into your application’s code when they are needed.
:::

there are a few other ways to resolve a class from the Laravel service container:

1- Constructor Injection:

```php
use App\Services\ProductService;
use Illuminate\Http\Request;

class ProductController extends Controller
{
  protected $productService;

  public function __construct(ProductService $productService)
  {
    $this->productService = $productService;
  }

  public function index(Request $request)
  {
    // Use the ProductService instance to get products
    $products = $this->productService->getProducts();

    return view('products.index', compact('products'));
  }
}
```

In this example, we are using constructor injection to inject an instance of the ProductService class into the ProductController. Laravel will automatically resolve the ProductService class from the service container and inject it into the constructor.

2- Method Injection:

```php
use App\Services\ProductService;

class ProductController extends Controller
{
  public function index(ProductService $productService)
  {
    $products = $productService->getAllProducts();

    return view('products.index', compact('products'));
  }
}
```

In this example, we are using method injection to inject an instance of the ProductService class into the index method of the ProductController. Laravel will automatically resolve the ProductService class from the service container and inject it into the method.

3- Using the resolve method:

```php
use Illuminate\Container\Container;
use App\Services\ProductService;

$productService = Container::getInstance()->make(ProductService::class);
```

In this example, we are manually resolving an instance of the ProductService class from the service container using the resolve method of the app() function.

## Bind and Singleton Registrations

The ProductService is expl of a class that can be registered with the Laravel service container using either the bind or singleton methods. Here's an example of how to do this:

```php
use App\Services\ProductService;

// Register the ProductService using the bind method
app()->bind(ProductService::class, function() {
  return new ProductService(rand(1, 100));
});

// Register the ProductService using the singleton method
app()->singleton(ProductService::class, function() {
  return new ProductService(rand(1, 100));
});
```

On the other hand, the singleton method registers the ProductService as a singleton instance, which means that only one instance of the class is created and shared throughout the entire application. **This can be useful when we want to ensure that all instances of the class share the same state or dependencies.**

```php
namespace App\Http\Controllers;

use App\ProductService;
use Illuminate\Http\Request;

class ProductController extends Controller
{
  public function index(Request $request)
  {
    // Resolve the ProductService
    $productService = app(ProductService::class);
    echo "Random number generated is {$productService->getRandomNumber()}<br>";
  }
}
```

## Conclusion

Laravel Service Container is a powerful feature of the Laravel framework that provides a convenient way to manage dependencies and perform dependency injection. It allows us to bind and resolve classes and interfaces, specify dependencies with constructor injection, and easily switch out implementations without affecting the rest of the application.

By using the Service Container, we can write more modular and flexible code that is easier to test, maintain, and scale. It also helps to reduce the amount of boilerplate code needed to manage dependencies, as the container automatically resolves dependencies for us.
