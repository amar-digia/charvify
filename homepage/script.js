const query1 = `query ProductsFull {
  products(first: 8) {
    edges {
      node {
        id
        title
        description
        availableForSale

        featuredImage {
          url
        }

        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
          maxVariantPrice {
            amount
            currencyCode
          }
        }

        # You can remove if not needed
        images(first: 10) {
          edges {
            node {
              id
              url
              altText
            }
          }
        }

        variants(first: 50) {
          edges {
            node {
              id
              title
              availableForSale
              sku

              # Image for each variant
              image {
                url
              }

              # Variant pricing
              price {
                amount
                currencyCode
              }
              compareAtPrice {
                amount
                currencyCode
              }

              # Selected attributes of variant (size, color, etc.)
              selectedOptions {
                name
                value
              }
            }
          }
        }
      }
    }
  }
}

`;

const query2 = `query Last10Products {
  products(first: 16, reverse: true) {
    edges {
      node {
        id
        title
        description
        availableForSale

        featuredImage {
          url
        }

        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
          maxVariantPrice {
            amount
            currencyCode
          }
        }

        # You can remove if not needed
        images(first: 10) {
          edges {
            node {
              id
              url
              altText
            }
          }
        }

        variants(first: 50) {
          edges {
            node {
              id
              title
              availableForSale
              sku

              # Image for each variant
              image {
                url
              }

              # Variant pricing
              price {
                amount
                currencyCode
              }
              compareAtPrice {
                amount
                currencyCode
              }

              # Selected attributes of variant (size, color, etc.)
              selectedOptions {
                name
                value
              }
            }
          }
        }
      }
    }
  }
}

`;

// fetch first 8 products

fetch("https://digia-open-fashion.myshopify.com/api/2025-07/graphql.json", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "X-Shopify-Storefront-Access-Token": "a28935969323e9d5c8c7472e3ebe497e",
  },
  body: JSON.stringify({ query: query1 }),
})
  .then((response) => response.json())
  .then((data) => {
    const products = data.data.products.edges;
    const grid = document.getElementById("products-grid");

    products.forEach((item) => {
      const product = item.node;
      const imgSrc = product.images.edges[0]?.node.url || "";
      const price = product.priceRange.maxVariantPrice.amount || "";

      const card = document.createElement("div");
      card.classList.add("grid-item");

      card.innerHTML = `
       <div class="product-card">
        <img class="product-image" src="${imgSrc}" alt="${product.title}" />
        <div class="product-title">${product.title}</div>
        <div class="product-price">₹${price}</div>
        </div>
      `;

      grid.appendChild(card);
    });
  })
  .catch((error) => console.error(error));

// fetch last 16 products

fetch("https://digia-open-fashion.myshopify.com/api/2025-07/graphql.json", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "X-Shopify-Storefront-Access-Token": "a28935969323e9d5c8c7472e3ebe497e",
  },
  body: JSON.stringify({ query: query2 }),
})
  .then((response) => response.json())
  .then((data) => {
    const products = data.data.products.edges;
    const grid = document.getElementById("topseller-container");

    products.forEach((item) => {
      const product = item.node;
      const imgSrc = product.images.edges[0]?.node.url || "";
      const price = product.priceRange.maxVariantPrice.amount || "";

      const card = document.createElement("div");
      card.classList.add("grid-item");

      card.innerHTML = `
         <div class="product-card">
          <img class="product-image" src="${imgSrc}" alt="${product.title}" />
          <div class="product-title">${product.title}</div>
          <div class="product-price">₹${price}</div>
          </div>
        `;

      grid.appendChild(card);
    });
  })
  .catch((error) => console.error(error));

function buildBenefits() {
  const listOfBenefits = [
    {
      title: "Free Shipping",
      subTitle: "Enjoy free shipping on all orders above $100",
      imgUrl: "assets/svgs/shipping.svg",
    },
    {
      title: "SUPPORT 24/7",
      subTitle: "Our support team is there to help you for queries",
      imgUrl: "assets/svgs/support.svg",
    },
    {
      title: "30 DAYS RETURN",
      subTitle: "Simply return it within 30 days for an exchange.",
      imgUrl: "assets/svgs/return.svg",
    },
    {
      title: "100% PAYMENT SECURE",
      subTitle: "Our payments are secured with 256 bit encryption",
      imgUrl: "assets/svgs/secure.svg",
    },
  ];

  const container = document.getElementById("benefits-container");

  listOfBenefits.forEach((item) => {
    container.innerHTML += `
      <div  class="benefit-item">
        <img
          src="${item.imgUrl}"
          alt="${item.title}"
          style="margin-top: 16px; margin-right:22px;"
        />
          <div style="display: flex; flex-direction: column;">
            <p class="benefit-title">${item.title}</p>
            <p class="benefit-subtitle">${item.subTitle}</p>
        </div>
      </div>
    `;
  });
}

buildBenefits();
