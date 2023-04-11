<?php
/**
 * 
 * 
 * @author Jabule Simanga
 * @copyright 2023
 */

namespace Models;

use Exception;
use Throwable;

abstract class ProductDbOperations
{
    abstract public function executeProductSpecificSQL($conn, $productId, $productData);
    public function addProductToDb($conn, $productData)
    {
        try {
            $conn->begin_transaction();
            $stmt = $conn->prepare("SELECT * FROM products WHERE sku = ?");
            $stmt->bind_param("s", $productData['sku']);
            $stmt->execute();
            $result = $stmt->get_result();

            if ($result->num_rows > 0) {
                throw new Exception("Product with SKU '{$productData['sku']}' already exists.");
            }

            $productId = $this->createProduct($conn, $productData);
            $this->executeProductSpecificSQL($conn, $productId, $productData);
            $conn->commit();
        } catch (Throwable $th) {
            $conn->rollback();
            throw new Exception('An error occurred: ' . $th->getMessage());
        }
    }

    public function createProduct($conn, $productData)
    {
        $type = mysqli_real_escape_string($conn, $productData['type']);
        $query = "SELECT id FROM product_types WHERE type = '" . $type . "'";
        $stmt = mysqli_prepare($conn, $query);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);
        $type = mysqli_fetch_assoc($result);
        $typeId = $type['id'];

        $stmt = $conn->prepare("INSERT INTO products (sku, name, price, type_id) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("ssds", $productData['sku'], $productData['name'], $productData['price'], $typeId);
        $stmt->execute();
        $productId = $conn->insert_id;
        return $productId;
    }

    public static function deleteBySkus($conn, array $productSKUs)
    {
        try {
            $placeholders = implode(',', array_fill(0, count($productSKUs), '?'));
            $stmt = $conn->prepare("DELETE FROM product_details WHERE product_id IN (SELECT id FROM products WHERE sku IN ($placeholders))");
            $types = str_repeat('s', count($productSKUs));
            $stmt->bind_param($types, ...$productSKUs);
            $stmt->execute();
            $stmt = $conn->prepare("DELETE FROM products WHERE sku IN ($placeholders)");
            $types = str_repeat('s', count($productSKUs));
            $stmt->bind_param($types, ...$productSKUs);
            $stmt->execute();
            return true;
        } catch (Throwable $th) {
            throw new Exception('Error deleting products: ' . $th->getMessage());
        }
    }

    public static function getAllProducts($conn)
    {
        $result = $conn->query("SELECT p.id, p.sku, p.name, p.price, t.type, d.size, d.weight, d.height, d.width, d.length
       FROM products p
       INNER JOIN product_types t ON p.type_id = t.id
       LEFT JOIN product_details d ON p.id = d.product_id;
    ");
        if (!$result) {
            http_response_code(500);
            die("Error fetching products: " . $conn->error);
        }

        $productsArray = [];
        while ($row = $result->fetch_assoc()) {
            $productsArray[] = $row;
        }

        $productsArray;
        $products = [];

        foreach ($productsArray as $productData) {
            try {
                $product = Product::createProductObj($productData);
            } catch (Throwable $th) {
                throw new Exception('Invalid product type: ' . $productData['type'] . $th->getMessage());
            }

            $products[] = [
                'id' => $productData['id'],
                'name' => $product->getName(),
                'sku' => $product->getSKU(),
                'price' => $product->getPrice(),
                'type' => $product->getType(),
                'product-specific' => $product->getAdditionalDetails(),

            ];
        }
        return $products;
    }
}