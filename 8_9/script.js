function showAlert() {
    alert('Внешний JS!');
}



document.addEventListener('DOMContentLoaded', () => {
    const sizeOptions = document.querySelectorAll('.size-option');
    const selectedSizeText = document.getElementById('selected-size');

    sizeOptions.forEach(option => {
        option.addEventListener('click', () => {
            sizeOptions.forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');
            selectedSizeText.textContent = `Selected Size: ${option.getAttribute('data-size')}`;
        });
    });
});






document.addEventListener('DOMContentLoaded', () => {
    let quantity = 1;
    const quantityDisplay = document.getElementById('quantity');
    const decreaseBtn = document.getElementById('decrease');
    const increaseBtn = document.getElementById('increase');

    decreaseBtn.addEventListener('click', () => {
        if (quantity > 1) {
            quantity--;
            quantityDisplay.textContent = quantity;
        }
    });

    increaseBtn.addEventListener('click', () => {
        quantity++;
        quantityDisplay.textContent = quantity;
    });
});
