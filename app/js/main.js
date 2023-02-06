// header-slider

const headerSliderSlides = document.getElementsByClassName('slider__item');
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
	let index = 0;
	let inend;
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

			headerSliderSlides[index-1].style.transform=`translateY(${-headerSliderSlides[0].clientHeight*(index - 1)}px)`;

		}
	})
}
//menu

const navigationBtn = document.querySelector('.navigation__btn');
const navigationMenu = document.querySelector('.navigation__list')

navigationBtn.addEventListener('click', ()=>{
	navigationMenu.classList.toggle('active')
	if (navigationMenu.classList.contains('active')){
		document.body.style.overflow = 'hidden';
	}else{
		document.body.style.overflow = '';
	}
})



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


//

const productCategoryBtn = document.querySelector('.product__sort > span');
const productCategoryList = document.querySelector('.product__sort');

productCategoryBtn.addEventListener('click', () => {
	productCategoryList.classList.toggle('product__sort--active');
})


//product section slider

const productSliderInner = document.querySelector('.product__bottom-inner');
const productSliderBtns = document.querySelectorAll('.product__slider-arrow');
const productSlides = document.querySelectorAll('.product__bottom-item');
let productSliderNum = 0;




productSliderBtns[0].addEventListener('click', ()=>{
	if (productSliderNum > 0){
		--productSliderNum;
	}
	productFlipping();
})
productSliderBtns[1].addEventListener('click', ()=>{
	const productSlideCount = productSliderInner.clientWidth / productSlides[0].clientWidth;
	let productSlidesAShow = 0;
	productSlides.forEach((item) => {
		if (item.classList.contains('product__bottom-item--hide')){
			productSlidesAShow++;
		}
	});
	if (productSliderNum + productSlideCount < productSlides.length - 1 - productSlidesAShow){
		++productSliderNum;
	}
	productFlipping()
})

function productFlipping(){
	productSliderInner.style.transform = `translateX(-${productSliderNum * productSlides[0].clientWidth}px)`
}


//product sort

const productSortBtn = document.querySelectorAll('.product__sort-categorybtn');
const productSortItems = document.querySelectorAll('.product__bottom-item');



function productFilter(category, items){
	items.forEach((item) => {
		const productSortСoincidence = !item.classList.contains(`product__bottom-${category.toLowerCase()}`);
		const productSortShowAll = category.toLowerCase() === 'all';
		if (productSortСoincidence && !productSortShowAll){
			productSliderNum = 0;
			productFlipping();
			item.classList.add('product__bottom-item--hide');
		}else{
			item.classList.remove('product__bottom-item--hide');
		}
	})

}


productSortBtn.forEach((btn)=>{
	btn.addEventListener('click',()=>{

		productFilter(btn.dataset.productFilter, productSortItems);
	})
})


//blog slider and info switch

const blogSliderInner = document.querySelector('.blog-slider__inner');
const blogPersonItems = document.querySelectorAll('.blog-info__people-item')
const blogPersonInfo = document.querySelectorAll('.blog-info__item');
const blogSliderBtns = document.querySelectorAll('.blog-slider__arrow');
let blogSlideCounter = 0;



blogSliderBtns[0].addEventListener('click', ()=>{
	if (blogSlideCounter > 0){
		blogSlideCounter--;
	}
	blogSlidesFlipping(blogSlideCounter, blogPersonItems[0].clientWidth);
})


blogASlides = blogSliderInner.clientWidth / blogPersonItems[0].clientWidth;

blogSliderBtns[1].addEventListener('click', ()=>{
	if (blogSlideCounter < blogPersonItems.length - blogASlides){
		blogSlideCounter++;
	}
	blogSlidesFlipping(blogSlideCounter, blogPersonItems[0].clientWidth);
})


function blogSlidesFlipping(num, width){

	blogSliderInner.style.transform=`translateX(-${num * width}px)`
}

let blogPErsonNum = 0;
blogPersonItems.forEach((item)=>{
	item.num = blogPErsonNum;
	blogPErsonNum++;
	item.addEventListener('click', ()=>{
		clearActiveClass(blogPersonItems);
		clearActiveClass(blogPersonInfo);
		item.classList.add('active');
		blogPersonInfo[item.num].classList.add('active');
	})
})





function clearActiveClass(list) {
	list.forEach((item) => {
		item.classList.remove('active');
	})
}