export default (num) => num.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
