document.addEventListener('DOMContentLoaded', function () {
  // DOM Elements
  const productListContainer = document.querySelector('.row');
  const searchInput = document.querySelector('input[type="search"]');

  // Function to render product cards
  function renderProducts(products) {
      // Clear previous products
      productListContainer.innerHTML = '';

      // If no products, show a message
      if (products.length === 0) {
          productListContainer.innerHTML = '<p>No products found.</p>';
          return;
      }

      // Loop through products and create HTML for each product
      products.forEach(product => {
          const productCard = `
              <div class="col-md-4">
                  <div class="card h-100" style="width: 18rem;">
                      <img src="${product.image}" class="card-img-top" alt="${product.name}">
                      <div class="card-body">
                          <h5 class="card-title">${product.name}</h5>
                          <p class="card-text">${product.description}</p>
                          <a href="${product.link}" class="btn btn-primary">View</a>
                      </div>
                  </div>
              </div>
          `;
          productListContainer.innerHTML += productCard;
      });
  }

  // Fetch products from the backend
  function fetchProducts() {
      fetch('http://localhost:5000/api/products')  // Replace with your actual backend URL
          .then(response => response.json())
          .then(data => {
              renderProducts(data.products);  // Assuming the response is in { products: [...] }
          })
          .catch(error => {
              console.error("Error fetching products:", error);
              alert("Failed to load products.");
          });
  }

  // Initial fetch of products when the page loads
  fetchProducts();

  // Function to handle search
  searchInput.addEventListener('input', function () {
      const query = searchInput.value.toLowerCase();
      
      // Fetch filtered products from the backend based on search query
      fetch(`http://localhost:5000/api/products?search=${query}`)
          .then(response => response.json())
          .then(data => {
              renderProducts(data.products);
          })
          .catch(error => {
              console.error("Error fetching filtered products:", error);
              alert("Failed to search products.");
          });
  });

  // Optional: Adding smooth scroll effect on anchor clicks
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
          e.preventDefault();
          document.querySelector(this.getAttribute('href')).scrollIntoView({
              behavior: 'smooth'
          });
      });
  });
});
