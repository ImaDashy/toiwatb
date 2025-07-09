
const RelatedBooks = () => {
  const relatedBooks = [
    {
      id: 1,
      title: "Amazon Rainforest Secrets",
      author: "Maria Santos",
      price: 24.99,
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&w=300&h=400"
    },
    {
      id: 2,
      title: "Indigenous Wisdom: Plant Medicine",
      author: "Dr. Robert Thompson",
      price: 32.50,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=300&h=400"
    },
    {
      id: 3,
      title: "Forest Ecology Handbook",
      author: "Sarah Mitchell",
      price: 45.00,
      rating: 4.2,
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=300&h=400"
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
      <h2 className="text-2xl font-bold mb-6">Customers who viewed this item also viewed</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedBooks.map((book) => (
          <div key={book.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <img
              src={book.image}
              alt={book.title}
              className="w-full h-48 object-cover rounded mb-3"
            />
            <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
              {book.title}
            </h3>
            <p className="text-sm text-gray-600 mb-2">by {book.author}</p>
            <div className="flex items-center justify-between">
              <span className="font-bold text-lg">${book.price}</span>
              <div className="flex items-center">
                <span className="text-yellow-500">★</span>
                <span className="text-sm text-gray-600 ml-1">{book.rating}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedBooks;
