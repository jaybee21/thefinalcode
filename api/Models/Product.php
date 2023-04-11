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

abstract class Product extends ProductDbOperations
{
    protected $sku;
    protected $name;
    protected $price;

    protected $height;
    protected $width;
    protected $length;
    protected $size;
    protected $weight;

    public function __construct($sku, $name, $price)
    {
        $this->sku = $sku;
        $this->name = $name;
        $this->price = $price;
    }

    public function setAdditionalDetails($height = null, $width = null, $length = null, $size = null, $weight = null)
    {
        if ($height !== null) {
            $this->height = $height;
        }
        if ($width !== null) {
            $this->width = $width;
        }
        if ($length !== null) {
            $this->length = $length;
        }
        if ($size !== null) {
            $this->size = $size;
        }
        if ($weight !== null) {
            $this->weight = $weight;
        }
    }

    public function getSKU()
    {
        return $this->sku;
    }

    public function getName()
    {
        return $this->name;
    }

    public function getPrice()
    {
        return $this->price;
    }


    abstract public function getAdditionalDetails();
    abstract public function getType();
 
    public static function createProductObj($productData)
    {
        try {
            $class = '\\Models\\' . $productData['type'];
            $product = new $class($productData['sku'], $productData['name'], $productData['price']);
            $product->setAdditionalDetails($productData['height'], $productData['width'], $productData['length'], $productData['size'], $productData['weight']);
            return $product;
        } catch (Throwable $th) {
            throw new Exception('Invalid product type: ' . $productData['type']);
        }
    }

    
}



