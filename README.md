# 这是我自己用原生JS开发的一个拖拽库

## 安装

```bash
npm install @wuyuchentr/drag-lib
```

## 使用

```js
import Drag from 'drag-lib';

const drag = new Drag({
    el: document.getElementById('drag-box'),
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
```
