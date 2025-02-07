

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; 
import { client } from '@/sanity/lib/client';
import Image from 'next/image';
import ConditionalSideBar from '@/components/ConditionalSideBar';
import { FaGasPump } from 'react-icons/fa';
import { FaUserGroup } from 'react-icons/fa6';
import { TbSteeringWheel } from 'react-icons/tb';
import { urlFor } from '@/sanity/lib/image';

interface Product {
  oldPrice?: string;
  newPrice?: string;
  model?: string;
  pricePerDay?: string;
  name?: string;
  seatingCapacity?: string;
  fuelCapacity?: string;
  transmission?: string;
  title?: string;
  image?: {
    _type: string;
    asset: {
      _ref: string;
      _type: string;
      current?: string;
    };
  };
  type?: string;
  quantity?: number;
  slug?: {
    current?: string;
  };
  description?: string;
  brand?: string;
  _type?: "product";
  _id?: string;
}


const AdminPanel = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [sidebarOpen] = useState<boolean>(true);
  const router = useRouter(); // Use Next.js router

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const query = `*[_type == "car"] [4..19]{ 
          _id,
      image,
      pricePerDay,
      name,
      seatingCapacity,
      fuelCapacity,
      type,
      slug,
      location,
      transmission,
      brand,
      availability {
        locations,
        availableDates,
        availableTimes
      }
        }`;
        const data = await client.fetch(query);
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Navigate to edit page
  const handleEdit = (productId: string) => {
    router.push(`/edit/${productId}`);
  };

  // Remove product
  const handleRemove = (productId: string) => {
    const confirmDelete = window.confirm('Are you sure you want to remove this product?');
    if (confirmDelete) {
      setProducts((prevProducts) => prevProducts.filter((product) => product._id !== productId));
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-16'} transition-all md:block hidden`}> 
        <ConditionalSideBar />
      </div>
      <div className="flex-1 p-5 w-full">
        <h1 className="text-2xl font-bold mb-4">Admin Panel - My Cars</h1>

        {loading ? (
          <p>Loading products...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((item) => (
              <div key={item?._id} className="border rounded-lg shadow-lg p-4 bg-white">
                 {/* Title and Model */}
      <div className="flex justify-between">
        <div className="flex-col">
          <h1 className="text-[16px] leading-[24px] lg:text-[20px] text-[#1A202C] lg:leading-[30px] tracking-[-2%] font-bold">
            {item?.name}
          </h1>
          <p className="text-[12px] leading-[15.12px] text-[#90A3BF] lg:text-[14px] lg:leading-[21px] tracking-[-2%] font-bold">
            {item?.type}
          </p>
        </div>
      </div>
                {/* Image */}
                <Image
                 src={item?.image ? urlFor(item.image).url() : '/fallback-image.jpg'}
                 alt={`${item?.name} image`}
                  height={400}
                  width={300}
                  className="w-full h-24 object-cover rounded-md mb-2"
                  onError={(e) => (e.currentTarget.src = '/fallback-image.jpg')}
                />
                {/* Features */}
      <div className="flex flex-col lg:flex-row justify-between md:justify-start md:gap-4 lg:gap-0 xl:gap-3 mb-4">
        <div className="flex items-center gap-2 lg:gap-0 xl:gap-2">
          <FaGasPump className="text-sm md:text-lg text-[#90A3BF]" />
          <span className="text-xs md:text-sm lg:text-base">{item?.fuelCapacity}</span>
        </div>
        <div className="flex items-center gap-2 lg:gap-0 xl:gap-2">
          <TbSteeringWheel className="text-sm md:text-lg text-[#90A3BF]" />
          <span className="text-xs md:text-sm lg:text-base">{item?.transmission}</span>
        </div>
        <div className="flex items-center gap-2 lg:gap-0 xl:gap-2">
          <FaUserGroup className="text-sm md:text-lg text-[#90A3BF]" />
          <span className="text-xs md:text-sm lg:text-base">{item?.seatingCapacity}</span>
        </div>
      </div>

      {/* Price and Button */}
      <div className="flex justify-between items-center">
        <div>
          <span className="text-base md:text-lg lg:text-xl font-bold text-[#1A202C]">
            {item?.pricePerDay}
          </span>
          {item?.oldPrice && (
            <h3 className="text-xs md:text-sm line-through text-gray-500">
              {item?.oldPrice}
            </h3>
          )}
        </div>
        </div>
                {/* Buttons */}
                <div className="mt-4 flex gap-2">
                  <button
                    className="bg-blue-700 text-white px-3 py-1 rounded hover:bg-blue-600"
                    onClick={() => item._id && handleEdit(item._id)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    onClick={() => item._id && handleRemove(item._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;

























