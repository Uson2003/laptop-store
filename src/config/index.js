export const formatNumber = (number) => {
    return new Intl.NumberFormat('ru-RU').format(number);
};

export const getTotalSum = (items) => items.reduce((accumulator, currentItem) => {
    return accumulator + currentItem;
}, 0);