Date.prototype.toDateInputValue = function () {
    let local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0, 10);
};
const today = new Date().toDateInputValue();
export default today 