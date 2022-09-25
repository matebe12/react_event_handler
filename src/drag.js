import { useState } from 'react';
import { uuid } from 'uuid/v4';
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
    const [dragAndDrop, setDragAndDrop] = useState({
        draggedFrom: null, //드래그 시작 인덱스
        draggedTo: null, // 변경될 드래그 인덱스
        isDragging: false,
        originalOrder: [],
        updatedOrder: [],
      });
    //드래그 시작
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
    // 드래그 하면서 아이템이 겹칠때
    const onDragOver = (event) => {
        console.log('아이템 들고있을때')
        event.preventDefault();
        let newList = dragAndDrop.originalOrder;
        const draggedFrom = dragAndDrop.draggedFrom; // 드래그 되는 엘리먼트 인덱스
        const draggedTo  = parseInt(event.currentTarget.dataset.position); //놓을 수 있는 영역의 인덱스(끝)
        const itemDragged = newList[draggedFrom]// 드래그 겹치는 엘리먼트
        const remainingItems = newList.filter((item,index) => index !== draggedFrom) // 드래그하고있는 엘리먼트 빼고 배열목록
        newList = [										// 드래그 시작, 끝 인덱스를 활용해 새로운 배열로 반환해줌
            ...remainingItems.slice(0, draggedTo),
            itemDragged,
            ...remainingItems.slice(draggedTo),
        ];
        if(draggedTo !== dragAndDrop.draggedTo){
            setDragAndDrop ({
                ...dragAndDrop,
                updatedOrder:newList,
                draggedTo: draggedTo
            })
        }
    }
    //드래그한 엘리먼트를 놓을때
    const onDrop = (event) => {
        console.log('드래그 영역 안에 아이템을 놓음');
        setList(dragAndDrop.updatedOrder); //리스트를 재구성
        setDragAndDrop({//상태 초기화
          ...dragAndDrop,
          draggedFrom: null,
          draggedTo: null,
        });
    };
    //드래그 범위를 벗어나면
    const onDragLeave = (event) => {
        console.log('드래그 영역을 벗어남');
        event.currentTarget.classList.remove("over");
        setDragAndDrop({
          ...dragAndDrop,
          draggedTo: null,
        });
    };
    // 잡은 Item이 다른 Item이랑 겹쳤을 때 발생<겹쳐졌을 때>
  const onDragEnter = (event) => { 
    console.log('아이템이 다른것과 겹침');
    event.currentTarget.classList.add("over");
  };
  // 잡은 Item을 놓았을 때 발생
  const onDragEnd = (event) => {
    console.log('아무영역에 드래그를 놓음');
    event.currentTarget.style.opacity = "1";
    let newList = dragAndDrop.originalOrder;
    const draggedFrom = dragAndDrop.draggedFrom; // 드래그 되는 엘리먼트 인덱스
    const remainingItems = newList.filter((item,index) => index !== draggedFrom) // 드래그하고있는 엘리먼트 빼고 배열목록
    console.log(remainingItems);
    const listItens = document.querySelectorAll(".draggable");
    setDragAndDrop(pre =>({
        ...pre,
        updatedOrder:remainingItems
    }
    ))
    console.log(dragAndDrop.updatedOrder)
    setList(dragAndDrop.updatedOrder); //리스트를 재구성
    listItens.forEach((item) => {
      item.classList.remove("over");
    });
  };
  const addEmployee = () => {
      const item = {
          emoji: <span>👤</span>,
          name: '새 직원 '+ list.length
      }
      setList([...list, item])


  }
//   useEffect(()=>{
//     setList(dragAndDrop.updatedOrder)
//   },[dragAndDrop.updatedOrder])
    return (
        <>
            <div>
              <h3>  Drag And Drop Study 1 week</h3>
              
            </div>
            <div style={{
                display:'flex',
                justifyContent:'center', 
                alignItems:'center', 
                height:700,
                flexDirection:'column'
            }}>
                <button
                    onClick={() => addEmployee()}
                >새 직원 +</button>
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
        </>
    )
}

export default Drag