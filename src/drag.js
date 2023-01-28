import { useState } from 'react';
import { uuid } from 'uuid/v4';
import './App.css'
import './style/common.css'
import { useEffect } from 'react';
const Drag = ()  => {
    const [list,setList] = useState([
        {
            emoji: <span>👦</span>,
            name: '이상연'
        },
        {
            emoji: <span>😇</span>,
            name: '최인묵'
        },
        {
            emoji: <span>😎</span>,
            name: '권혁민'
        },
        {
            emoji: <span>👻</span>,
            name: '정용우'
        },
        {
            emoji: <span>😺</span>,
            name: '고앙다'
        },
        {
            emoji: <span>👤</span>,
            name: '송은석'
        },
    ])
    const [list2,setList2] = useState([
        {
            emoji: <span>👦</span>,
            name: '이상연2'
        },
        {
            emoji: <span>😇</span>,
            name: '김이언2'
        },
        {
            emoji: <span>😎</span>,
            name: '유병학2'
        },
        {
            emoji: <span>👻</span>,
            name: '꼼짱모2'
        },
        {
            emoji: <span>😺</span>,
            name: '코우자2'
        },
        {
            emoji: <span>👤</span>,
            name: '멀방맨2'
        },
        {
            emoji: <span>👻</span>,
            name: '코린2'
        },
    ])
    const [total,setTotal] = useState(list.length + list2.length);
    const [dragAndDrop, setDragAndDrop] = useState({
        draggedFrom: null, //드래그 시작 인덱스
        draggedTo: null, // 변경될 드래그 인덱스
        isDragging: false,
        originalOrder: list,
        updatedOrder: list,
      });
      const [dragAndDrop2, setDragAndDrop2] = useState({
        draggedFrom: null, //드래그 시작 인덱스
        draggedTo: null, // 변경될 드래그 인덱스
        isDragging: false,
        originalOrder: list2,
        updatedOrder: list2,
    });
    const [currentList, setCurrentList] = useState(0)
    //드래그 시작
    const onDragStart = (event) => {
        console.log('드래그 시작')
        event.currentTarget.style.opacity = '0.4';
        const initialPosition = parseInt(event.currentTarget.dataset.position)//배열 인덱스
        const initialListIndex = parseInt(event.currentTarget.dataset.list)// 리스트 목록 순번
        if(initialListIndex === 1 && initialPosition){
            setDragAndDrop({
                ...dragAndDrop,
                draggedFrom: initialPosition,
                originalOrder:list
            })
            setCurrentList(1)
        }
        else {
            // console.log(initialPosition);
            setDragAndDrop2({
                ...dragAndDrop2,
                draggedFrom: initialPosition,
                originalOrder:list2
            })
            setCurrentList(2)
        }
        }
    // 드래그 하면서 다른 아이템의 위로 들어올 때
    const onDragEnter = (event) => { 
        console.log('아이템이 다른것과 겹침');
        event.currentTarget.classList.add("over");
    };
    useEffect(()=> {
        console.log(currentList)
    },[currentList])
    // 잡은 Item이 다른 Item이랑 겹쳤을 때 발생<겹쳐졌을 때>
    const onDragOver = (event) => {
        console.log('아이템 들고있을때')
        event.preventDefault();
        const initialListIndex = parseInt(event.currentTarget.dataset.list) //현재 인덱스
        if(currentList === initialListIndex){ //같을때
            if(currentList === 1){//첫번째 리스트
                let newList = dragAndDrop.originalOrder;
                const draggedFrom = dragAndDrop.draggedFrom; // 드래그 되는 엘리먼트의 처음 인덱스
                const draggedTo  = parseInt(event.currentTarget.dataset.position); //놓을 수 있는 영역의 인덱스(끝)
                const itemDragged = newList[draggedFrom]// 드래그 겹치는 엘리먼트
                const remainingItems = newList.filter((item,index) => index !== draggedFrom) // 드래그하고있는 엘리먼트 빼고 배열목록
                newList = [										// 드래그 시작, 끝 인덱스를 활용해 새로운 배열로 반환해줌
                    ...remainingItems.slice(0, draggedTo),
                    itemDragged,
                    ...remainingItems.slice(draggedTo),
                ];
                if(draggedTo !== dragAndDrop.draggedTo){ //같은 엘리먼트 일때
                    setDragAndDrop ({
                        ...dragAndDrop,
                        updatedOrder:newList,
                        draggedTo: draggedTo
                    })
                }
            }else{ //두번째 리스트
                let newList = dragAndDrop2.originalOrder;
                const draggedFrom = dragAndDrop2.draggedFrom; // 드래그 되는 엘리먼트의 처음 인덱스
                const draggedTo  = parseInt(event.currentTarget.dataset.position); //놓을 수 있는 영역의 인덱스(끝)
                const itemDragged = newList[draggedFrom]// 드래그 겹치는 엘리먼트
                const remainingItems = newList.filter((item,index) => index !== draggedFrom) // 드래그하고있는 엘리먼트 빼고 배열목록
                newList = [										// 드래그 시작, 끝 인덱스를 활용해 새로운 배열로 반환해줌
                    ...remainingItems.slice(0, draggedTo),
                    itemDragged,
                    ...remainingItems.slice(draggedTo),
                ];
                // console.log(dragAndDrop2)
                if(draggedTo !== dragAndDrop2.draggedTo){
                    setDragAndDrop2 ({
                        ...dragAndDrop2,
                        updatedOrder:newList,
                        draggedTo: draggedTo
                    })
                }
            }
        }else{// 다를때
            console.log('다름')
            if(initialListIndex === 1){//첫번째 리스트
                let newList = list;
                const draggedFrom = dragAndDrop2.draggedFrom; // 드래그 되는 엘리먼트의 처음 인덱스
                const draggedTo  = parseInt(event.currentTarget.dataset.position); //놓을 수 있는 영역의 인덱스(끝)
                // const itemDragged = newList[draggedFrom]// 드래그 겹치는 엘리먼트
                const remainingItems = list2.filter((item,index) => index !== draggedFrom) // 드래그하고있는 엘리먼트 빼고 배열목록
                
                newList = [										// 드래그 시작, 끝 인덱스를 활용해 새로운 배열로 반환해줌
                    ...newList.slice(0, draggedTo),
                    // itemDragged,
                    list2[draggedFrom],
                    ...newList.slice(draggedTo),
                ];
                if(draggedTo){
                    setDragAndDrop ({
                        ...dragAndDrop,
                        updatedOrder:newList,
                        draggedTo: draggedTo
                    })
                    setDragAndDrop2 ({
                        ...dragAndDrop2,
                        updatedOrder:remainingItems,
                        draggedTo: null
                    })
                }
            }else {
                let newList = list2;
                const draggedFrom = dragAndDrop.draggedFrom; // 드래그 되는 엘리먼트의 처음 인덱스
                const draggedTo  = parseInt(event.currentTarget.dataset.position); //놓을 수 있는 영역의 인덱스(끝)
                // const itemDragged = newList[draggedFrom]// 드래그 겹치는 엘리먼트
                const remainingItems = list.filter((item,index) => index !== draggedFrom) // 드래그하고있는 엘리먼트 빼고 배열목록
                
                newList = [										// 드래그 시작, 끝 인덱스를 활용해 새로운 배열로 반환해줌
                    ...newList.slice(0, draggedTo),
                    // itemDragged,
                    list[draggedFrom],
                    ...newList.slice(draggedTo),
                ];
                if(draggedTo){
                    setDragAndDrop ({
                        ...dragAndDrop,
                        updatedOrder:remainingItems,
                        draggedTo: null
                    })
                    setDragAndDrop2 ({
                        ...dragAndDrop2,
                        updatedOrder:newList,
                        draggedTo: draggedTo
                    })
                }
            }
        }
        
    }
    //드래그 범위를 벗어나면
    const onDragLeave = (event) => {
        console.log('드래그 영역을 벗어남');
        event.currentTarget.classList.remove("over");
        setDragAndDrop({
            ...dragAndDrop,
            draggedTo: null,
        });
        setDragAndDrop2({
            ...dragAndDrop2,
            draggedTo: null,
        });
    };
    //드래그한 엘리먼트를 놓을때
    const onDrop = (event) => {
        console.log('드래그 영역 안에 아이템을 놓음');
                setList(dragAndDrop.updatedOrder); //리스트를 재구성
                setDragAndDrop({//상태 초기화
                ...dragAndDrop,
                draggedFrom: null,
                draggedTo: null,
                });
                setList2(dragAndDrop2.updatedOrder); //리스트를 재구성
                setDragAndDrop2({//상태 초기화
                ...dragAndDrop2,
                draggedFrom: null,
                draggedTo: null,
                });
        
        // setList(dragAndDrop.updatedOrder); //리스트를 재구성
        // setDragAndDrop({//상태 초기화
        //   ...dragAndDrop,
        //   draggedFrom: null,
        //   draggedTo: null,
        // });
    };
    
    // 잡은 Item을 놓았을 때 발생
  const onDragEnd = (event) => {
    console.log('아무영역에 드래그를 놓음');
    event.currentTarget.style.opacity = "1";
        if(currentList === 1){//첫번째 리스트
            let newList = dragAndDrop.originalOrder;
            const draggedFrom = dragAndDrop.draggedFrom; // 드래그 되는 엘리먼트 인덱스
            const remainingItems = newList.filter((item,index) => index !== draggedFrom) // 드래그하고있는 엘리먼트 빼고 배열목록
            const listItens = document.querySelectorAll(".draggable");
            setDragAndDrop(pre =>({
                ...pre,
                updatedOrder:remainingItems
            }
            ))
            // console.log(dragAndDrop.updatedOrder)
                setList(dragAndDrop.draggedTo && event.target.parentElement ? newList : dragAndDrop.updatedOrder); //리스트를 재구성
            listItens.forEach((item) => {
            item.classList.remove("over");
            });
        } else if (currentList === 2){
            let newList = dragAndDrop2.originalOrder;
            const draggedFrom = dragAndDrop2.draggedFrom; // 드래그 되는 엘리먼트 인덱스
            const remainingItems = newList.filter((item,index) => index !== draggedFrom) // 드래그하고있는 엘리먼트 빼고 배열목록
            // console.log(remainingItems);
            const listItems = document.querySelectorAll(".draggable");
            setDragAndDrop2(pre =>({
                ...pre,
                updatedOrder:remainingItems
            }
            ))
            setList2(dragAndDrop2.draggedTo && event.target.parentElement ? newList : dragAndDrop2.updatedOrder); //리스트를 재구성
            listItems.forEach((item) => {
            item.classList.remove("over");
            });
    }
  };
  useEffect(()=>{
    setTotal(list.length + list2.length)
  },[dragAndDrop])
    return (
        <div style={{display:'flex',}}>
            {total}
            <ul>
                {list.map((item, index) => {
                    return (
                    <li
                        style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        }}
                        className="draggable"
                        key={index}			
                        draggable={true} 				//  draggable => true이면 드래그가 가능합니다.
                        data-list={1}
                        data-position={index}			//  dataset에 index값을 주어 선택된 index를 찾을 수 있습니다.
                        onDragStart={onDragStart}		//  ex) event.currentTarget.dataset.position
                        onDragOver={onDragOver}
                        onDragLeave={onDragLeave}
                        onDrop={onDrop}
                        onDragEnter={onDragEnter}
                        onDragEnd={onDragEnd}
                    >
                        <span>{item.emoji}</span>
                        <p>{item.name}</p>
                    </li>
                    );
                })}
            </ul>
            <ul>
                {list2.map((item, index) => {
                    return (
                    <li
                        style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        }}
                        className="draggable"
                        key={index}			
                        draggable={true} 				//  draggable => true이면 드래그가 가능합니다.
                        data-list={2}
                        data-position={index}			//  dataset에 index값을 주어 선택된 index를 찾을 수 있습니다.
                        onDragStart={onDragStart}		//  ex) event.currentTarget.dataset.position
                        onDragOver={onDragOver}
                        onDragLeave={onDragLeave}
                        onDrop={onDrop}
                        onDragEnter={onDragEnter}
                        onDragEnd={onDragEnd}
                    >
                        <span>{item.emoji}</span>
                        <p>{item.name}</p>
                    </li>
                    );
                })}
            </ul>
        </div>
    )
}

export default Drag