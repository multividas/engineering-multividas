---
title: 'Facade design pattern'
date: 2024-09-12
author: Soulaimane Yahya
gravatar: b07a2846505a2629b7123ad50d5e21c303cf7c562a8893473c2114f7491c7796
twitter: '@soulaimaneyh'
image: 'https://miro.medium.com/v2/resize:fit:720/format:webp/1*pLuuTU7pu1cbzin1Mov3bg.jpeg'
---

In this article, we’ll take a deep dive into Facade design pattern, exploring its key features and providing practical expls of how to use it.

---

### Table Of Contents

- Facade design pattern
- Conclusion

# Facade design pattern

**Facade Design Pattern** provides a simplified, `unified interface` to a complex system or set of subsystems. It hides the complexity of the system by exposing only essential methods, making it easier for clients to interact with the system.

Key features:

- **Simplifies interfaces:** Offers a straightforward interface to a complex set of classes, making it easier to use.
- **Decouples clients:** Reduces dependencies between the client and the complex subsystem.

- Client has to interact with a large number of interfaces and classes in a subsystem to get result. So client gets tighly coupled with those interfaces and classes. Facade solves this problem.

- Facade is NOT just a one to one method forwarding to other classes.

<img src="https://refactoring.guru/images/patterns/diagrams/facade/structure.png" alt="singleton-design-pattern" />

Using the `ApiResponser` facade to access the methods of `ApiRepositoryInterface` in your controller.

```php
use Multividas\ApiResponser\Facades\ApiResponser;

class PostsController
{
  public function index(): JsonResponse
  {
    return ApiResponser::showAll(Post::all());
  }

  public function show(string $postId): JsonResponse
  {
    $post = Post::find($postId);

    if (!$post instanceof Post) {
      return $this->infoResponse('Post Not Found', 404, (object)[]);
    }

    return ApiResponser::showOne($post);
  }
}
```

**Simplified interface:** The `ApiResponser` facade provides a clean and easy-to-use interface for interacting with the methods of `ApiRepositoryInterface` (like `showAll()` and `showOne()`), hiding the complexity of its underlying implementation.

**Static access:** With the facade, you're able to access the methods of the underlying `ApiRepositoryInterface` via static calls (`ApiResponser::showAll()`, etc.), without worrying about dependency injection or object instantiation in the controller.

**Encapsulation:** The facade hides the logic of how the `ApiRepositoryInterface` is resolved, providing a layer of abstraction.

## Conclusion

As software engineers, we use design patterns daily, this improves readability and lower maintenance cost. **Facade Design Pattern** provides a simplified, `unified interface` to a complex system or set of subsystems
