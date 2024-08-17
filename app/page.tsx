import Link from "next/link";

// SEO Metadata
export const metadata = {
  title: "The Prime Store | Best Products Curated for You",
  description: "Discover high-quality products and enjoy a seamless shopping experience at The Prime Store.",
  keywords: "ecommerce, online shopping, best products, quality items",
  openGraph: {
    title: "The Prime Store",
    description: "Discover high-quality products and enjoy a seamless shopping experience.",
    url: process.env.NEXT_PUBLIC_PRODUCT_APP_URL || process.env.NEXT_PUBLIC_VERCEL_URL,
    images: [
      {
        url: "/logo.svg",
        width: 800,
        height: 600,
        alt: "The Prime Store",
      },
    ],
  },
};

const Landing = () => {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col justify-between">
      <main className="flex-1 flex flex-col justify-center items-center py-12 px-6 md:px-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-black">
          Welcome to The <span className="text-yellow-400 font-semibold">Prime</span> Store
        </h1>
        <p className="mt-4 text-lg text-gray-800">
          Your one-stop shop for the best products curated just for you.
        </p>
        <div className="mt-8">
          <Link href="/products">
            <button className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-all">
              Shop Now
            </button>
          </Link>
        </div>
      </main>

      <footer className="py-6 bg-black text-white text-center">
        <p>&copy; 2024 The Prime Store. All rights reserved.</p>
        <div className="mt-4">
          <Link href="/privacy-policy">
            <span className="text-yellow-400 hover:text-yellow-300 cursor-pointer">
              Privacy Policy
            </span>
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
