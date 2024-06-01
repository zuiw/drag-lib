/**
 * @copyright
 * @file drag-lib.js
 * @author wuyuchen
 *
 * drag-lib.js - copyright (c) 2023-2024
 * https://github.com/zuiw/drag-lib
 *
 * This file is put on the Apache-2.0 License
 * (https://www.apache.org/licenses/LICENSE-2.0)
 */

/**
 * Drag class
 * @class
 */
export default class Drag {

	/**
	 * constructor of Drag
	 * @constructor
	 * @param {Object} opraters - options for Drag
	 * @returns {Drag} new instance of Drag
	 */
	constructor(opraters) {
		if (!typeof opraters === 'Object') {
			throw new Error('Opraters must be an object!');
		}

		let sortKeys = Object.keys(opraters).sort();

		let newOpraters = {};
		for (let i = 0; i < sortKeys.length; i++) {
			newOpraters[sortKeys[i]] = opraters[sortKeys[i]];
		}

		this.opraters = newOpraters;

		this.init();

		this.makeDraggable(this.el);

		return this;
	}

	/**
	 * traverse the opraters object and call the corresponding function
	 * @returns {void}
	 */
	init() {
		for (let key in this.opraters) {
			if (key === 'el') {
				if (typeof this.opraters[key] === 'string') {
					this.el = document.querySelector(this.opraters[key]);
				} else if (this.opraters[key] instanceof HTMLElement) {
					this.el = this.opraters[key];
				} else {
					throw new Error('Element not found!');
				}
			}

			let el;
			if (typeof this.opraters.el === 'string') {
				el = document.querySelector(this.opraters.el);
			} else {
				el = this.opraters.el;
			}


			if (key === 'onDragStart') {
				if (typeof this.opraters[key] === 'function') {
					let onDragStart = this.opraters[key];
					let onDrag = this.onDrag;
					el.addEventListener('mousedown', function(e) {
						onDragStart(e);
						el.addEventListener('mousemove', onDrag);
					});
				} else {
					throw new Error('onDragStart must be a function!');
				}
			}

			if (key === 'onDrag') {
				if (typeof this.opraters[key] === 'function') {
					let onDrag = this.opraters[key];
					this.onDrag = function(e) {
						onDrag(e);
					}
				} else {
					throw new Error('onDrag must be a function!');
				}
			}

			if (key === 'onDragEnd') {
				if (typeof this.opraters[key] === 'function') {
					let onDragEnd = this.opraters[key];
					let onDrag = this.onDrag;
					el.addEventListener('mouseup', function(e) {
						onDragEnd(e);
						el.removeEventListener('mousemove', onDrag);
					});
				} else {
					throw new Error('onDragEnd must be a function!');
				}
			}

			if (key === 'restrictions') {
				if (typeof this.opraters[key] === 'object') {
					this.restrictions = this.opraters[key];
				} else {
					throw new Error('restrictions must be an object!');
				}
			}
    	}
  	}

	/**
	 * make the element draggable
	 * @param {HTMLElement} element - the element to be made draggable
	 */
	makeDraggable(element) {
		element.style.position = 'absolute';

		let restrictions = this.restrictions;

		element.addEventListener('mousedown', function(e) {
			e.preventDefault();

			if (!restrictions || (restrictions && !restrictions.x && !restrictions.y)) {
				var offsetX = e.clientX - element.getBoundingClientRect().left;
				var offsetY = e.clientY - element.getBoundingClientRect().top;
			} else if (restrictions.x) {
				var offsetX = e.clientX - element.getBoundingClientRect().left;
			} else if (restrictions.y) {
				var offsetY = e.clientY - element.getBoundingClientRect().top;
			}


			document.addEventListener('mousemove', drag);
			document.addEventListener('mouseup', function() {
				document.removeEventListener('mousemove', drag);
			})

			function drag(e) {
				if (restrictions.width || restrictions.height) {
					if (restrictions.width && restrictions.height) {
						if ((e.clientX - offsetX > restrictions.width || e.clientX - offsetX < 0) || (e.clientY - offsetY > restrictions.height || e.clientY - offsetY < 0)) {
							return;
						}
					} else if (restrictions.width) {
						if (e.clientX - offsetX > restrictions.width || e.clientX - offsetX < 0) {
							return;
						}
					} else if (restrictions.height) {
						if (e.clientY - offsetY > restrictions.height || e.clientY - offsetY < 0) {
							return;
						}
					}
				}

				element.style.left = e.clientX - offsetX + 'px';
				element.style.top = e.clientY - offsetY + 'px';
			}
		});
	}

	/**
	 * make the element undraggable
	 * @param {HTMLElement} element - the element to be made undraggable, optional
	 */
	makeUndraggable(element = this.opraters.el) {
		element.outerHTML = element.outerHTML; // remove event listeners

		element.style.position = 'static';
	}

	/**
	 * get the position of the element
	 * @returns {object} - the position of the element
	 */
	position() {
		return {
			x: this.opraters.el.getBoundingClientRect().left,
			y: this.opraters.el.getBoundingClientRect().top
		}
	}

	/**
	 * set the position of the element
	 * @param {number} x the coordinate of x axis
	 * @param {number} y the coordinate of y axis
	 */
	setPosition(x, y) {
	    this.opraters.el.style.left = x + 'px';
	    this.opraters.el.style.top = y + 'px';
	}

	/**
	 * set the options of the draggable element
	 * @param {object} options the options of the draggable element
	 * @returns {Drag} return self
	 */
	setOptions(options) {
	    for (let key in options) {
	    	if (options.hasOwnProperty(key)) {
	    		this.opraters[key] = options[key];
	    	}
	    }
	    return this;
	}
}
