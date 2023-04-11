<?php
/**
 * 
 * 
 * @author Jabule Simanga
 * @copyright 2023
 */

namespace Models;
class Furniture extends Product
{

    public function __construct($sku, $name, $price)
    {
        parent::__construct($sku, $name, $price);
    }

    public function getAdditionalDetails()
    {
        return "Dimension: " . $this->height . "x" . $this->width . "x" . $this->length;
    }

    public function getType()
    {
        return "Furniture";
    }

    public function executeProductSpecificSQL($conn, $productId, $productData)
    {
        $stmt = $conn->prepare("INSERT INTO product_details (product_id, height, width, length) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("iiii", $productId, $productData['height'], $productData['width'], $productData['length']);
        $stmt->execute();
    }
}
