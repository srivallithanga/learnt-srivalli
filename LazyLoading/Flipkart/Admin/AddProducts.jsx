import { useState, useEffect } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";
// import './App.css';

function AddProducts() {
    let [categories, setCategories] = useState([]);
    let [data, setData] = useState([{ code: "code", name: "name", excerpt: "Description", category: "Category", price: Number }]);

    const validationSchema = Yup.object({
        code: Yup.string()
            .required("Code is a required field")
            .max(6, "Code cannot exceed 6 characters"),
        name: Yup.string()
            .required("Name is a required field")
            .max(50, "Name cannot exceed 50 characters"), 
        excerpt: Yup.string()
            .required("Excerpt is a required field")
            .max(200, "Excerpt cannot exceed 200 characters"), 
        category: Yup.string().required("Category is a required field"),
        price: Yup.number()
            .required("Price is a required field")
            .positive("Price must be positive"),
    });

    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/categories")
            .then(response => {
                setCategories(response.data.categories); 
            })
            .catch(error => {
                console.error(error);
            });
    }, []); 

    const handleSubmit = (values, { resetForm }) => {
        axios.post("http://localhost:3000/api/v1/products", values)
            .then(function (response) {
                console.log(response);
                setData([...data, values]); 
                window.alert("Product successfully added!");
                resetForm(); 
            })
            .catch(function (err) {
                console.log(err);
                window.alert("Failed to add product.");
            })
    };

    const generateCode = () => {
        const uniqueCode = uuidv4().slice(0, 6).toUpperCase();
        return uniqueCode;
    };

    return (
        <Formik
            initialValues={{ code: "", name: "", excerpt: "", category: "", price: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting, setFieldValue }) => (
                <Form className="addproducts">
                    <div className="code-container">
                        <Field type="text" name="code" placeholder="Enter Product Code" />
                        <ErrorMessage name="code" component="div" className="error" />
                        <button type="button" className="generate-code-button" onClick={() => setFieldValue("code", generateCode())}>
                            Generate Code
                        </button>
                    </div>
                    <div>
                        <Field type="text" name="name" placeholder="Enter Product Name" />
                        <ErrorMessage name="name" component="div" className="error" />
                    </div>
                    <div>
                        <Field type="text" name="excerpt" placeholder="Enter Excerpt" />
                        <ErrorMessage name="excerpt" component="div" className="error" />
                    </div>
                    <div>
                        <Field as="select" name="category">
                            <option value="">Select Category</option>
                            {categories.map(category => (
                                <option key={category._id} value={category._id}>
                                    {category.name}
                                </option>
                            ))}
                        </Field>
                        <ErrorMessage name="category" component="div" className="error" />
                    </div>
                    <div>
                        <Field type="number" name="price" placeholder="Enter the price" />
                        <ErrorMessage name="price" component="div" className="error" />
                    </div>
                    <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Submitting..." : "Submit"}
                    </button>
                </Form>
            )}
        </Formik>
    );
}

export default AddProducts;
