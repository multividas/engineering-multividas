---
title: 'SOLID Principles in Java with Examples'
date: 2024-02-19
author: Chaimae CHAIRI
gravatar: b07a2846505a2629b7123ad50d5e21c303cf7c562a8893473c2114f7491c7796
image: 'https://miro.medium.com/max/1191/1*pzSz20jgRj0wqfS_8h0FLQ.png'
---

In this article, we will delve into the SOLID principles and their application in Java code. We will explore how these principles can guide us in writing clean and maintainable code, ultimately leading to better software development practices. 

---

# SOLID Principles in Java

SOLID is an acronym that represents a set of five design principles aimed at creating maintainable and scalable software. These principles, when applied, contribute to building robust and flexible object-oriented systems. Let's delve into each SOLID principle with clear examples in Java.

### Table Of Contents

- Single Responsibility Principle (SRP)
- Open/Closed Principle (OCP)
- Liskov Substitution Principle (LSP)
- Interface Segregation Principle (ISP)
- Dependency Inversion Principle (DIP)
- Conclusion

## Single Responsibility Principle (SRP)

The SRP emphasizes that a class should have a singular and well-defined responsibility. This means When a class takes on multiple responsibilities, it becomes challenging to manage and make changes to the codebase. By adhering to the SRP, we ensure that each class focuses on a specific task. Moreover, it becomes more modular and easier to understand. As a result, this promotes better code organization and enhancing the overall maintainability of our software systems. Each class becomes a building block with a clear and distinct purpose.

In the following example, the Employee class handles multiple responsibilities such as calculating salary, saving to a database, and sending email notifications. To adhere to the SRP, we can separate these responsibilities into individual classes, such as SalaryCalculator, DatabaseManager, and EmailNotifier.

```java
public class Employee {
    // ...
    public void calculateSalary() {
        // ...
    }
    public void saveToDatabase() {
        // ...
    }
    public void sendEmailNotification() {
        // ...
    }
}
```

In this refactored code, we have separated the responsibilities into three different classes. The Employee class now focuses solely on calculating the salary. The EmployeeRepository class is responsible for saving the employee to the database, and the EmailService class handles sending email notifications.

By dividing the responsibilities among different classes, we ensure that each class has a single responsibility and only one reason to change. 

```java
public class Employee {
    // ...
    public void calculateSalary() {
        // ...
    }
}

public class EmployeeRepository {
    public void saveToDatabase(Employee employee) {
        // ...
    }
}

public class EmailService {
    public void sendEmailNotification(Employee employee) {
        // ...
    }
}
```

## Open-Closed Principle (OCP)
The Open-Closed Principle (OCP) states that software entities should be open for extension but closed for modification. This principle promotes code reusability and maintainability. Let's consider an example where we want to add new shapes to an existing drawing application. The DrawingApplication class is open for extension, as we can easily add new shapes by implementing the Shape interface. However, it is closed for modification, as adding new shapes does not require changing the existing code. This allows us to introduce new shapes without impacting the core functionality of the application.


```java
public interface Shape {
    void draw();
}

public class Rectangle implements Shape {
    @Override
    public void draw() {
        // Draw rectangle
    }
}

public class Circle implements Shape {
    @Override
    public void draw() {
        // Draw circle
    }
}

public class DrawingApplication {
    private List<Shape> shapes;

    public DrawingApplication() {
        shapes = new ArrayList<>();
    }

    public void addShape(Shape shape) {
        shapes.add(shape);
    }

    public void drawAllShapes() {
        for (Shape shape : shapes) {
            shape.draw();
        }
    }
}
```

## Liskov Substitution Principle (LSP)

The LSP states that objects of a superclass should be replaceable with objects of its subclasses without affecting the correctness of the program. This principle ensures that subtypes can be used interchangeably with their base types. Consider the following example, the Square class violates the LSP since it changes the behavior of the setWidth() and setHeight() methods inherited from the Rectangle class. Code that expects a Rectangle object may not work correctly when a Square object is substituted. 

```java
public class Rectangle {
    protected int width;
    protected int height;

    public void setWidth(int width) {
        this.width = width;
    }

    public void setHeight(int height) {
        this.height = height;
    }

    public int calculateArea() {
        return width * height;
    }
}

public class Square extends Rectangle {
    @Override
    public void setWidth(int width) {
        this.width = width;
        this.height = width;
    }

    @Override
    public void setHeight(int height) {
        this.width = height;
        this.height = height;
    }
}
```

To adhere to the LSP, we can refactor the design to ensure that subclasses do not modify the behavior of inherited methods.

