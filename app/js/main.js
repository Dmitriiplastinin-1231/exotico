// header-slider

const headerSliderSlides = document.getElementsByClassName('slider__item');
console.log(document.querySelector('.about__popup-title').parentNode)
const headerSliderDInner = document.querySelector('.header-bottom .slider__dots');

for (let i = 0; i < headerSliderSlides.length; i++){
	const dot = document.createElement('div');
	dot.classList.add('slider__dot');
	if (i === 0){
		dot.classList.add('active');
	}
	headerSliderDInner.append(dot);
}

const headerSliderDots = document.querySelectorAll('.header .slider__dots .slider__dot');


for(const dot of headerSliderDots){
	dot.addEventListener('click', (event) => {
		clearActiveClass(headerSliderDots);
		event.target.classList.add('active');
		headerSliderFlipp();
	})
}

setInterval(()=>{
	let index = 0
	let inend
	headerSliderDots.forEach((item) => {
		if (item.classList.contains('active')){

			clearActiveClass(headerSliderDots);
			indend = index + 1;
		}
		index++;
	})
	if (indend === headerSliderDots.length){
		indend = 0;
	}
	headerSliderDots[indend].classList.add('active');
	headerSliderFlipp();
}, 5000)

function headerSliderFlipp(){
	let index = 0
	headerSliderDots.forEach((item) => {
		index++;
		headerSliderSlides[index-1].style.transform = 'translateY(0)';
		if (item.classList.contains('active')){

			headerSliderSlides[index-1].style.transform=`translateY(${-663*(index - 1)}px)`;

		}
	})
}


// popup

const popupBtn = document.querySelector('.about__popup-btn');
const popupmodul = document.querySelector('.about__popup-video');

popupBtn.addEventListener('click', () => {
	document.body.style.overflow='hidden';
	popupmodul.style.display = 'flex';
})

popupmodul.addEventListener('click', () => {
	document.body.style.overflow = '';
	popupmodul.style.display = 'none';
	popupmodul.children.display = 'none';
})









function clearActiveClass(list) {
	list.forEach((item) => {
		item.classList.remove('active');
	})
}