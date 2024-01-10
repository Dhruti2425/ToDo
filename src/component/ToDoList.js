import { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';

function ToDoList() {

    let [data, setData] = useState([]);

    const [filter, setFilter] = useState('all');

    let count = data.length;

    useEffect(()=>{
        setTimeout(() => {
            let record = JSON.parse(localStorage.getItem('ToDo'));
            if (record == null) {
                setData([]);
            }
            else {
                setData(record);
            }
        }, 500);
    },setData)

    let handleData = (e) => {

        e.preventDefault();

        var obj = {
            task_name: e.target.task_name.value,
            id : Math.round(Math.random()*1000),
            completed : false
        }
        
        let newData = [...data,obj];
        localStorage.setItem('ToDo',JSON.stringify(newData));
        setData(newData);

        e.target.task_name.value = "";

    }

    const checked = (id) => {
      const updatedData = data.map((data) => {
        if (data.id === id) {
          return { ...data, completed: !data.completed };
        }
        return data;
      });
      
      setData(updatedData);
    };

    const filteredData = data.filter((data) => {
      if (filter === 'all') {
        return true;
      } 
      else if (filter === 'completed') {
        return data.completed;
      } 
      else {
        return !data.completed;
      }
    });

    return (
        <div className="todo">
            <h1>THINGS TO DO</h1>.

            <form method='post' onSubmit={(e) => handleData(e)}>
                <input type="text" placeholder="Add New" className="input" name='task_name' />

                <footer>
                    <div className='d-flex align-center justify-between'>
                        <div className='w-2'>
                            <div className='d-flex align-center'>
                                <input type="submit" value="+" className="add-btn" />
                                <FaSearch className='search' />
                                <p> {count} items left</p>
                            </div>
                        </div>
                        <div className='w-2'>
                            <div className='d-flex align-center'>
                                <span className='btn' onClick={() => setFilter('all')}>All</span>
                                <span className='btn' onClick={() => setFilter('active')}>Active</span>
                                <span className='btn' onClick={() => setFilter('completed')}>Completed</span>
                            </div>
                        </div>
                    </div>
                </footer>
            </form>

            <div className='main'>
              {filteredData.map((v, i) => {
                  return (
                      <div className='d-flex align-center data'>
                          <input type='checkbox' checked={v.completed} onChange={() => checked(v.id)} value={v.task_name} /> <span>{v.task_name}</span>
                      </div>
                  )
              })}
            </div>

        </div>
    )
}

export default ToDoList;