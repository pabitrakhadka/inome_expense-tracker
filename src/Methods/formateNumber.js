export const formatNumber = (number) => {
    const formatted = new Intl.NumberFormat('en-IN').format(number);
    const numberFormatted = "NPR." + formatted;
    return numberFormatted;
}