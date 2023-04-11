<?php
/**
 * 
 * 
 * @author Jabule Simanga
 * @copyright 2023
 */

spl_autoload_register(function($className) {
    $className = str_replace('\\', '/', $className);
    $file = __DIR__ . '/' . $className . '.php';
    if (file_exists($file)) {
        include $file;
    }
});
