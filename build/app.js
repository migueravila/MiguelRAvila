const TypeWriter = function(txtElement, words, wait = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleating = false;
}
// Type Method 
TypeWriter.prototype.type = function() {
    const current = this.wordIndex % this.words.length;
    const fullTxt = this.words[current];

    if(this.isDeleating) {
        this.txt = fullTxt.substring(0, this.txt.length - 1)
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1)
    }

    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

    let typeSpeed = 200;
    if(this.isDeleating) {
        typeSpeed /= 2;
    }

    if(!this.isDeleating && this.txt === fullTxt) {
        typeSpeed = this.wait;
        this.isDeleating = true;
    } else if(this.isDeleating && this.txt === '') {
        this.isDeleating = false;
        this.wordIndex++;
        typeSpeed = 500;
    }

    setTimeout(() => this.type(), typeSpeed);
}
// Init on DOM Load
document,addEventListener('DOMContentLoaded', init);
// Init app
function init() {
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');

    new TypeWriter(txtElement, words, wait);
}