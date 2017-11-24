//require('./header.less'); // example of including component's styles

window.addEventListener('scroll', function() {
  let header = document.querySelector('.main-header'),
      headerHeight = header.clientHeight;
  console.log(headerHeight);
  if(window.pageYOffset >= headerHeight){
    header.classList.add('main-header_fixed');
  }
  else{
    header.classList.remove('main-header_fixed');
  }
});
