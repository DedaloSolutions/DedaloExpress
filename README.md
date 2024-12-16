<a id="readme-top"></a>
# Dedalo Express

This repository contains a lightweight framework inspired by Express, designed to simplify the creation and management of APIs. The framework provides both a traditional middleware approach using Routers and a modern, decorator-based syntax to define routes and handlers. It includes features like error handling, body parsers, static file serving, and support for CORS, making it a flexible and powerful tool for building RESTful APIs.

In the following sections, you will find instructions on how to install, use, and extend the framework, along with examples of both the legacy syntax (Router-based) and the new syntax (decorator-based).

## Table of Contents

1. [Introduction](#introduction)  
   1.1 [What is this Framework?](#what-is-this-framework)  
   1.2 [Key Features](#key-features)  
2. [Installation](#installation)  
   2.1 [Prerequisites](#prerequisites)  
   2.2 [Installing the Framework](#installing-the-framework)  
3. [Usage with legacy syntax](#usage-with-legacy-syntax)  
   3.1 [Creating a Router](#creating-a-router)  
   3.2 [Registering Middlewares](#registering-middlewares)  
   3.3 [Using CORS Middleware](#using-cors-middleware)  
4. [Usage with new Syntax (with Decorators)](#usage-with-new-syntax)  
   4.1 [Creating a Controller](#creating-a-controller)  
   4.2 [Registering Controllers](#registering-controllers)  
   4.3 [Using Route and Before/After Decorators](#using-route-and-beforeafter-decorators)  
   4.4 [Using Cors Decorator](#using-cors-decorator)  
5. [Error Handling](#error-handling)  
   5.1 [Default Error Handling](#default-error-handling)  
   5.2 [Customizing the Error Handling](#customizing-the-error-handling)  
6. [Parsers](#parsers)  
   6.1 [Adding a Parser](#adding-a-parser)  
   6.2 [Parser Configuration](#parser-configuration)  
7. [Static Files](#static-files)  
   7.1 [Serving Static Files](#serving-static-files)  
   7.2 [Configuring Cache and MIME Types](#configuring-cache-and-mime-types)

<br>

<a id="introduction"></a>
<p align="right" style="margin: 0">(<a href="#readme-top">back to top</a>)</p>

# 1. Introduction

<a id="what-is-this-framework"></a>
## 1.1 What is this Framework?

This framework is a simple and extensible API framework inspired by Express. It allows developers to create APIs with either a traditional router-based approach or a modern decorator-based approach. With built-in support for error handling, parsing request bodies, CORS, and serving static files, this framework provides everything you need to build a robust API.

<a id="key-features"></a>
## 1.2 Key Features

- **Middleware-based routing**: Register middlewares for various HTTP methods and routes.
- **Decorators**: Easily define routes and handlers using decorators for cleaner, more readable code.
- **Error handling**: Automatic JSON error responses, with the ability to customize error handling.
- **Parsers**: Custom parsers for body and query parameters to handle different content types.
- **Static file serving**: Serve static files with customizable options like caching and MIME types.
- **CORS support**: Enable CORS for specific routes or globally across the app.
- **Flexible routing**: Use either router-based or controller-based routing depending on your preference.

This framework is designed to be simple, flexible, and easy to extend, making it ideal for a wide range of API projects.

<a id="installation"></a>
<p align="right" style="margin: 0">(<a href="#readme-top">back to top</a>)</p>

# 2. Installation

<a id="prerequisites"></a>
## 2.1 Prerequisites

Before you can use this framework, ensure that you have the following prerequisites:

- **Node.js** (version 14.x or higher)
- **npm** (Node package manager) or **yarn**
- A basic understanding of TypeScript or JavaScript

<a id="installing-the-framework"></a>
## 2.2 Installing the Framework

To get started, install the framework into your project. You can do so by running the following command in your terminal:

```bash
npm install https://github.com/DedaloSolutions/DedaloExpress
```

Alternatively, if you’re using yarn:

```bash
yarn add https://github.com/DedaloSolutions/DedaloExpress
```

Once installed, you can begin using the framework in your project by importing it into your server files.

```typescript
import express from 'express';
```

After the installation, proceed to set up your server and start building your API using either the legacy or new syntax, as described in the next sections.

<a id="usage-with-legacy-syntax"></a>
<p align="right" style="margin: 0">(<a href="#readme-top">back to top</a>)</p>

# 3 Usage with legacy syntax

The legacy syntax follows a traditional middleware-based routing system, similar to the well-known Express framework. You define routes and middlewares using the `Router` class and associate them with specific HTTP methods and URLs.

<a id="creating-a-router"></a>
## 3.1 Creating a Router

To create a router instance, simply instantiate the `Router` class. A router is used to define route-handling functions and group them together by their paths and HTTP methods.

```typescript
import { Router } from 'express';

// Create a new router instance
const router = new Router();

// Define routes
router.use('GET', '/',
   (req, res, next) => {
      res.json({ message: 'Hello, world!' });
   }
);

router.use('POST', '/submit',
   (req, res, next) => {
      // Handle POST request
      res.json({ message: 'Data submitted!' });
   }
);
```

<p align="right" style="margin: 0">(<a href="#readme-top">back to top</a>)</p>
<a id="registering-middlewares"></a>

## 3.2 Registering Middlewares
The **use** function is used to associate a stack of functions (handlers) or other routers to a specific HTTP method and URL. Each function in the stack can process the request before passing it along or sending a response.

To register a middleware globally:

```typescript
router.use(
   (req, res, next) => {
      console.log('Logging request:', req.method, req.url);
   }
);
```


For route-specific middleware:

```typescript
router.use('GET', '/special',
   (req, res, next) => {
      res.json({ message: 'This is a special route' });
   }
);
```

You can also use a stack of multiple handlers for a single route:

```typescript
router.use('GET', '/multiple',
   (req, res, next) => {
      console.log('First handler');
      next(); // Continue the stack
   },
   (req, res) => {
      res.json({ message: 'Second handler' });
   }
);
```

Once your routes and middlewares are set up, you can create and start the server using the Express class, which extends the Router class. The use function is used to associate your router with the app.

When a handler function needs to proceed to the next middleware in the stack, it must call the next function without any arguments. If the next function is invoked with an argument, the stack execution halts, and the argument is treated as an exception. This exception is then passed to the application’s error-handling function, allowing you to manage errors gracefully and stop further middleware processing.

```typescript
import express from 'express';

// Create an Express app
const app = express();

// Register the handlers with the app
app.use('GET', '/',
   (req, res) => {
      res.json('Hello world');
   }
);

// Start the server
await app.listen(3000);
console.log('Server is running on http://localhost:3000');
```

<a id="using-cors-middleware"></a>
## 3.3 Using CORS Middleware

Cross-Origin Resource Sharing (CORS) is a mechanism that allows resources on a web server to be requested from another domain. This is particularly useful for APIs that need to allow requests from different domains or for client-side applications that are hosted separately from the API server.

The framework provides an easy way to configure CORS using either the static `cors` function or custom middleware. By adding the CORS middleware to specific routes or globally, you can control which domains can access your API, the allowed HTTP methods, and other CORS-related settings.

Here's how to use the built-in CORS middleware:

```typescript
import express from 'express';

const app = express();

// Define a route that will be accessible from the specified domain
const corsMiddleware = Express.cors({ origin: 'http://example.com' });

// Define a route for a OPTIONS request to the url
app.use('OPTIONS', '/data', corsMiddleware);

// Define the route with a custom stack
app.use('GET', '/data',
   corsMiddleware
   (req, res) => {
      res.json({ message: 'This data is accessible from http://example.com' });
   }
);

// Start the server
await app.listen(3000);
console.log('Server is running on http://localhost:3000');
```

In the example above, the Express.cors middleware is used to allow requests from http://example.com. You can configure the CORS options to support more complex use cases, such as allowing multiple domains, controlling the allowed HTTP methods, and setting additional headers.

You can also define a global CORS middleware:
```typescript
import express from 'express';

const app = express();

// Define a route that will be accessible from the specified domain
app.use(Express.cors({ origin: 'http://example.com' }));

// Start the server
await app.listen(3000);
console.log('Server is running on http://localhost:3000');
```

Since the routing follows a ‘first match, then proceed’ approach, we recommend placing the global CORS handler at the end of your middleware stack to ensure it applies to all routes.

The CORS options are defined as follows:
- **origin**: A string or an array of strings specifying which domains are allowed to access the resources. For example, 'http://example.com' or ['http://example.com', 'http://anotherdomain.com'].
- **methods**: A string or an array of HTTP methods (e.g., GET, POST, PUT) that are allowed for cross-origin requests.
- **allowedHeaders**: A string or array of HTTP headers that can be used when making the actual request (e.g., Content-Type, Authorization).
- **credentials**: A boolean indicating whether to allow sending cookies or authorization headers with the request.
- **maxAge**: An integer indicating how long the results of a preflight request can be cached by the browser (in seconds).

You can customize the CORS options according to your application’s needs to control cross-origin access effectively.

<a id="usage-with-new-syntax"></a>
<p align="right" style="margin: 0">(<a href="#readme-top">back to top</a>)</p>

# 4 Usage with new syntax (with Decorators)

The new syntax leverages decorators to simplify route handling and middleware association. This approach uses TypeScript's decorator functionality to map HTTP methods, URLs, and middleware functions to controller methods.

<a id="creating-a-controller"></a>
## 4.1 Creating a Controller

In this syntax, controllers are used to group related routes. Each controller can define routes for different HTTP methods and URL patterns. A controller class is decorated with the `@Controller` decorator, and its methods are decorated with route decorators.

```typescript
import { Controller, Route } from 'express';

@Controller('/example') // The prefix to all the routes inside the class
export default class ExampleController {

   @Route('GET', '/') // Associate method and URL to the function
   get(req, res) {
      res.json({ message: 'Hello from the controller!' });
   }

   @Route('POST', '/submit') // Another route
   post(req, res) {
      res.json({ message: 'Data received' });
   }
}
```

<a id="registering-controllers"></a>
## 4.2 Registering Controllers

Once you've defined a controller using decorators, you need to register it with the router or server instance to make it functional. You can register controllers either manually or by automatically scanning a directory containing the controllers.

### Manual Registration

To register a controller manually, use the `register` method in the `Express` or `Router` instance, passing the controller class as an argument. This will allow the routes and middlewares defined in the controller to be registered:

```typescript
import express from 'express';
import ExampleController from './controllers/ExampleController';

// Initializate the server
const app = express();

// Register the Controller
app.register(ExampleController);

// Start the server
await app.listen(3000);
console.log('Server is running on http://localhost:3000');
```

### Automatic Registration

If you have a large number of controllers, you can automatically register them from a directory using the registerFrom method. This method takes the directory path as its argument, and it will load and register all controllers that match the provided filter (default is .controller.ts or .controller.js files).

```typescript
import express from 'express';
import path from 'path';

// Inizialize the server
const app = express();

// Register all the controllers in the "controllers" directory
app.registerFrom(path.join(__dirname, 'controllers'));

// Start the server
await app.listen(3000);
console.log('Server is running on http://localhost:3000');
```

This method will automatically scan the specified directory for any files matching the filter and register them as controllers.

<a id="using-route-and-beforeafter-decorators"></a>
## 4.3 Using Route and Before/After Decorators

In addition to basic routing, you can use **@BeforeRoute** and **@AfterRoute** decorators to define functions that run before or after the route handler is executed. This is useful for validation, logging, or modifying request/response data.

```typescript
import { Controller, Route, BeforeRoute, AfterRoute } from 'express';

@Controller('/user') // The prefix for all the route(s) specified inside the class
export default class UserController {

   @Route('GET', '/:id')
   @BeforeRoute((req, res) => true, () => true) // Function before route; More than one handler can be specified
   @AfterRoute(() => false) // Function after route
   getUser(req, res) {
      const userId = req.params.id;
      res.json({ userId });
   }

}
```

The **@BeforeRoute** and **@AfterRoute** decorators require handler functions that explicitly return true to continue processing the middleware stack. If a handler function does not explicitly return true (e.g., it returns false or void), the stack will halt.

Moreover, any exceptions thrown by these handlers are automatically intercepted by the application’s error-handling system. This is equivalent to calling the next function with the exception as an argument, ensuring consistent and centralized error management.

<a id="using-cors-decorator"></a>
## 4.4 Using Cors Decorator

You can enable CORS for specific routes using the @Cors decorator. This decorator allows you to define CORS options like allowed origins, methods, headers, and more.

```typescript
import { Controller, Route, Cors } from 'express';

@Controller('/api')
export default class ApiController {

   @Route('GET', '/data')
   @Cors({ origin: 'http://custom-origin.com' }) // Enable CORS for this route
   getData(req, res) {
      res.json({ data: 'Some important data' });
   }

}
```

The **@Cors** decorator can be customized with the same options used by the **Express.cors** static function.

<a id="error-handling"></a>
<p align="right" style="margin: 0">(<a href="#readme-top">back to top</a>)</p>

# 5. Error Handling

Error handling is an essential part of building a robust API. This framework provides a default error-handling mechanism, but it also allows you to customize how errors are managed and reported.

<a id="default-error-handling"></a>
## 5.1 Default Error Handling

By default, any exceptions that occur during the handling of a request are passed to the `onError` function of the `Express` instance. This function is responsible for logging the error and returning a JSON response with the error details. The framework automatically handles errors thrown by the route handlers, middlewares, or even the framework itself.

The default error response includes the exception's message and other information about the error. Here's an example of how errors are returned:

```json
{
   "message": "An unexpected error occurred",
   // Other properties from the "info" value in ExpressException
}
```

You do not need to manually catch errors in your route handlers; the framework will take care of that for you.

<a id="customizing-the-error-handling"></a>
## 5.2 Customizing the Error Handling

You can customize the error handling mechanism by overriding the onError function in the Express instance. This is useful if you want to log errors differently, send additional data in the error response, or modify the default error format.

To customize the error handler, simply define a new onError function after initializing your Express app:

```typescript
import express from 'express';

const app = express();

// Override the default error handler
app.onError = (err: unknown) => {
   console.error('Custom error handling:', err.message);

   // You can modify the response as needed
   return {
      message: 'Custom error response',
      statusCode: err.statusCode,
      details: err.info
   };
};

// Start the server
await app.listen(3000);
console.log('Server is running on http://localhost:3000');
```

You can also define a custom onError function using the legacy syntax by calling the use method with a single handler function that takes **req**, **res**, **next**, and **exception** as arguments.  
Keep in mind that within this context, calling the next function will have no effect, as it will not propagate the error further in the stack.

```typescript
import express, { Request, Response, NextFunction } from 'express';

const app = express();

// Override the default error handler
app.use(
   (err: unknown, req: Request, res: Response, next: NextFunction) => {
      console.error('Custom error handling:', err.message);

      // You can modify the response as needed
      return {
         message: 'Custom error response',
         statusCode: err.statusCode,
         details: err.info
      };
   }
)

// Start the server
await app.listen(3000);
console.log('Server is running on http://localhost:3000');
```

The onError function allows you to handle exceptions that occur during the execution of your application. It is recommended to use the ExpressException object, which provides structured details such as the error message, status code, and additional context. However, you can customize the onError function to suit your needs. For example, you could modify the response sent to the client or implement additional features, such as logging the error to an external monitoring service or sending notifications.

<a id="parsers"></a>
<p align="right" style="margin: 0">(<a href="#readme-top">back to top</a>)</p>

# 6. Parsers

Parsers allow the framework to handle different types of request bodies (such as JSON, form data, etc.) by transforming the raw request data into a structured format. The framework provides a flexible way to add and configure parsers for different content types.

<a id="adding-a-parser"></a>
## 6.1 Adding a Parser

To add a parser, you need to define a parser object that includes three functions: `match`, `decode`, and `encode`. The `match` function is responsible for determining whether the request's body can be parsed by this parser. The `decode` function is used to process the raw data, while the `encode` function is used to convert the response data into the appropriate format.

Here's an example of adding a custom JSON parser:

```typescript
import express, { Parser } from 'express';

// Initialize the server
const app = express();

// Define a parser
const jsonParser: Parser = {
   match: (req) => {
      return req.headers['content-type'] === 'application/json', // Check if the body is JSON
   },
   decode: (req) => {
      // req.body is a UInt8Array if it isn't already parsed by other parser
      const str = Buffer.from(req.body).toString("utf-8");

      // Parse the JSON body
      req.body = JSON.parse(str);
   },
   encode: (body, res) => {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(body)); // Send the JSON response
   }
};

// Add the parser to the Express instance
app.addParser('json', jsonParser);

// Start the server
await app.listen(3000);
console.log('Server is running on http://localhost:3000');
```

<a id="parser-configuration"></a>
## 6.2 Parser Configuration

When configuring parsers, multiple formatters can be used in combination, allowing the framework to support different types of request bodies and output formats. The request body is initially received as a UInt8Array (raw data), and before calling the decode function, the framework verifies if a parser can handle the body by using the match function.

Each parser is registered with its match function to determine whether it is capable of handling the request. This is particularly useful for situations where the body can potentially match multiple parsers (e.g., JSON and XML) and allows the framework to call the appropriate parser based on the content type or other criteria.

Here’s an example of configuring multiple parsers with different match conditions:

```typescript
import { Express, Parser } from 'express';

const app = new Express();

// JSON parser
const jsonParser: Parser = {
    match: (req) => req.headers['content-type'] === 'application/json', // Match JSON
    decode: (req) => {
      // req.body is a UInt8Array if it isn't already parsed by other parser
      const str = Buffer.from(req.body).toString("utf-8");

      // Parse the JSON body
      req.body = JSON.parse(str);
    },
    encode: (body, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(body)); // Send the JSON response
    }
};

// XML parser
const xmlParser: Parser = {
    match: (req) => req.headers['content-type'] === 'application/xml', // Match XML
    decode: (req) => {
        // Parse XML body (assuming an XML parser is available)
        req.body = parseXML(req.body); // Custom XML parsing function
    },
    encode: (body, res) => {
        res.setHeader('Content-Type', 'application/xml');
        res.end(toXML(body)); // Custom XML encoding function
    }
};

// Add both parsers
app.addParser('json', jsonParser);
app.addParser('xml', xmlParser);

// Start the server
await app.listen(3000);
console.log('Server is running on http://localhost:3000');
```

<a id="static-files"></a>
<p align="right" style="margin: 0">(<a href="#readme-top">back to top</a>)</p>

# 7. Static Files

Serving static files is a common requirement for web applications. This framework provides an easy way to expose and serve static files (like images, stylesheets, and JavaScript files) from a directory. You can configure caching headers and MIME types for better control over how static content is handled by the server.

<a id="serving-static-files"></a>
## 7.1 Serving Static Files

The `Express` class includes a `serve` function to expose a directory as static content. You can use this function to make files available to clients when they request a specific URL path.

Here's an example of serving static files from a directory:

```typescript
import { Express } from 'express';

const app = new Express();

// Serve static files from the 'public' directory under the '/public' URL path
app.use('/public', Express.serve('public'));

// Start the server
await app.listen(3000);
console.log('Server is running on http://localhost:3000');
```

In this example, any file inside the public directory will be accessible at http://localhost:3000/public/{filename}. The framework will automatically handle reading and sending the correct file based on the request.

<a id="configuring-cache-and-mime-types"></a>
## 7.2 Configuring Cache and MIME Types
When serving static files, you might want to control cache settings, MIME types, or the default file to be served when a directory is accessed. You can configure these options using the ServeOption type, which allows you to customize aspects like caching headers and file handling.

Here’s an example of how to configure cache control and MIME types:

```typescript
import express, { ServeOption } from 'express';

const app = express();

// Configure options for serving static files
const options: ServeOption = {
    cacheControl: true,                          // Enable cache control headers
    maxAge: 3600,                                // Set the maximum cache age to 1 hour (in seconds)
    mimeTypes: {                                 // Define custom MIME types
        '.js': 'application/javascript',
        '.css': 'text/css',
    },
    defaultFile: 'index.html',                   // Serve 'index.html' when a directory is accessed
    allowedExtensions: ['.html', '.js', '.css'], // Only allow certain file types
};

// Serve static files with configured options
app.use('/static', Express.serve('static', options));

await app.listen(3000);
console.log('Server is running on http://localhost:3000');
```

In this example, the following options are set:
- **cacheControl**: Enables cache control headers to improve performance by allowing the client to cache files.
- **maxAge**: Specifies the duration (in seconds) for which files should be cached by the browser.
- **mimeTypes**: Defines custom MIME types for certain file extensions.
- **defaultFile**: Specifies the default file to serve when a directory is accessed (e.g., index.html).
- **allowedExtensions**: Restricts which file types can be served to the client.

By configuring these options, you can optimize how static content is served and how browsers interact with the files.