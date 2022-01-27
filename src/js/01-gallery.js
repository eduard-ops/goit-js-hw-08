// Импорт библиотеки   SimpleLightbox и ее стили
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

// Импорт файла Json c данными и файла шаблонизатора с разметкой
import images from './gallery-items.json';
import galleryItemsTpl from '../templates/gallery-items.hbs';

const galleryEl = document.querySelector('.gallery');

const pictureItemsMarkup = CreatMarkupPicturesCards(images);

galleryEl.insertAdjacentHTML('beforeend', pictureItemsMarkup);

galleryEl.addEventListener('click', onGalleryCardClick);

function CreatMarkupPicturesCards(images) {
  return galleryItemsTpl(images);
}

function onGalleryCardClick(evt) {
  evt.preventDefault();
  if (!evt.target.classList.contains('gallery__image')) {
    return;
  }

  openLightbox();
}

function openLightbox() {
  let lightbox = new SimpleLightbox('.gallery a', {
    captionSelector: 'img',
    captionType: 'attr',
    captionsData: 'alt',
    captionPosition: 'bottom',
    captionDelay: 250,
    enableKeyboard: true,
  });
  lightbox.open();
  galleryEl.removeEventListener('click', onGalleryCardClick);
}
