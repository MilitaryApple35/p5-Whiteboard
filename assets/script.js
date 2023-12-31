document.getElementById('size').addEventListener('click', function(event) {
    const sizeMenu = document.getElementById('size-menu');
    if (sizeMenu.style.display === 'none') {
        sizeMenu.style.display = 'block';
    } else {
        sizeMenu.style.display = 'none';
    }
    event.stopPropagation();
});

document.getElementById('size-slider').addEventListener('input', function() {
    const sizeValue = this.value;
    const styleElement = document.querySelector('style');
    const sliderValue = document.getElementById('slider-value');
    sliderValue.innerHTML = sizeValue;
    styleElement.innerHTML = styleElement.innerHTML.replace(/--weight: \d+;/, `--weight: ${sizeValue};`);
});

document.addEventListener('click', function() {
    const sizeMenu = document.getElementById('size-menu');
    sizeMenu.style.display = 'none';
});