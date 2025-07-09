
import { Separator } from "@/components/ui/separator";

const ProductDetails = () => {
  const details = {
    publisher: "EcoPress Publishing",
    publicationDate: "September 15, 1998",
    language: "English",
    paperback: "348 pages",
    isbn10: "1234567890",
    isbn13: "978-1234567890",
    dimensions: "8.5 x 0.8 x 11 inches",
    weight: "2.1 pounds"
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
      <h2 className="text-2xl font-bold mb-6">Product Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(details).map(([key, value]) => (
          <div key={key} className="flex justify-between py-2">
            <span className="font-medium text-gray-600 capitalize">
              {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:
            </span>
            <span className="text-gray-900">{value}</span>
          </div>
        ))}
      </div>
      
      <Separator className="my-6" />
      
      <div>
        <h3 className="font-semibold mb-3">About the Author</h3>
        <p className="text-gray-700 leading-relaxed">
          Jean Planteau is a renowned ethnobotanist and environmental researcher who has spent over two decades 
          studying the rainforests of Central Africa. With a PhD in Environmental Science from the University 
          of Paris, Dr. Planteau has published extensively on indigenous plant medicine and forest conservation. 
          This book represents the culmination of his field research and collaboration with local communities.
        </p>
      </div>
    </div>
  );
};

export default ProductDetails;
