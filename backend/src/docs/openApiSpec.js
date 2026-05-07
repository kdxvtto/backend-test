export const openApiSpec = {
    openapi: "3.0.3",
    info: {
        title: "POS API",
        version: "1.0.0",
        description: "RESTful API for a Point of Sale application."
    },
    servers: [
        {
            url: "http://localhost:3000",
            description: "Local development"
        }
    ],
    tags: [
        { name: "Health" },
        { name: "Orders" },
        { name: "Reports" },
        { name: "Products" },
        { name: "Add-ons" }
    ],
    paths: {
        "/": {
            get: {
                tags: ["Health"],
                summary: "Health check",
                responses: {
                    200: {
                        description: "API is running",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/HealthResponse"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/health": {
            get: {
                tags: ["Health"],
                summary: "Health check",
                responses: {
                    200: {
                        description: "API is running",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/HealthResponse"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/orders": {
            get: {
                tags: ["Orders"],
                summary: "Get all orders",
                parameters: [
                    {
                        name: "status",
                        in: "query",
                        required: false,
                        schema: {
                            type: "string",
                            enum: ["pending", "paid", "cancelled"]
                        }
                    }
                ],
                responses: {
                    200: {
                        description: "Orders retrieved successfully",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        success: { type: "boolean", example: true },
                                        data: {
                                            type: "array",
                                            items: {
                                                $ref: "#/components/schemas/OrderSummary"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    },
                    400: {
                        $ref: "#/components/responses/ValidationError"
                    }
                }
            },
            post: {
                tags: ["Orders"],
                summary: "Create a new order",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/CreateOrderRequest"
                            }
                        }
                    }
                },
                responses: {
                    201: {
                        description: "Order created successfully",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/OrderDetailResponse"
                                }
                            }
                        }
                    },
                    400: {
                        $ref: "#/components/responses/ValidationError"
                    },
                    404: {
                        $ref: "#/components/responses/NotFoundError"
                    }
                }
            }
        },
        "/orders/{id}": {
            get: {
                tags: ["Orders"],
                summary: "Get single order detail",
                parameters: [
                    {
                        $ref: "#/components/parameters/IdParam"
                    }
                ],
                responses: {
                    200: {
                        description: "Order retrieved successfully",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/OrderDetailResponse"
                                }
                            }
                        }
                    },
                    400: {
                        $ref: "#/components/responses/ValidationError"
                    },
                    404: {
                        $ref: "#/components/responses/NotFoundError"
                    }
                }
            },
            put: {
                tags: ["Orders"],
                summary: "Update an order",
                parameters: [
                    {
                        $ref: "#/components/parameters/IdParam"
                    }
                ],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/UpdateOrderRequest"
                            }
                        }
                    }
                },
                responses: {
                    200: {
                        description: "Order updated successfully",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/OrderDetailResponse"
                                }
                            }
                        }
                    },
                    400: {
                        $ref: "#/components/responses/ValidationError"
                    },
                    404: {
                        $ref: "#/components/responses/NotFoundError"
                    }
                }
            }
        },
        "/reports/product-sales": {
            get: {
                tags: ["Reports"],
                summary: "Get top selling and lowest ordered products",
                responses: {
                    200: {
                        description: "Product sales report retrieved successfully",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/ProductSalesReportResponse"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/reports/sales": {
            get: {
                tags: ["Reports"],
                summary: "Get sales report",
                responses: {
                    200: {
                        description: "Sales report retrieved successfully",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/SalesReportResponse"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/products": {
            get: {
                tags: ["Products"],
                summary: "Get all products",
                responses: {
                    200: {
                        description: "Products retrieved successfully",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        success: { type: "boolean", example: true },
                                        data: {
                                            type: "array",
                                            items: {
                                                $ref: "#/components/schemas/Product"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            post: {
                tags: ["Products"],
                summary: "Create product",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/CreateProductRequest"
                            }
                        }
                    }
                },
                responses: {
                    201: {
                        description: "Product created successfully",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/ProductResponse"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/products/{id}": {
            get: {
                tags: ["Products"],
                summary: "Get product detail",
                parameters: [{ $ref: "#/components/parameters/IdParam" }],
                responses: {
                    200: {
                        description: "Product retrieved successfully",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/ProductResponse"
                                }
                            }
                        }
                    },
                    404: {
                        $ref: "#/components/responses/NotFoundError"
                    }
                }
            },
            put: {
                tags: ["Products"],
                summary: "Update product",
                parameters: [{ $ref: "#/components/parameters/IdParam" }],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/UpdateProductRequest"
                            }
                        }
                    }
                },
                responses: {
                    200: {
                        description: "Product updated successfully",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/ProductResponse"
                                }
                            }
                        }
                    }
                }
            },
            delete: {
                tags: ["Products"],
                summary: "Soft delete product",
                parameters: [{ $ref: "#/components/parameters/IdParam" }],
                responses: {
                    200: {
                        description: "Product deactivated successfully",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/DeleteResponse"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/add-ons": {
            get: {
                tags: ["Add-ons"],
                summary: "Get all add-ons",
                responses: {
                    200: {
                        description: "Add-ons retrieved successfully",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        success: { type: "boolean", example: true },
                                        data: {
                                            type: "array",
                                            items: {
                                                $ref: "#/components/schemas/AddOn"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            post: {
                tags: ["Add-ons"],
                summary: "Create add-on",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/CreateAddOnRequest"
                            }
                        }
                    }
                },
                responses: {
                    201: {
                        description: "Add-on created successfully",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/AddOnResponse"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/add-ons/{id}": {
            get: {
                tags: ["Add-ons"],
                summary: "Get add-on detail",
                parameters: [{ $ref: "#/components/parameters/IdParam" }],
                responses: {
                    200: {
                        description: "Add-on retrieved successfully",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/AddOnResponse"
                                }
                            }
                        }
                    },
                    404: {
                        $ref: "#/components/responses/NotFoundError"
                    }
                }
            },
            put: {
                tags: ["Add-ons"],
                summary: "Update add-on",
                parameters: [{ $ref: "#/components/parameters/IdParam" }],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/UpdateAddOnRequest"
                            }
                        }
                    }
                },
                responses: {
                    200: {
                        description: "Add-on updated successfully",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/AddOnResponse"
                                }
                            }
                        }
                    }
                }
            },
            delete: {
                tags: ["Add-ons"],
                summary: "Soft delete add-on",
                parameters: [{ $ref: "#/components/parameters/IdParam" }],
                responses: {
                    200: {
                        description: "Add-on deactivated successfully",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/DeleteResponse"
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    components: {
        parameters: {
            IdParam: {
                name: "id",
                in: "path",
                required: true,
                schema: {
                    type: "integer",
                    example: 1
                }
            }
        },
        responses: {
            ValidationError: {
                description: "Validation error",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/ValidationErrorResponse"
                        }
                    }
                }
            },
            NotFoundError: {
                description: "Resource not found",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/ErrorResponse"
                        }
                    }
                }
            }
        },
        schemas: {
            HealthResponse: {
                type: "object",
                properties: {
                    success: { type: "boolean", example: true },
                    message: { type: "string", example: "POS API is running" }
                }
            },
            ErrorResponse: {
                type: "object",
                properties: {
                    success: { type: "boolean", example: false },
                    message: { type: "string", example: "Order not found" }
                }
            },
            ValidationErrorResponse: {
                type: "object",
                properties: {
                    success: { type: "boolean", example: false },
                    message: { type: "string", example: "Validation error" },
                    errors: {
                        type: "array",
                        items: {
                            type: "object",
                            properties: {
                                field: { type: "string", example: "items.0.product_id" },
                                message: { type: "string", example: "Invalid input" }
                            }
                        }
                    }
                }
            },
            DeleteResponse: {
                type: "object",
                properties: {
                    success: { type: "boolean", example: true },
                    data: { type: "boolean", example: true }
                }
            },
            Product: {
                type: "object",
                properties: {
                    id: { type: "integer", example: 1 },
                    name: { type: "string", example: "Classic Beef Burger" },
                    description: {
                        type: "string",
                        example: "Beef patty burger with lettuce, tomato, and house sauce."
                    },
                    category: { type: "string", example: "Burger" },
                    price: { type: "number", example: 28000 },
                    cost_price: { type: "number", example: 15000 },
                    stock_quantity: { type: "integer", example: 80 },
                    is_active: { type: "boolean", example: true }
                }
            },
            CreateProductRequest: {
                type: "object",
                required: ["name", "description", "category", "price", "cost_price", "stock_quantity"],
                properties: {
                    name: { type: "string", example: "Spicy Chicken Wrap" },
                    description: { type: "string", example: "Simple spicy chicken wrap with fresh lettuce." },
                    category: { type: "string", example: "Wrap" },
                    price: { type: "number", example: 27000 },
                    cost_price: { type: "number", example: 14000 },
                    stock_quantity: { type: "integer", example: 50 },
                    is_active: { type: "boolean", example: true }
                }
            },
            UpdateProductRequest: {
                type: "object",
                properties: {
                    name: { type: "string", example: "Updated Product" },
                    description: { type: "string", example: "Updated description." },
                    category: { type: "string", example: "Burger" },
                    price: { type: "number", example: 30000 },
                    cost_price: { type: "number", example: 15000 },
                    stock_quantity: { type: "integer", example: 45 },
                    is_active: { type: "boolean", example: true }
                }
            },
            ProductResponse: {
                type: "object",
                properties: {
                    success: { type: "boolean", example: true },
                    data: { $ref: "#/components/schemas/Product" }
                }
            },
            AddOn: {
                type: "object",
                properties: {
                    id: { type: "integer", example: 1 },
                    name: { type: "string", example: "Extra Cheese" },
                    description: { type: "string", example: "Additional cheddar cheese slice." },
                    price: { type: "number", example: 5000 },
                    cost_price: { type: "number", example: 2500 },
                    is_active: { type: "boolean", example: true }
                }
            },
            CreateAddOnRequest: {
                type: "object",
                required: ["name", "description", "price", "cost_price"],
                properties: {
                    name: { type: "string", example: "Extra Pickles" },
                    description: { type: "string", example: "Additional pickles for burger or wrap." },
                    price: { type: "number", example: 3000 },
                    cost_price: { type: "number", example: 1000 },
                    is_active: { type: "boolean", example: true }
                }
            },
            UpdateAddOnRequest: {
                type: "object",
                properties: {
                    name: { type: "string", example: "Extra Pickles" },
                    description: { type: "string", example: "Additional pickles for burger or wrap." },
                    price: { type: "number", example: 4000 },
                    cost_price: { type: "number", example: 1000 },
                    is_active: { type: "boolean", example: true }
                }
            },
            AddOnResponse: {
                type: "object",
                properties: {
                    success: { type: "boolean", example: true },
                    data: { $ref: "#/components/schemas/AddOn" }
                }
            },
            OrderItemAddOnInput: {
                type: "object",
                required: ["add_on_id"],
                properties: {
                    add_on_id: { type: "integer", example: 1 },
                    quantity: { type: "integer", example: 1 }
                }
            },
            OrderItemInput: {
                type: "object",
                required: ["product_id", "quantity"],
                properties: {
                    product_id: { type: "integer", example: 1 },
                    quantity: { type: "integer", example: 2 },
                    add_ons: {
                        type: "array",
                        items: { $ref: "#/components/schemas/OrderItemAddOnInput" }
                    }
                }
            },
            PaymentInput: {
                type: "object",
                required: ["amount"],
                properties: {
                    payment_method: {
                        type: "string",
                        enum: ["cash", "card"],
                        example: "cash"
                    },
                    payment_status: {
                        type: "string",
                        enum: ["pending", "paid", "failed"],
                        example: "paid"
                    },
                    amount: { type: "number", example: 100000 },
                    change_amount: { type: "number", example: 0 }
                }
            },
            CreateOrderRequest: {
                type: "object",
                required: ["customer_name", "items", "payment"],
                properties: {
                    customer_name: { type: "string", example: "Kevin" },
                    items: {
                        type: "array",
                        items: { $ref: "#/components/schemas/OrderItemInput" }
                    },
                    payment: { $ref: "#/components/schemas/PaymentInput" },
                    discount: { type: "number", example: 0 },
                    tax: { type: "number", example: 0 },
                    notes: { type: "string", nullable: true, example: "Dine in" }
                }
            },
            UpdateOrderRequest: {
                type: "object",
                properties: {
                    customer_name: { type: "string", example: "Kevin Updated" },
                    status: {
                        type: "string",
                        enum: ["pending", "paid", "cancelled"],
                        example: "paid"
                    },
                    items: {
                        type: "array",
                        items: { $ref: "#/components/schemas/OrderItemInput" }
                    },
                    payment: { $ref: "#/components/schemas/PaymentInput" },
                    discount: { type: "number", example: 0 },
                    tax: { type: "number", example: 0 },
                    notes: { type: "string", nullable: true, example: "Updated order" }
                }
            },
            OrderSummary: {
                type: "object",
                properties: {
                    id: { type: "integer", example: 1 },
                    order_number: { type: "string", example: "ORD-1710000000000-123" },
                    customer_name: { type: "string", example: "Kevin" },
                    status: { type: "string", example: "paid" },
                    subtotal: { type: "number", example: 61000 },
                    discount: { type: "number", example: 0 },
                    tax: { type: "number", example: 0 },
                    total: { type: "number", example: 61000 },
                    created_at: { type: "string", format: "date-time" }
                }
            },
            OrderItemAddOn: {
                type: "object",
                properties: {
                    id: { type: "integer", example: 1 },
                    order_item_id: { type: "integer", example: 1 },
                    add_on_id: { type: "integer", example: 1 },
                    add_on_name: { type: "string", example: "Extra Cheese" },
                    quantity: { type: "integer", example: 2 },
                    unit_price: { type: "number", example: 5000 },
                    unit_cost: { type: "number", example: 2500 },
                    subtotal: { type: "number", example: 10000 }
                }
            },
            OrderItem: {
                type: "object",
                properties: {
                    id: { type: "integer", example: 1 },
                    order_id: { type: "integer", example: 1 },
                    product_id: { type: "integer", example: 1 },
                    product_name: { type: "string", example: "Classic Beef Burger" },
                    quantity: { type: "integer", example: 2 },
                    unit_price: { type: "number", example: 28000 },
                    unit_cost: { type: "number", example: 15000 },
                    subtotal: { type: "number", example: 56000 },
                    add_ons: {
                        type: "array",
                        items: { $ref: "#/components/schemas/OrderItemAddOn" }
                    }
                }
            },
            Payment: {
                type: "object",
                nullable: true,
                properties: {
                    id: { type: "integer", example: 1 },
                    order_id: { type: "integer", example: 1 },
                    payment_method: { type: "string", example: "cash" },
                    payment_status: { type: "string", example: "paid" },
                    amount: { type: "number", example: 100000 },
                    change_amount: { type: "number", example: 39000 },
                    paid_at: { type: "string", format: "date-time", nullable: true }
                }
            },
            OrderDetail: {
                allOf: [
                    { $ref: "#/components/schemas/OrderSummary" },
                    {
                        type: "object",
                        properties: {
                            notes: { type: "string", nullable: true, example: "Dine in" },
                            items: {
                                type: "array",
                                items: { $ref: "#/components/schemas/OrderItem" }
                            },
                            payment: { $ref: "#/components/schemas/Payment" }
                        }
                    }
                ]
            },
            OrderDetailResponse: {
                type: "object",
                properties: {
                    success: { type: "boolean", example: true },
                    data: { $ref: "#/components/schemas/OrderDetail" }
                }
            },
            ProductSalesRow: {
                type: "object",
                properties: {
                    id: { type: "integer", example: 1 },
                    name: { type: "string", example: "Classic Beef Burger" },
                    category: { type: "string", example: "Burger" },
                    total_sold: { type: "integer", example: 10 },
                    total_sales: { type: "number", example: 280000 }
                }
            },
            ProductSalesReportResponse: {
                type: "object",
                properties: {
                    success: { type: "boolean", example: true },
                    data: {
                        type: "object",
                        properties: {
                            top_selling_products: {
                                type: "array",
                                items: { $ref: "#/components/schemas/ProductSalesRow" }
                            },
                            lowest_ordered_products: {
                                type: "array",
                                items: { $ref: "#/components/schemas/ProductSalesRow" }
                            }
                        }
                    }
                }
            },
            SalesReportResponse: {
                type: "object",
                properties: {
                    success: { type: "boolean", example: true },
                    data: {
                        type: "object",
                        properties: {
                            total_orders: { type: "integer", example: 5 },
                            revenue: { type: "number", example: 400000 },
                            product_cost: { type: "number", example: 210000 },
                            add_on_cost: { type: "number", example: 25000 },
                            net_profit: { type: "number", example: 165000 }
                        }
                    }
                }
            }
        }
    }
};
