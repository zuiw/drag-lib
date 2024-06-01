# 这是我自己用原生JS开发的一个拖拽库

[English](./README_en.md) | [简体中文](./README_zh.md)

## 安装

```bash
npm install @wuyuchentr/drag-lib
```

## 使用

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
        console.log('开始拖拽');
    },
    onDrag: (e) => {
        console.log('拖拽中', e.clientX, e.clientY);
    },
    onDragEnd: () => {
        console.log('拖拽结束');
    }
})

setTimeout(() => {
    drag.makeUndraggable();
}, 5000);
```

## API

## API

### 选项

### 选项

| 名字 | 类型 | 描述 |
| --- | --- | --- |
| el | HTMLElement or String | 需要拖动的元素 |
| restrictions | Object | 限制元素拖动 |
| onDragStart | Function | 拖拽开始时的回调函数 |
| onDrag | Function | 拖动过程中的回调函数 |
| onDragEnd | Function | 拖拽结束时的回调函数 |

### 方法

| 名字 | 描述 |
| --- | --- |
| makeDraggable | 让元素变得可拖拽 |
| makeUndraggable | 让元素变得不可拖拽 |
| position | 得到可拖拽元素的位置 |
| setPosition | 设置可拖拽元素的位置 |
| setOptions | 设置选项 |

