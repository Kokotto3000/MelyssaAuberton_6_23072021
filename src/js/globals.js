export const PHOTOGRAPHERS_SECTION= document.querySelector('.accueil-photographers');
export const PHOTOGRAPHER_PRESENTATION= document.querySelector('.photographer-page__presentation');
export const PHOTOGRAPHER_MEDIAS= document.getElementById('photographer-medias');
export const PHOTOGRAPHER_LIKES= document.getElementById('likes');
export const PHOTOGRAPHER_PRICE= document.getElementById('price');
export const FORM= document.querySelector("form");
export const LIGHTBOX= document.getElementById('lightbox');

export const tabbableElements = 'a[href], area[href], input:not([disabled]),' +
	'select:not([disabled]), textarea:not([disabled]),' +
	'button:not([disabled]), iframe, object, embed, *[tabindex],' +
	'*[contenteditable]';

export function keepFocus(context) {
	const allTabbableElements = context.querySelectorAll(tabbableElements);
    // console.log(allTabbableElements);
	const firstTabbableElement = allTabbableElements[0];
	const lastTabbableElement = allTabbableElements[allTabbableElements.length - 1];

	function keyListener(e) {
		// let keyCode = e.which || e.keyCode; // Get the current keycode

		// Polyfill to prevent the default behavior of events
		e.preventDefault = e.preventDefault || function () {
			e.returnValue = false;
		};

		// If it is TAB
		if (e.code === "Tab") {

			// Move focus to first element that can be tabbed if Shift isn't used
			if (e.target === lastTabbableElement && !e.shiftKey) {
				e.preventDefault();
				firstTabbableElement.focus();

			// Move focus to last element that can be tabbed if Shift is used
			} else if (e.target === firstTabbableElement && e.shiftKey) {
				e.preventDefault();
				lastTabbableElement.focus();
			}
		}
	};

	context.addEventListener('keydown', keyListener, false);
};