```java
public class Rectangle {
    protected int width;
    protected int height;

    public Rectangle(int width, int height) {
        this.width = width;
        this.height = height;
    }

    public int getWidth() {
        return width;
    }

    public void setWidth(int width) {
        this.width = width;
    }

    public int getHeight() {
        return height;
    }

    public void setHeight(int height) {
        this.height = height;
    }

    public int calculateArea() {
        return width * height;
    }
}

public class Square extends Rectangle {
    public Square(int sideLength) {
        super(sideLength, sideLength);
    }

    @Override
    public void setWidth(int width) {
        setSideLength(width);
    }

    @Override
    public void setHeight(int height) {
        setSideLength(height);
    }

    private void setSideLength(int sideLength) {
        super.setWidth(sideLength);
        super.setHeight(sideLength);
    }
}
```
In this refactored code, we introduce a constructor in the Rectangle class to set the width and height initially. The Square class then extends the Rectangle class and uses the setSideLength() method to update both the width and height simultaneously. This ensures that the behavior of the inherited methods is maintained, and objects of the Square class can be used interchangeably with objects of the Rectangle class without affecting the correctness of the program.


## Interface Segregation Principle (ISP)

The ISP states that clients should not be obligated to rely on interfaces they don't utilize. This principle promotes the creation of cohesive and lean interfaces. Consider the following example, the Printer interface violates the ISP since clients thatdepend on it are forced to implement methods they do not use.

```java
public interface Printer {
    void print();
    void scan();
    void fax();
}

public class LaserPrinter implements Printer {
    @Override
    public void print() {
        // Print using laser technology
    }

    @Override
    public void scan() {
        // Scan document
    }

    @Override
    public void fax() {
        // Fax document
    }
}

public class InkjetPrinter implements Printer {
    @Override
    public void print() {
        // Print using inkjet technology
    }

    @Override
    public void scan() {
        throw new UnsupportedOperationException("This printer does not support scanning");
    }

    @Override
    public void fax() {
        throw new UnsupportedOperationException("This printer does not support faxing");
    }
}
```
 
 To adhere to the ISP, we can refactor the interface into smaller, more focused interfaces like PrintCapable, ScanCapable, and FaxCapable, which can be implemented by specific printer classes based on their capabilities.

```java
public interface Printer {
    void print();
}

public interface Scanner {
    void scan();
}

public interface FaxMachine {
    void fax();
}

public class LaserPrinter implements Printer, Scanner, FaxMachine {
    @Override
    public void print() {
        // Print using laser technology
    }

    @Override
    public void scan() {
        // Scan document
    }

    @Override
    public void fax() {
        // Fax document
    }
}

public class InkjetPrinter implements Printer {
    @Override
    public void print() {
        // Print using inkjet technology
    }
}
```
In this refactored code, we have separated the Printer interface into three smaller interfaces: Printer, Scanner, and FaxMachine. The LaserPrinter class implements all three interfaces to indicate that it supports printing, scanning, and faxing. The InkjetPrinter class only implements the Printer interface since it does not support scanning or faxing.

## Dependency Inversion Principle (DIP)

The DIP states that high-level modules should not depend on low-level modules. Instead, both should depend on abstractions. This principle promotes loose coupling and flexibility in the codebase. Consider the following example, the NotificationService class depends on the abstraction provided by the MessageSender interface rather than concrete implementations. This allows us to easily swap different implementations of the MessageSender interface (e.g., EmailSender, SMSMessageSender) without modifying the NotificationService class.

```java
public interface MessageSender {
    void sendMessage(String message);
}

public class EmailSender implements MessageSender {
    @Override
    public void sendMessage(String message) {
        // Send email message
    }
}

public class SMSMessageSender implements MessageSender {
    @Override
    public void sendMessage(String message) {
        // Send SMS message
    }
}

public class NotificationService {
    private MessageSender messageSender;

    public NotificationService(MessageSender messageSender) {
        this.messageSender = messageSender;
    }

    public void sendNotification(String message) {
        messageSender.sendMessage(message);
    }
}
```

## Conclusion

By understanding and applying the SOLID principles in Java, developers can write code that is more maintainable, extensible, and easier to test. The Single Responsibility Principle (SRP), Open-Closed Principle (OCP), Liskov Substitution Principle (LSP), Interface Segregation Principle (ISP), and Dependency Inversion Principle (DIP) provide guidelines for designing software that is flexible, modular, and resilient to change. 

Finally, SOLID principles are not strict rules but rather guidelines to strive for. They promote good software design practices and help create code that is easier to understand, maintain, and evolve over time.

