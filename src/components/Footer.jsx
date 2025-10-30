import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-neutral-800 text-neutral-300 py-6 mt-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
        
        {/* Left Section - Logo and Quick Links */}
        <div className="text-center md:text-left">
          <h2 className="text-xl font-bold text-white">MovieZone</h2>
          <p className="text-sm mt-2">Your go-to platform for movies & TV shows.</p>
        </div>

        {/* Right Section - Social Media Icons */}
        <div className="flex gap-4 mt-4 md:mt-0">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
            <FaFacebook size={24} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
            <FaTwitter size={24} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
            <FaInstagram size={24} />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
            <FaYoutube size={24} />
          </a>
        </div>
      </div>

      {/* Bottom Section - Copyright */}
      <div className="text-center text-sm text-neutral-400 mt-6">
        © {new Date().getFullYear()} MovieZone. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
