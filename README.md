# Event Handler Drag and Drop(dnd) 1week

## 1. event handler란?

> 이벤트란 브라우저에서 사용자의 조작이나 환경의 변화로 벌어진 사건을 말하며 이러한 이벤트에 대해 즉각적인 반응을 할 수 있게 하는 것을 핸들러라 부릅니다.

>> 브라우저에서 발생하는 이벤트를 요약하면 다음과 같습니다.

## 2. event handler 종류

| 이벤트 종류|설명 |
|----|---|
| *Window event* | 브라우저에 변화가 생겼을 때 | 
| *Mouse event* | 사용자가 마우스로 조작했을 때 | 
| *Keyboard event* | 사용자가 키보드를 조작했을 때 | 
| *Form event* | 폼 요소 조작에 의해 발생하는 이벤트 | 
| *Cliboard event* | 사용자가 복사, 자르기, 붙여넣기 할 때 | 

### drag는 mouse event를 상속받는다.
![drag event](https://user-images.githubusercontent.com/42566975/192132079-f8ea59ca-7932-436e-a2f6-3c72328000d7.png)

#### event handler 종류

| 이벤트|설명 |
|----|---|
| *dragstart* | 사용자가 객체(object)를 드래그하려고 시작할 때 발생함. | 
| *dragenter* | 마우스가 대상 객체의 위로 처음 진입할 때 발생함. | 
| *dragover* | 드래그하면서 마우스가 대상 객체의 위에 자리 잡고 있을 때 발생함. | 
| *drag* | 대상 객체를 드래그하면서 마우스를 움직일 때 발생함. | 
| *drop* | 드래그가 끝나서 드래그하던 객체를 놓는 장소에 위치한 객체에서 발생함. | 
| *dragleave* | 드래그가 끝나서 마우스가 대상 객체의 위에서 벗어날 때 발생함. | 
| *dragend* | 대상 객체를 드래그하다가 마우스 버튼을 놓는 순간 발생함. | 


<hr/>

# DataTransfer 객체

>드래그 앤 드롭 이벤트를 위한 모든 이벤트 리스너 메소드(event listener method)는 DataTransfer 객체를 반환합니다.

>이렇게 반환된 DataTransfer 객체는 드래그 앤 드롭 동작에 관한 정보를 가지고 있게 됩니다.

# draggable 속성

>웹 페이지 내의 모든 요소는 draggable 속성을 사용하여 드래그될 수 있는 객체(draggable object)로 변환될 수 있습니다.

# ondragstart 속성

>드래그될 수 있는 객체로 만든 후에는 ondragstart 속성을 통해 DataTransfer 객체의 setData() 메소드를 호출합니다.

>setData() 메소드는 드래그되는 대상 객체의 데이터(data)와 타입(data type)을 설정합니다.

# ondragover 속성

>ondragover 속성은 드래그되는 대상 객체가 어느 요소 위에 놓일 수 있는지를 설정합니다.

>기본적으로 HTML 요소는 다른 요소의 위에 위치할 수 없습니다.

>따라서 다른 요소 위에 위치할 수 있도록 만들기 위해서는 놓일 장소에 있는 요소의 기본 동작을 막아야만 합니다.

>이 작업을 event.preventDefault() 메소드를 호출하는 것만으로 간단히 설정할 수 있습니다.

<a href="http://www.tcpschool.com/html/html5_api_dragAndDrop" >출처 TCP school </a>
<a href="https://developer.mozilla.org/en-US/docs/Web/API/DragEvent/dataTransfer" >출처 mdn web docs </a>

---------------------------------------------------------------------------------------------------------

