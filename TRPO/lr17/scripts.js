// 1. События мыши (click)
document.getElementById('mouseEvent').addEventListener('click', function() {
    alert('Элемент был кликнут!');
});

// 2. События клавиатуры (keydown)
document.addEventListener('keydown', function(event) {
    document.getElementById('keyboardOutput').innerText = `Нажата клавиша: ${event.key}`;
});

// 3. Drag & Drop события
const dragItem = document.getElementById('draggable');
const dropZone = document.getElementById('dropzone');

dragItem.addEventListener('dragstart', function(event) {
    event.dataTransfer.setData('text', event.target.id);
});

dropZone.addEventListener('dragover', function(event) {
    event.preventDefault();
});

dropZone.addEventListener('drop', function(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData('text');
    const draggedElement = document.getElementById(data);
    event.target.appendChild(draggedElement);
});

// 4. События указателя (pointermove)
document.addEventListener('pointermove', function(event) {
    document.getElementById('pointerOutput').innerHTML = `Координаты указателя: ${event.clientX}, ${event.clientY}`;
});

// 5. События полосы прокрутки (scroll)
window.addEventListener('scroll', function() {
    document.getElementById('scrollValue').innerText = `Прокрутка: ${window.scrollY}px`;
});

// 7. События, связанные с таймером (setTimeout)
document.getElementById('startTimer').addEventListener('click', function() {
    setTimeout(function() {
        alert('Прошло 3 секунды!');
    }, 3000);
});
