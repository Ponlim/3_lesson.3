//phone block

const phoneInput = document.querySelector('#phone_input')
const phoneButton = document.querySelector('#phone_button')
const phoneResult = document.querySelector('#phone_result')

const regEx = /^\+996 [2579]\d{2} \d{2}-\d{2}-\d{2}$/

phoneButton.onclick = () => {
    // alert('ok')
    if (regEx.test(phoneInput.value)){
        phoneResult.innerHTML = 'ok'
        phoneResult.style.color = 'green'
    }else {
        phoneResult.innerHTML = 'not ok'
        phoneResult.style.color = 'red'
    }
} 


//tab slider
const tabContentBlocks = document.querySelectorAll('.tab_content_block');
const tabs = document.querySelectorAll('.tab_content_item');

const hideTabContent = () => {
    tabContentBlocks.forEach(item => {
        item.style.display = 'none';
    });
    tabs.forEach(item => {
        item.classList.remove('tab_content_item_active');
    });
};

const showTabContent = (i = 0) => {
    tabContentBlocks[i].style.display = 'block';
    tabs[i].classList.add('tab_content_item_active');
};

tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
        hideTabContent();
        showTabContent(index);
    });
});

hideTabContent();
showTabContent();

let currentIndex = 0;
const autoSlide = () => {
    hideTabContent();
    currentIndex = (currentIndex + 1) % tabs.length;
    showTabContent(currentIndex);
};

setInterval(autoSlide, 3000);