// src/assets/photos/index.js

const images = require.context('./', false, /\.(jpg|jpeg|png)$/); // Тут ты указываешь формат изображений

const imageObject = images.keys().reduce((acc, path) => {
    const fileName = path.split('/').pop().replace(/\.(jpg|jpeg|png)$/, ''); // убираем расширение
    acc[fileName] = images(path);
    return acc;
}, {});

export default imageObject;
