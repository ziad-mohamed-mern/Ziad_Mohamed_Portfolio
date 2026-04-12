import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { fetchProjectById, fetchProjects } from "../services/api";
import { Github, ExternalLink, ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { useTranslation } from "../shared/translations";

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const { language } = useLanguage();
    const { t } = useTranslation(language);

    useEffect(() => {
        const loadProductData = async () => {
            try {
                setLoading(true);
                // Fetch the main product
                const productData = await fetchProjectById(id);
                setProduct(productData);

                // Fetch all products for related section
                const allProducts = await fetchProjects();
                // Filter out current product and get up to 3 related products
                const related = allProducts
                    .filter(p => p._id !== id)
                    .slice(0, 3);
                setRelatedProducts(related);

                setError(null);
            } catch (err) {
                setError("Failed to load product details. Please try again later.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadProductData();
        // Scroll to top when component loads
        window.scrollTo(0, 0);
    }, [id]);

    const handlePrevImage = () => {
        if (product?.images?.length > 1) {
            setCurrentImageIndex((prev) =>
                prev === 0 ? product.images.length - 1 : prev - 1
            );
        }
    };

    const handleNextImage = () => {
        if (product?.images?.length > 1) {
            setCurrentImageIndex((prev) =>
                prev === product.images.length - 1 ? 0 : prev + 1
            );
        }
    };

    if (loading) {
        return (
            <div className="pt-32 pb-16 container mx-auto px-4">
                <div className="flex justify-center items-center min-h-[60vh]">
                    <div className="animate-pulse text-subtitle text-lg">{t('loading')}</div>
                </div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="pt-32 pb-16 container mx-auto px-4">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-accent hover:text-accent/80 transition-colors mb-8"
                >
                    <ArrowLeft size={20} />
                    <span>{language === 'ar' ? 'رجوع' : 'Go Back'}</span>
                </button>
                <div className="flex justify-center items-center min-h-[60vh]">
                    <p className="text-red-500 text-lg">{error || (language === 'ar' ? 'المنتج غير موجود' : 'Product not found')}</p>
                </div>
            </div>
        );
    }

    // Determine which images to display
    const displayImages = product.images && product.images.length > 0
        ? product.images
        : product.image
            ? [product.image]
            : ["https://via.placeholder.com/800x600"];

    return (
        <div className="mt-16 pb-16 container mx-auto px-4">
            {/* Back Button */}
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-accent hover:text-accent/80 transition-colors mb-8"
            >
                <ArrowLeft size={20} />
                <span>{language === 'ar' ? 'رجوع' : 'Go Back'}</span>
            </button>

            {/* Product Details */}
            <div className="grid lg:grid-cols-2 gap-12 mb-16">
                {/* Image Gallery */}
                <div className="space-y-4">
                    <div className="relative bg-secondary border border-border rounded-xl overflow-hidden aspect-video">
                        <img
                            src={displayImages[currentImageIndex]}
                            alt={`${product.title} - Image ${currentImageIndex + 1}`}
                            className="w-full h-full object-cover"
                        />

                        {/* Image Navigation */}
                        {displayImages.length > 1 && (
                            <>
                                <button
                                    onClick={handlePrevImage}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
                                >
                                    <ChevronLeft size={24} />
                                </button>
                                <button
                                    onClick={handleNextImage}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
                                >
                                    <ChevronRight size={24} />
                                </button>

                                {/* Image Indicators */}
                                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                                    {displayImages.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setCurrentImageIndex(index)}
                                            className={`w-2 h-2 rounded-full transition-all ${index === currentImageIndex
                                                ? "bg-accent w-8"
                                                : "bg-white/50 hover:bg-white/70"
                                                }`}
                                        />
                                    ))}
                                </div>
                            </>
                        )}
                    </div>

                    {/* Thumbnail Gallery */}
                    {displayImages.length > 1 && (
                        <div className="grid grid-cols-4 gap-2">
                            {displayImages.map((img, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentImageIndex(index)}
                                    className={`aspect-video rounded-lg overflow-hidden border-2 transition-all ${index === currentImageIndex
                                        ? "border-accent"
                                        : "border-border hover:border-accent/50"
                                        }`}
                                >
                                    <img
                                        src={img}
                                        alt={`Thumbnail ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Product Info */}
                <div className="space-y-6">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">{product.title}</h1>
                        <p className="text-subtitle text-lg leading-relaxed">
                            {product.description?.en || product.description?.ar || product.description
                                ? (language === 'ar'
                                    ? (product.description?.ar || product.description)
                                    : (product.description?.en || product.description))
                                : ''}
                        </p>
                    </div>

                    {/* Tags */}
                    {product.tech && product.tech.length > 0 && (
                        <div>
                            <h3 className="text-lg font-semibold mb-3">{t('technologies')}</h3>
                            <div className="flex flex-wrap gap-2">
                                {product.tech.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="px-4 py-2 bg-primary border border-accent text-accent rounded-full text-sm font-medium"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Links */}
                    <div className="flex gap-4 pt-4">
                        {product.github && (
                            <a
                                href={product.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-6 py-3 bg-secondary border border-border hover:border-accent text-foreground rounded-full transition-all hover:scale-105"
                            >
                                <Github size={20} />
                                <span>{t('viewCode')}</span>
                            </a>
                        )}
                        {product.demo && (
                            <a
                                href={product.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-6 py-3 bg-accent text-primary rounded-full transition-all hover:scale-105"
                            >
                                <ExternalLink size={20} />
                                <span>{t('viewDemo')}</span>
                            </a>
                        )}
                    </div>
                </div>
            </div>

            {/* Related Products */}
            {relatedProducts.length > 0 && (
                <div className="mt-20">
                    <h2 className="text-3xl font-bold mb-8">
                        {language === 'ar' ? 'المزيد من المشاريع' : 'More Projects'}
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {relatedProducts.map((relatedProduct) => (
                            <Link
                                key={relatedProduct._id}
                                to={`/product/${relatedProduct._id}`}
                                className="group bg-secondary border border-border rounded-xl overflow-hidden hover:border-accent transition-all"
                            >
                                <div className="relative overflow-hidden h-48">
                                    <img
                                        src={relatedProduct.image || "https://via.placeholder.com/600x400"}
                                        alt={relatedProduct.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold mb-2">{relatedProduct.title}</h3>
                                    <p className="text-subtitle text-sm mb-4 line-clamp-2">
                                        {relatedProduct.description?.en || relatedProduct.description?.ar || relatedProduct.description
                                            ? (language === 'ar'
                                                ? (relatedProduct.description?.ar || relatedProduct.description)
                                                : (relatedProduct.description?.en || relatedProduct.description))
                                            : ''}
                                    </p>
                                    {relatedProduct.tech && relatedProduct.tech.length > 0 && (
                                        <div className="flex flex-wrap gap-2">
                                            {relatedProduct.tech.slice(0, 3).map((tag, index) => (
                                                <span
                                                    key={index}
                                                    className="px-3 py-1 text-xs bg-primary border border-border rounded-full text-subtitle"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductDetail;
