<?php
/**
 * 
 * 
 * @author Jabule Simanga
 * @copyright 2023
 */


namespace Controllers;
use Exception;
use \Models\Product;

class ProductController
{
    private $conn;

    public function __construct($conn)
    {
        $this->conn = $conn;
    }

    public function processRequest()
    {

        if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_GET['add'])) {

            $_POST = json_decode(file_get_contents("php://input"), true);
            $sku = $_POST['sku'];
            $name = $_POST['name'];
            $price = $_POST['price'];
            $type = $_POST['type'];
            $size = isset($_POST['size']) ? $_POST['size'] : null;
            $weight = isset($_POST['weight']) ? $_POST['weight'] : null;
            $height = isset($_POST['height']) ? $_POST['height'] : null;
            $width = isset($_POST['width']) ? $_POST['width'] : null;
            $length = isset($_POST['length']) ? $_POST['length'] : null;
            $productData = array(
                'sku' => $sku,
                'name' => $name,
                'price' => $price,
                'type' => $type,
                'size' => $size,
                'weight' => $weight,
                'height' => $height,
                'width' => $width,
                'length' => $length
            );
            $this->addProduct($productData);
        } elseif ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['all'])) {
            $this->getAllProducts();
        } elseif ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_GET['delete'])) {
            $_POST = json_decode(file_get_contents("php://input"), true);
            $skus = $_POST['skus'];
            $this->deleteBySkus($skus);
        }
    }

    public function addProduct($productData)
    {
        try {
            $product = \Models\Product::createProductObj($productData);
            $product->addProductToDb($this->conn, $productData);
            http_response_code(200);
        } catch (Exception $e) {
            http_response_code(500);
            echo " SKU already exists please use a different SKU !";
        }
    }

    public function getAllProducts()
    {
        $products = \Models\Product::getAllProducts($this->conn);
        echo json_encode($products);
    }

    public function deleteBySkus($skus)
    {
        try {
            \Models\Product::deleteBySkus($this->conn, $skus);
            http_response_code(200);
            echo "Product(s) deleted successfully";
        } catch (Exception $e) {
            http_response_code(500);
            echo "Error deleting product(s)";
        }
    }
}
