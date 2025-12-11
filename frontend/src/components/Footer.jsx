
const Footer = () => (
    <footer className="bg-brown-900 text-gray-100 py-6 mt-8">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
            <div className="font-serif text-lg font-bold text-amber-300">Pobly</div>
            <div className="text-sm mt-2 md:mt-0">&copy; {new Date().getFullYear()} Pobly Bookshop. All rights reserved.</div>
        </div>
    </footer>
);

export default Footer;