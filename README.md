# Event Handler Drag and Drop(dnd) 1week

# 실습

1. clone repository
```
npx create-react-app '폴더이름'
```

2. npm install

```
npm i
```

3. element의 event handler 확인
```javascript
onDragStart

onDragOver

onDragLeave

onDrop

onDragEnter

onDragEnd
```
4. element의 data-position을 활용해 로직 구성하기

5. 이벤트 헨들러 순서
  - onDragStart - element를 마우스로 드래그를 시작하는 단계
  - onDragOver - element를 들고있을 때 다른 element와 겹쳐진 상태-지속
  - onDragEnter - element를 들고 있을때 다른 element의 영역에 들어 온 상태-한번
  - onDragEnd -  element를 아무 영역에 놓았을때(마우스를 놓았을때)
  - onDrop - element를 drag 가능한 영역에 놓았을때

## 실습 코드
드래그를 시작하면 element의 투명도를 0.4로 바꿔준다.
현재 드래그하고 있는 element의 포지션값을 draggedFrom에 담아준다.(현재 위치를 알기 위함)
dragAndDrop을 set 해준다. 이 때 오리지날 리스트를 list로 해준다.(현재의 리스트)
```javascript
 const onDragStart = (event) => {
        console.log('드래그 시작')
        event.currentTarget.style.opacity = '0.4';
        const initialPosition = parseInt(event.currentTarget.dataset.position)//배열 인덱스
        setDragAndDrop({
            ...dragAndDrop,
            draggedFrom: initialPosition,
            originalOrder:list
        }
    )
 }
```

onDragEnter함수에 드래그를 시작하고 겹치는 엘리먼트에 class를 추가해주어 영역을 표시해준다.
onDragOver event.preventDefault(); //엘리먼트는 서로 위치가 변할수 없기 때문에 이벤트 동작하기전에 멈춰준다
original list에서 0부터 draggTo, dragFrom, 그리고 dragTo 이후의 나머지 엘리먼트를 추가해준다.
```javascript
  const onDragEnter = (event) => { 
    console.log('element를 들고 있을때 다른 element의 영역에 들어 온 상태');
    event.currentTarget.classList.add("over");
  };
  
 const onDragOver = (event) => {
        console.log('아이템 들고있을때')
        event.preventDefault(); //엘리먼트는 서로 위치가 변할수 없기 때문에 이벤트 동작하기전에 멈춰준다
        let newList = dragAndDrop.originalOrder;
        const draggedFrom = dragAndDrop.draggedFrom; // 드래그 되는 엘리먼트 인덱스
        const draggedTo  = parseInt(event.currentTarget.dataset.position); //놓을 수 있는 영역의 인덱스(끝), 겹쳐있는 인덱스
        const itemDragged = newList[draggedFrom]// 드래그 되는 엘리먼트
        const remainingItems = newList.filter((item,index) => index !== draggedFrom) // 드래그하고있는 엘리먼트 빼고 배열목록
        newList = [										// 드래그 시작, 끝 인덱스를 활용해 새로운 배열로 반환해줌
            ...remainingItems.slice(0, draggedTo), //0부터 드래그 
            itemDragged,                           //드래그 되는 엘리먼트
            ...remainingItems.slice(draggedTo),     //겹치는 엘리먼트 이후의 배열 반환
        ];
        if(draggedTo !== dragAndDrop.draggedTo){ //인덱스 포지션이 다른 경우에만 set 해준다
            setDragAndDrop ({
                ...dragAndDrop,
                updatedOrder:newList,
                draggedTo: draggedTo
            })
        }
    }
```

onDragEnd  드래그를 놓았을때 투명도를 다시 1로 set해준다.
list를 update된 list로 바꿔주고 over class를 전부 지워준다.

```javascript 

  const onDragEnd = (event) => {
    console.log('아무영역에 드래그를 놓음');
    event.currentTarget.style.opacity = "1";
    const listItens = document.querySelectorAll(".draggable");
    setList(dragAndDrop.updatedOrder); //리스트를 재구성
    listItens.forEach((item) => {
      item.classList.remove("over");
    });
  };
```

onDrop  영역에 드랍이 되고 나면 dragAndDrop를  from,to를 초기화 시켜준다.(리스트 제외)


```javascript 

 const onDrop = (event) => {
        console.log('드래그 영역 안에 아이템을 드랍');
        setDragAndDrop({//상태 초기화
          ...dragAndDrop,
          draggedFrom: null,
          draggedTo: null,
        });
  };
```

onDragLeave  드래그 범위가 벗어나면 over class를 지워준다.


```javascript 

 const onDrop = (event) => {
        console.log('드래그 영역 안에 아이템을 드랍');
        setDragAndDrop({//상태 초기화
          ...dragAndDrop,
          draggedFrom: null,
          draggedTo: null,
        });
  };
```
