import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="
      bg-neutral-900/80 
      backdrop-blur-md 
      border-t border-neutral-800 
      text-neutral-300 
      py-6 mt-10
      shadow-[0_-4px_10px_rgba(0,0,0,0.3)]
    ">
      
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center md:items-start justify-between gap-6 md:gap-0">
        
        {/* Left Section - Logo and Quick Links */}
        <div className="text-center md:text-left max-w-xs">
          <h2 className="text-xl font-bold text-white tracking-wide">MovieZone</h2>
          <p className="text-sm mt-2 text-neutral-400">
            Your go-to platform for movies & TV shows.
          </p>
        </div>

        {/* Right Section - Social Media Icons */}
        <div className="flex gap-6 justify-center md:justify-end">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" 
            className="hover:text-white hover:scale-110 transition-all">
            <FaFacebook size={24} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" 
            className="hover:text-white hover:scale-110 transition-all">
            <FaTwitter size={24} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" 
            className="hover:text-white hover:scale-110 transition-all">
            <FaInstagram size={24} />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" 
            className="hover:text-white hover:scale-110 transition-all">
            <FaYoutube size={24} />
          </a>
        </div>

      </div>

      {/* Bottom Section */}
      <div className="text-center text-sm text-neutral-500 mt-6">
        © {new Date().getFullYear()} MovieZone. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
