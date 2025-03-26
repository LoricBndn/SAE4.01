export function filtrePoduits() {
    const selectedCategories = Array.from(document.querySelectorAll('#dropdownCategory input[type="checkbox"]:checked'))
    .map(checkbox => checkbox.getAttribute('data-category'));

const selectedColors = Array.from(document.querySelectorAll('#dropdownColor input[type="checkbox"]:checked'))
    .map(checkbox => checkbox.getAttribute('data-color'));

const selectedSizes = Array.from(document.querySelectorAll('#dropdownSize input[type="checkbox"]:checked'))
    .map(checkbox => checkbox.getAttribute('data-size'));

const products = document.querySelectorAll('#products-container a');

products.forEach(product => {
    const productCategory = product.getAttribute('data-category');
    const productColors = product.getAttribute('data-color');
    const productSizes = product.getAttribute('data-size').split(',');

    const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(productCategory);
    const colorMatch = selectedColors.length === 0 || selectedColors.includes(productColors);
    const sizeMatch = selectedSizes.length === 0 || productSizes.some(size => selectedSizes.includes(size));

    if (categoryMatch && colorMatch && sizeMatch) {
        product.style.display = 'block';
    } else {
        product.style.display = 'none';
    }
});
}

document.querySelectorAll('.filter-checkbox').forEach(checkbox => {
checkbox.addEventListener('change', filtrePoduits);
});

function rechercherProduits() {
    const searchInput = document.getElementById('default-search').value.trim().toLowerCase();

    document.querySelectorAll('#products-container a').forEach(article => {
        const articleName = article.querySelector('h3').textContent.toLowerCase();
        const matchesSearch = articleName.includes(searchInput);

        if (matchesSearch) {
            article.style.display = 'block';
        } else {
            article.style.display = 'none';
        }
    });
}

const rechercher = document.getElementById('default-search');
if(rechercher) rechercher.addEventListener('input', rechercherProduits);