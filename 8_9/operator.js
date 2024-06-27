// if
let number = 10;
if (number > 5) {
    console.log('Число больше 5');
} else {
    console.log('Число меньше или равно 5');
}

// switch
let day = 3;
switch (day) {
    case 1:
        console.log('Понедельник');
        break;
    case 2:
        console.log('Вторник');
        break;
    case 3:
        console.log('Среда');
        break;
    case 4:
        console.log('Четверг');
        break;
    case 5:
        console.log('Пятница');
        break;
    case 6:
        console.log('Суббота');
        break;
    case 7:
        console.log('Воскресенье');
        break;
    default:
        console.log('Неверный день');
}

// for
for (let i = 0; i < 5; i++) {
    console.log('Цикл for, итерация: ' + i);
}

// while
let j = 0;
while (j < 5) {
    console.log('Цикл while, итерация: ' + j);
    j++;
}

// do..while
let k = 0;
do {
    console.log('Цикл do..while, итерация: ' + k);
    k++;
} while (k < 5);

// break
for (let i = 0; i < 10; i++) {
    if (i === 5) {
        break;
    }
    console.log('Цикл for с break, итерация: ' + i);
}

// continue
for (let i = 0; i < 10; i++) {
    if (i % 2 === 0) {
        continue;
    }
    console.log('Цикл for с continue, итерация: ' + i);
}

// return
function checkNumber(n) {
    if (n > 0) {
        return 'Число положительное';
    } else if (n < 0) {
        return 'Число отрицательное';
    } else {
        return 'Число равно нулю';
    }
}

console.log(checkNumber(10));
console.log(checkNumber(-5));
console.log(checkNumber(0));




