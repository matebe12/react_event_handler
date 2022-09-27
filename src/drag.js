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
    }
    // 드래그 하면서 아이템이 겹칠때
    const onDragOver = (event) => {
        console.log('아이템 들고있을때')
    }
    //드래그한 엘리먼트를 놓을때
    const onDrop = (event) => {
        console.log('드래그 영역 안에 아이템을 드랍');
    };
    //드래그 범위를 벗어나면
    const onDragLeave = (event) => {
        console.log('드래그 영역을 벗어남');
    };
    // 잡은 Item이 다른 Item이랑 겹쳤을 때 발생<겹쳐졌을 때>
  const onDragEnter = (event) => { 
    console.log('아이템이 다른것과 겹침');
  };
  // 잡은 Item을 놓았을 때 발생
  const onDragEnd = (event) => {
    console.log('아무영역에 드래그를 놓음');
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