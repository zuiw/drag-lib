# This is a drag-and-drop library that I developed myself with native JS

[English](./README_en.md) | [简体中文](./README_zh.md)

## Installation

```bash
npm install @wuyuchentr/drag-lib
```

## Use

```js
import Drag from 'drag-lib';

const drag = new Drag({
    el: document.getElementById('drag-box'),
    restrictions: {
        x: 1,
        y: 0,
        width: 1000,
        height: 1000
    },
    onDragStart: () => {
        console.log('Start dragging');
    },
    onDrag: (e) => {
        console.log('Dragging', e.clientX, e.clientY);
    },
    onDragEnd: () => {
        console.log ('End of drag');
    }
})

setTimeout(() => {
    drag.makeUndraggable();
}, 5000);
```

## API

### Options

| Name | Type | Description |
| --- | --- | --- |
| el | HTMLElement | The element that needs to be dragged |
| restrictions | Object | Restrictions on the dragging area |
| onDragStart | Function | Callback function when the dragging starts |
| onDrag | Function | Callback function when the dragging is in progress |
| onDragEnd | Function | Callback function when the dragging ends |

### Methods

| Name | Description |
| --- | --- |
| makeDraggable | Make the element draggable |
| makeUndraggable | Make the element undraggable |
| position | Get the current position of the element |
| setPosition | Set the position of the element |
| setOptions | Set the options of the drag library |
