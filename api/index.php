<?php
/**
 * 
 * 
 * @author Jabule Simanga
 * @copyright 2023
 */

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, DELETE, PUT, PATCH, OPTIONS");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Authorization, Accept, Client-Security-Token, Accept-Encoding");
header("Access-Control-Allow-Credentials: true");

require_once 'autoload.php';
require_once 'config.php';

$db_instance = new DBConnector($host, $username, $password, $database);
$db = $db_instance->getConnection();
$conn = $db;

$productController = new Controllers\ProductController($conn);

$productController->processRequest();
