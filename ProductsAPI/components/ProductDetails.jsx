// src/components/ProductDetails.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, Typography, Container } from '@mui/material';
import api from '../api';

function ProductDetails() {
    const [product, setProduct] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        async function fetchProduct() {
            try {
                const response = await api.get(`/products/${id}`);
                setProduct(response.data);
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        }
        fetchProduct();
    }, [id]);

    if (!product) {
        return <Typography variant="h5">Loading...</Typography>;
    }

    return (
        <Container>
            <Card>
                <CardContent>
                    <Typography variant="h4">{product.name}</Typography>
                    <Typography variant="body1">Price: ${product.price}</Typography>
                    <Typography variant="body1">Availability: {product.availability}</Typography>
                </CardContent>
            </Card>
        </Container>
    );
}

export default ProductDetails;
