import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Button,
    Container,
    Row,
    Col,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import CustomNavBar from "../Common/CustomNavBar";
import ProductCard from "./ProductCard";
import Footer from '../Common/Footer';


function ProductList() {
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        loadProductList();
    }, []);

    const loadProductList = () => {
        axios
            .get(process.env.REACT_APP_ROOT_URL + "/?all")
            .then((response) => setProducts(response.data))
            .then((response) => {
            })
            .catch((error) => {
                console.log(error);
            });;
    };

    const deleteProducts = async (skus) => {
        //add some changes here becaus delete and put works only for premium hosting
        const response = await fetch(process.env.REACT_APP_ROOT_URL + "?delete", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ skus: skus }),
        });
    };

    const deleteProduct = (productId) => {
        setProducts((prevProducts) =>
            prevProducts.filter((product) => product.sku !== productId)
        );
    };

    const handleMassDelete = () => {
        selectedProducts.forEach((productId) => deleteProduct(productId));
        deleteProducts(selectedProducts);
        setSelectedProducts([]);
    };

    const toggleSelected = (productId) => {
        if (selectedProducts.includes(productId)) {
            setSelectedProducts(selectedProducts.filter((id) => id !== productId));
        } else {
            setSelectedProducts([...selectedProducts, productId]);
        }
    };

    return (
        <Container className="">
            <br />
            <CustomNavBar title="Product List">
                <Link className="mx-2" to="/add-product">
                    <Button variant="primary">ADD</Button>
                </Link>
                <Button id="delete-product-btn" className="mx-2" variant="danger" onClick={handleMassDelete}>
                    MASS DELETE
                </Button>
            </CustomNavBar>
            <Container className="border-bottom  min-height">
                <Row>
                    {products.map((product, index) => (
                        <Col xs={3} key={product.id + index}>
                            <ProductCard
                                toggleSelected={() => toggleSelected(product.sku)}
                                selected={selectedProducts.includes(product.sku)}
                                key={product.id + index}
                                product={product}
                            />
                        </Col>
                    ))}
                </Row>
            </Container>
            <Footer></Footer>
        </Container>
    );
}

export default ProductList;
