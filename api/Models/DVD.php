<?php
/**
 * 
 * 
 * @author Jabule Simanga
 * @copyright 2023
 */

namespace Models;

class DVD extends Product
{
    public function __construct($sku, $name, $price)
    {
        parent::__construct($sku, $name, $price);
    }

    public function getAdditionalDetails()
    {
        return "Size: " . $this->size . " MB";
    }

    public function getType()
    {
        return "DVD";
    }

    public function executeProductSpecificSQL($conn, $productId, $productData)
    {
        $stmt = $conn->prepare("INSERT INTO product_details (product_id, size) VALUES (?, ?)");
        $stmt->bind_param("si", $productId, $productData['size']);
        $stmt->execute();
    }
}