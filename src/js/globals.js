/********************VARIABLES GLOBALES AU PROJET********************/

export const PHOTOGRAPHERS_SECTION= document.querySelector('.accueil-photographers');
export const PHOTOGRAPHER_PRESENTATION= document.querySelector('.photographer-page__presentation');
export const PHOTOGRAPHER_MEDIAS= document.getElementById('photographer-medias');
export const FORM= document.querySelector("form");
export const LIGHTBOX= document.getElementById('lightbox');

// considère tous les éléments focusable
export const tabbableElements = 'a[href], area[href], input:not([disabled]),' +
	'select:not([disabled]), textarea:not([disabled]),' +
	'button:not([disabled]), iframe, object, embed, *[tabindex],' +
	'*[contenteditable]';

//fonction qui piège le focus
export function keepFocus(context) {
	const allTabbableElements = context.querySelectorAll(tabbableElements);
	const firstTabbableElement = allTabbableElements[0];
	const lastTabbableElement = allTabbableElements[allTabbableElements.length - 1];

	function keyListener(e) {
		e.preventDefault = e.preventDefault || function () {
			e.returnValue = false;
		};

		//si on appuie sur la touche tab
		if (e.code === "Tab") {

			//si on appuie sur la touche tab sans appuyer sur shift
			if (e.target === lastTabbableElement && !e.shiftKey) {
				e.preventDefault();
				firstTabbableElement.focus();

			//si on appuie sur tab et shift on revient en arrière
			} else if (e.target === firstTabbableElement && e.shiftKey) {
				e.preventDefault();
				lastTabbableElement.focus();
			}
		}
	};

	//l'event pour détecter les touches dans l'élément "piégé"
	context.addEventListener('keydown', keyListener, false);
};
