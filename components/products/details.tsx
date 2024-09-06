const Details = ({ 
    shippingInformation = '...',
    returnPolicy = '...',
    warrantyInformation = '...',
    category = '...'
}) => (
  <div data-cy="product-details" className="bg-white shadow-lg rounded-lg overflow-hidden">
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Product Details</h2>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <h3 className="font-semibold mb-2">Shipping Information</h3>
          <p className="text-gray-700">{shippingInformation}</p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Return Policy</h3>
          <p className="text-gray-700">{returnPolicy}</p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Warranty Information</h3>
          <p className="text-gray-700">{warrantyInformation}</p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Category</h3>
          <p className="text-gray-700 capitalize">{category}</p>
        </div>
      </div>
    </div>
  </div>
);

export default Details;
