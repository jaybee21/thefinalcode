<?php
/**
 * 
 * 
 * @author Jabule Simanga
 * @copyright 2023
 */

class DBConnector
{
    private $db;

    public function __construct($host, $username, $password, $dbname)
    {
        $this->db = new mysqli($host, $username, $password, $dbname);

        if ($this->db->connect_error) {
            http_response_code(500);
            die("Error connecting to the database: " . $this->db->connect_error);
        }
    }

    public function getConnection()
    {
        return $this->db;
    }
}
