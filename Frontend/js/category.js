document.addEventListener('DOMContentLoaded', function () {
  // Get the category from the URL query parameter
  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get('category');

  // Display category name
  document.getElementById('category-name').textContent = category.charAt(0).toUpperCase() + category.slice(1);

  // Fetch products from the backend
  fetch(`http://localhost:5000/api/products?category=${category}`)  // Adjust your API route accordingly
      .then(response => response.json())
      .then(data => {
          const products = data.products || [];  // Assuming response contains products array

          // Render products for the selected category
          const productsContainer = document.getElementById('category-products');
          products.forEach(product => {
              const productCard = `
                  <div class="col-md-4">
                      <div class="card" style="width: 18rem;">
                          <img src="${product.imageUrl}" class="card-img-top" alt="${product.name}">
                          <div class="card-body">
                              <h5 class="card-title">${product.name}</h5>
                              <p class="card-text">${product.description}</p>
                              <a href="#" class="btn btn-primary">View</a>
                          </div>
                      </div>
                  </div>
              `;
              productsContainer.innerHTML += productCard;
          });
      })
      .catch(error => {
          console.error('Error fetching products:', error);
          alert('An error occurred while fetching products.');
      });
});
