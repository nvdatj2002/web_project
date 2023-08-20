import './style.scss'
function ProductCreate() {
    return (
        <div >
            <h1>Add Product</h1>
            <form action="add-product.php" method="post" enctype="multipart/form-data">
                <div className="form-group">
                    <label for="product-name">Product Name</label>
                    <input type="text" name="product-name" id="product-name" className="form-control" />
                </div>
                <div className="form-group">
                    <label for="product-price">Product Price</label>
                    <input type="number" name="product-price" id="product-price" className="form-control" />
                </div>
                <div className="form-group">
                    <label for="product-description">Product Description</label>
                    <textarea name="product-description" id="product-description" className="form-control"></textarea>
                </div>
                <div className="form-group">
                    <label for="product-image">Product Image</label>
                    <input type="file" name="product-image" id="product-image" className="form-control" />
                </div>
                <button type="submit" className="btn btn-primary">Add Product</button>
            </form>
        </div>
    );
}

export default ProductCreate;