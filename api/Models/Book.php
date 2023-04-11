<?php
/**
 * 
 * 
 * @author Jabule Simanga
 * @copyright 2023
 */

namespace Models;
class Book extends Product
{
    protected $weight;

    public function __construct($sku, $name, $price)
    {
        parent::__construct($sku, $name, $price);
    }

    public function getAdditionalDetails()
    {
        return "Weight: " . $this->weight . "KG";
    }

    public function getType()
    {
        return "Book";
    }

    public function executeProductSpecificSQL($conn, $productId, $productData)
    {
        $stmt = $conn->prepare("INSERT INTO product_details (product_id, weight) VALUES (?, ?)");
        $stmt->bind_param("id", $productId, $productData['weight']);
        $stmt->execute();
    }
}