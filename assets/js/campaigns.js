const buttons = document.querySelectorAll('.valorDoacao'); 
buttons.forEach(button => { 
button.addEventListener('click', () => {
 buttons.forEach(btn => btn.classList.remove('selected')); 
button.classList.add('selected'); 
}); 
});