export const formatNumber = (number) => {
    return new Intl.NumberFormat('ne-NP', { style: 'currency', currency: 'NPR' }).format(number);
}
