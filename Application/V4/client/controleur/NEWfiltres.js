export function filtrePoduits() {
    const selectedCategories = Array.from(document.querySelectorAll('#dropdownCategory input[type="checkbox"]:checked'))
        .map(checkbox => checkbox.getAttribute('data-category'));

    const selectedColors = Array.from(document.querySelectorAll('#dropdownColor input[type="checkbox"]:checked'))
        .map(checkbox => checkbox.getAttribute('data-color'));

    const products = document.querySelectorAll('#products-container a');

    products.forEach(product => {
        const productCategory = product.getAttribute('data-category');
        const productColor = product.getAttribute('data-color');

        const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(productCategory);
        const colorMatch = selectedColors.length === 0 || selectedColors.includes(productColor);

        if (categoryMatch && colorMatch) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('#dropdownCategory input[type="checkbox"], #dropdownColor input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', filtrePoduits);
    });
});
