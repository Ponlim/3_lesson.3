const modalTrigger = document.querySelector('#btn-get');
const modal = document.querySelector('.modal');
const modalCloseBtn = document.querySelector('.modal_close');

let modalShown = false;

const openModal = () => {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    modalShown = true;
}

const closeModal = () => {
    modal.style.display = 'none';
    document.body.style.overflow = '';
}

modalTrigger.onclick = () => openModal();
modalCloseBtn.onclick = () => closeModal();
modal.onclick = (event) => {
    if (event.target === modal) {
        closeModal();
    }
}

const checkScrollToBottom = () => {
    if (!modalShown && window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        openModal();
        window.removeEventListener('scroll', checkScrollToBottom);
    }
}

window.addEventListener('scroll', checkScrollToBottom);
setTimeout(openModal, 10000);