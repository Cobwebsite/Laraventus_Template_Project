<?php

use Aventus\Laraventus\Exceptions\AventusExceptionCatcher;
use Aventus\Laraventus\Middlewares\AventusAttributesMiddleware;
use Aventus\Laraventus\Middlewares\AventusMiddleware;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->append(AventusMiddleware::class);
        $middleware->appendToGroup('web', AventusAttributesMiddleware::class);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        AventusExceptionCatcher::use($exceptions);
    })->create();
