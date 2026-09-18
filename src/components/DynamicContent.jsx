import React, { useEffect, useState } from "react";
import { ArrowUpRight, Boxes, Layers3, Sparkles } from "lucide-react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../firebaseConfig";

function DynamicContent() {
  const [products, setProducts] = useState([]);
  const [sections, setSections] = useState([]);

  useEffect(() => {
    const productsQuery = query(collection(db, "products"), orderBy("order", "asc"));
    const sectionsQuery = query(collection(db, "siteSections"), orderBy("order", "asc"));

    const unsubscribeProducts = onSnapshot(productsQuery, (snapshot) => {
      setProducts(
        snapshot.docs
          .map((document) => ({ id: document.id, ...document.data() }))
          .filter((item) => item.active !== false)
      );
    });

    const unsubscribeSections = onSnapshot(sectionsQuery, (snapshot) => {
      setSections(
        snapshot.docs
          .map((document) => ({ id: document.id, ...document.data() }))
          .filter((item) => item.active !== false)
      );
    });

    return () => {
      unsubscribeProducts();
      unsubscribeSections();
    };
  }, []);

  if (!products.length && !sections.length) return null;

  return (
    <>
      {products.length > 0 && (
        <section className="dynamic-products">
          <div className="dynamic-bg-grid" />

          <div className="container">
            <div className="dynamic-header">
              <div className="dynamic-label">
                <Boxes size={15} />
                <span>PRODUCTLAR</span>
              </div>

              <h2>
                Tayyor <span>raqamli yechimlar</span>
              </h2>
            </div>

            <div className="dynamic-product-grid">
              {products.map((product) => (
                <article className="dynamic-product-card" key={product.id}>
                  {product.image && (
                    <div className="dynamic-product-image">
                      <img src={product.image} alt={product.name} />
                    </div>
                  )}

                  <div className="dynamic-product-content">
                    <div className="dynamic-product-top">
                      <span>{product.category || "Product"}</span>
                      {product.price && <strong>{product.price}</strong>}
                    </div>

                    <h3>{product.name}</h3>
                    <p>{product.description}</p>

                    {Array.isArray(product.features) && product.features.length > 0 && (
                      <div className="dynamic-tags">
                        {product.features.map((feature) => (
                          <span key={feature}>{feature}</span>
                        ))}
                      </div>
                    )}

                    {product.link && (
                      <a href={product.link} target="_blank" rel="noopener noreferrer">
                        <span>Ko'rish</span>
                        <ArrowUpRight size={16} />
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {sections.map((section) => (
        <section className="dynamic-section" key={section.id}>
          <div className="container">
            <div className="dynamic-section-wrap">
              <div className="dynamic-section-content">
                <div className="dynamic-label">
                  <Layers3 size={15} />
                  <span>{section.eyebrow || "YANGI BO'LIM"}</span>
                </div>

                <h2>{section.title}</h2>
                {section.subtitle && <strong>{section.subtitle}</strong>}
                <p>{section.body}</p>

                {section.buttonText && section.buttonLink && (
                  <a href={section.buttonLink} target="_blank" rel="noopener noreferrer">
                    <span>{section.buttonText}</span>
                    <ArrowUpRight size={17} />
                  </a>
                )}
              </div>

              <div className="dynamic-section-visual">
                {section.image ? (
                  <img src={section.image} alt={section.title} />
                ) : (
                  <div className="dynamic-section-placeholder">
                    <Sparkles size={34} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      ))}
    </>
  );
}

export default DynamicContent;