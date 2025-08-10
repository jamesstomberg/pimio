This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Test with a local back-end

- Setup a local WordPress installation and install the WooCommerce plugin
- Have the local WordPress site run on http://vanilla.test - else change the API base url in definitions.ts to match where your local WordPress installation is running
- Create at minimum 1 administrator user via the WordPress back-end (since this application does not allow open user registration)
- When 1 administrator is created, it is possible to create new admin users via this application as a logged in administrator

Add this code somewhere in your WordPress installation, either as a plugin or in your active theme's functions.php:

```
<?php

add_action('rest_api_init', function () {
    define('PRODUCT_NAMESPACE', 'products/v1');

    /**
     * --------------------------------------------------------------------------
     * Products.
     * --------------------------------------------------------------------------
     *
     * Custom REST routes for handling WooCommerce products.
     *
     */

    // GET Products.
    register_rest_route(
        PRODUCT_NAMESPACE,
        '/Read/',
        [
            'methods' => 'GET',
            'callback' => function (WP_REST_Request $request) {
                $queryParams = wc_clean($request->get_query_params());
                $paged = !empty($queryParams['page']) ? $queryParams['page'] : 1;
                $per_page = $request->get_param('per_page') ?: 6;
                $search = $queryParams['search'];

                if (empty($search)) {
                    $total_products = count(
                        wc_get_products([
                            'status'  => 'publish',
                            'limit'   => -1,
                            'type'    => 'simple',
                        ])
                    );

                    $products = wc_get_products([
                        'status'  => 'publish',
                        'limit'   => $per_page,
                        'offset'  => ($paged - 1) * $per_page,
                        'type'    => 'simple',
                    ]);
                } else {
                    $page = 1;
                    $total_products = count(
                        wc_get_products([
                            'status' => 'publish',
                            'limit'  => -1,
                            'type'   => 'simple',
                            'name' => $search,
                        ])
                    );

                    $products = wc_get_products([
                        'status' => 'publish',
                        'limit'  => $per_page,
                        'offset' => ($paged - 1) * $per_page,
                        'type'   => 'simple',
                        'name' => $search,
                    ]);

                    if (empty($total_products)) {
                        $total_products = count(
                            wc_get_products([
                                'status' => 'publish',
                                'limit'  => -1,
                                'type'   => 'simple',
                                'sku' => $search,
                            ])
                        );

                        $products = wc_get_products([
                            'status' => 'publish',
                            'limit'  => $per_page,
                            'offset' => ($paged - 1) * $per_page,
                            'type'   => 'simple',
                            'sku' => $search,
                        ]);
                    }
                }

                $products_data = array_map('product_object_to_array', $products);
                $total_pages = ceil($total_products / $per_page);

                return new WP_REST_Response([
                    'products'       => $products_data,
                    'total_products' => $total_products,
                    'total_pages'    => $total_pages,
                    'current_page'   => (int) $paged,
                    'per_page'       => (int) $per_page,
                ]);
            },
            'permission_callback' => 'verify_jwt',
        ]
    );

    // GET single product.
    register_rest_route(
        PRODUCT_NAMESPACE,
        '/Read/(?P<sku>[\w-]+)',
        [
            'methods' => 'GET',
            'callback' => function (WP_REST_Request $request) {
                $sku = wc_clean($request->get_param('sku'));

                $productId = wc_get_product_id_by_sku($sku);
                $product = wc_get_product($productId);
                $productArray = product_object_to_array($product);

                return new WP_REST_Response($productArray);
            },
            'permission_callback' => 'verify_jwt',
        ]
    );

    // Create product.
    register_rest_route(
        PRODUCT_NAMESPACE,
        '/Create/',
        [
            'methods' => 'POST',
            'callback' => function (WP_REST_Request $request) {
                $data = wc_clean($request->get_json_params());

                $product = new WC_Product_Simple();

                $sku = $data['sku'];
                $name = $data['name'];
                $description = $data['description'];
                $price = $data['price'];
                $stock = $data['stock'];

                if (empty($sku)) {
                    return new WP_REST_Response([], 422);
                }

                $product->set_sku($sku);
                $product->set_name($name);
                $product->set_description($description);
                $product->set_regular_price(absint($price));
                $product->set_manage_stock(true);
                $product->set_stock_quantity($stock);
                $product->save();

                $productArray = product_object_to_array($product);

                return new WP_REST_Response($productArray);
            },
            'permission_callback' => 'verify_jwt',
        ]
    );

    // Edit / update product.
    register_rest_route(
        PRODUCT_NAMESPACE,
        '/Edit/(?P<sku>[\w-]+)',
        [
            'methods' => 'POST',
            'callback' => function (WP_REST_Request $request) {
                $sku = $request->get_param('sku');

                $productId = wc_get_product_id_by_sku($sku);
                $product = wc_get_product($productId);

                $data = wc_clean($request->get_json_params());

                $newSku = $data['newSku'];
                $name = $data['name'];
                $description = $data['description'];
                $price = $data['price'];
                $stock = $data['stock'];

                $product->set_sku($newSku);
                $product->set_name($name);
                $product->set_description($description);
                $product->set_regular_price(absint($price));
                $product->set_manage_stock(true);
                $product->set_stock_quantity($stock);
                $product->save();

                $productArray = product_object_to_array($product);

                return new WP_REST_Response($productArray);
            },
            'permission_callback' => 'verify_jwt',
        ]
    );

    // Delete product.
    register_rest_route(
        PRODUCT_NAMESPACE,
        '/Delete/(?P<sku>[\w-]+)',
        [
            'methods' => 'POST',
            'callback' => function (WP_REST_Request $request) {
                $sku = $request->get_param('sku');

                $productId = wc_get_product_id_by_sku($sku);
                $product = wc_get_product($productId);

                $product->delete();

                return new WP_REST_Response([]);
            },
            'permission_callback' => 'verify_jwt',
        ]
    );
});

// Filter JWT auth token response to include the users ID.
add_filter('jwt_auth_token_before_dispatch', function ($data) {
    $data['user_id'] = get_user_by('email', $data['user_email'])->ID;

    return $data;
});

function verify_jwt()
{
    return is_user_logged_in() && current_user_can('administrator');
}

function product_object_to_array($product)
{
    $name = $product->get_name();
    $sku = $product->get_sku();
    $price = $product->get_regular_price();
    $stock = $product->get_stock_quantity();
    $description = $product->get_description();

    return [
        'sku' => $sku,
        'name' => $name,
        'price' => $price,
        'stock' => $stock,
        'description' => $description,
    ];
}
```
