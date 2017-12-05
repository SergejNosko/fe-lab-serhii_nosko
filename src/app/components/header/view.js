import Template from './template.hbs';

export function MainHeader() {
  const mainHeader = document.getElementById('main-header');

  mainHeader.innerHTML = Template();
}

window.addEventListener('scroll', function() {
  let header = document.querySelector('.main-header'),
      headerHeight = header.clientHeight;
  if(window.pageYOffset >= headerHeight){
    header.classList.add('main-header_fixed');
  }
  else{
    header.classList.remove('main-header_fixed');
  }
});
