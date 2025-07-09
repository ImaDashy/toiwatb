
import { Star, ShoppingCart, Heart, Share2, Truck, Shield, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import StarRating from "./StarRating";
import ReviewCard from "./ReviewCard";
import ProductDetails from "./ProductDetails";
import RelatedBooks from "./RelatedBooks";

const BookPurchase = () => {
  const bookData = {
    title: "Rainforests of Central Africa: Ancient Spells and Earthy Smells, 2nd Edition",
    author: "Jean Planteau",
    year: "1998",
    rating: 4.3,
    totalReviews: 247,
    price: 29.99,
    originalPrice: 39.99,
    inStock: true,
    prime: true,
    description: "A comprehensive exploration of the mystical and ecological wonders of Central African rainforests. This second edition includes updated research on indigenous plant medicine, forest ecology, and the spiritual traditions that have sustained these ancient ecosystems for millennia.",
    features: [
      "Updated with 15 years of additional research",
      "Over 200 stunning color photographs",
      "Detailed maps of unexplored regions",
      "Interviews with indigenous healers and shamans",
      "Complete guide to medicinal plants"
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-orange-600">BookStore</div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                Sign In
              </Button>
              <Button size="sm">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Cart (0)
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-600 mb-4">
          <span>Books</span> › <span>Science & Nature</span> › <span>Environmental Studies</span> › <span className="text-gray-900">Rainforest Ecology</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column - Book Image */}
          <div className="lg:col-span-5">
            <div className="sticky top-6">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <img
                  src="https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=600&h=800"
                  alt="Rainforests of Central Africa book cover"
                  className="w-full max-w-md mx-auto rounded-lg shadow-md"
                />
                <div className="mt-6 space-y-3">
                  <Button size="lg" className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold">
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Add to Cart
                  </Button>
                  <Button size="lg" variant="outline" className="w-full">
                    Buy Now
                  </Button>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Heart className="h-4 w-4 mr-2" />
                      Wishlist
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Book Details */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {bookData.title}
              </h1>
              <p className="text-lg text-gray-700 mb-4">
                by <span className="text-blue-600 hover:underline cursor-pointer">{bookData.author}</span> (Author)
              </p>

              {/* Rating */}
              <div className="flex items-center space-x-3 mb-4">
                <StarRating rating={bookData.rating} />
                <span className="text-blue-600 hover:underline cursor-pointer">
                  {bookData.totalReviews} customer reviews
                </span>
              </div>

              {/* Badges */}
              <div className="flex space-x-2 mb-6">
                <Badge variant="secondary">#1 Best Seller in Environmental Studies</Badge>
                <Badge variant="outline">2nd Edition</Badge>
                {bookData.prime && <Badge className="bg-blue-600">Prime</Badge>}
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline space-x-3">
                  <span className="text-3xl font-bold text-red-600">
                    ${bookData.price}
                  </span>
                  <span className="text-lg text-gray-500 line-through">
                    ${bookData.originalPrice}
                  </span>
                  <Badge variant="destructive">Save 25%</Badge>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  FREE delivery <strong>Tomorrow, July 10</strong> if you spend $35 on items shipped by BookStore
                </p>
              </div>

              {/* Stock Status */}
              <div className="mb-6">
                {bookData.inStock ? (
                  <p className="text-green-600 font-semibold">✓ In Stock</p>
                ) : (
                  <p className="text-red-600 font-semibold">Currently unavailable</p>
                )}
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">About this book</h3>
                <p className="text-gray-700 leading-relaxed">{bookData.description}</p>
              </div>

              {/* Key Features */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Key Features</h3>
                <ul className="space-y-2">
                  {bookData.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Shipping & Returns */}
              <div className="border-t pt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-3">
                    <Truck className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-semibold text-sm">Free Shipping</p>
                      <p className="text-xs text-gray-600">On orders over $35</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <RotateCcw className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-semibold text-sm">Easy Returns</p>
                      <p className="text-xs text-gray-600">30-day return policy</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Shield className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-semibold text-sm">Secure Payment</p>
                      <p className="text-xs text-gray-600">Your data is protected</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Details */}
            <ProductDetails />

            {/* Customer Reviews */}
            <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
              <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
              <div className="space-y-6">
                <ReviewCard 
                  rating={5}
                  title="Absolutely fascinating read!"
                  author="Nature Enthusiast"
                  date="June 15, 2024"
                  content="This book opened my eyes to the incredible biodiversity and spiritual richness of Central African rainforests. The photographs are breathtaking and the research is thorough."
                  verified={true}
                />
                <ReviewCard 
                  rating={4}
                  title="Great update to the first edition"
                  author="Research Scientist"
                  date="May 22, 2024"
                  content="The additional 15 years of research really shows. The new chapters on climate change impacts are particularly valuable for my work."
                  verified={true}
                />
                <ReviewCard 
                  rating={5}
                  title="Perfect for students and professionals"
                  author="Environmental Studies Prof"
                  date="April 18, 2024"
                  content="I use this as a textbook for my graduate course. The combination of scientific rigor and cultural sensitivity makes it exceptional."
                  verified={true}
                />
              </div>
            </div>

            {/* Related Books */}
            <RelatedBooks />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookPurchase;
