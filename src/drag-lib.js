/*
  * drag-lib.js - copyright (c) 2023-2024 wuyuchen
  * https://github.com/zuiw/drag-lib
  * Apache-2.0 License
*/


class Drag {

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
    }
  
    init() {
      for (let key in this.opraters) {
        if (key === 'el') {
          if (typeof this.opraters[key] === 'string') {
            this.makeDraggable(document.querySelector(this.opraters[key]));
          } else if (this.opraters[key] instanceof HTMLElement) {
            this.makeDraggable(this.opraters[key]);
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
      }
    }
    
  
    makeDraggable(element) {
      element.style.position = 'absolute';
      
      element.addEventListener('mousedown', function(e) {
        e.preventDefault();
        
        var offsetX = e.clientX - element.getBoundingClientRect().left;
        var offsetY = e.clientY - element.getBoundingClientRect().top;
        
        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', function() {
          document.removeEventListener('mousemove', drag);
        })
        
        function drag(e) {
          element.style.left = e.clientX - offsetX + 'px';
          element.style.top = e.clientY - offsetY + 'px';
        }
      });
    }
  }
  