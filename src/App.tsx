import React, { useEffect, useState } from 'react'
import './App.css'

import Navbar from './components/Navbar'
import TodoItem from './components/TodoItem';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setCategories } from './store/categorySlice';
import { setTodos } from './store/todoSlice';
import { Item } from './utils/utils';
import MyInput from './components/MyInput';

const App: React.FC = () => {
  const dispatch = useDispatch();

  const [cat, setCat] = useState<string>("all");
  const [newCat, setNewCat] = useState<string>("");
  const [catError, setCatError] = useState<boolean>(false);

  const [id, setId] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [completed, setCompleted] = useState<boolean>(false);

  const [titleError, setTitleError] = useState<boolean>(false);
  const [descriptionError, setDescriptionError] = useState<boolean>(false);

  const [statusFilter, setStatusFilter] = useState<number>(0);
  const [sort, setSort] = useState<number>(-1);

  const [mode, setMode] = useState<number>(0);

  useEffect(() => {
    getCategories();
    getTodos("all", statusFilter, sort);
  }, [dispatch])

  useEffect(() => {
    getTodos(cat, statusFilter, sort);
  }, [cat, statusFilter, sort])

  const getCategories = () => {
    axios.get(`http://localhost:5000/category`)
      .then(res => {
        dispatch(setCategories(res.data));
      })
  }

  const postCategory = () => {
    if (newCat === "") setCatError(true);
    else {
      const data = {
        title: newCat
      }
      axios.post(`http://localhost:5000/category`, data)
        .then(res => {
          if (res.data === "success") {
            getCategories();
            setNewCat("");
            setCatError(false);
          }
          else alert('Error');
        })
    }
  }

  const getTodos = (c: string, stFilter: number, sortDate: number) => {
    axios.get(`http://localhost:5000/todos/${c}/${stFilter}/${sortDate}`)
      .then(res => {
        dispatch(setTodos(res.data));
      })
  }

  const addTodo = () => {
    if (title !== "" && description !== "") {
      const data = { title, category, description, completed };
      axios.post(`http://localhost:5000/todos`, data)
        .then(res => {
          if (res.data === "success") {
            getTodos(cat, statusFilter, sort);
            setTitle("");
            setDescription("");
            setCategory("");
            setCompleted(false);

            setTitleError(false);
            setDescriptionError(false);

            setMode(0);
          }
          else alert('Error');
        }).catch(err => {
          alert(`Add Todo Item failed`);
          console.log(err.response.data);
        })
    } else {
      if (title === "") setTitleError(true);
      if (description === "") setDescriptionError(true);
    }
  }

  const updateTodo = () => {
    const data = { title, category, description, completed };
    axios.put(`http://localhost:5000/todos/${id}`, data)
      .then(res => {
        if (res.data === "success") {
          getTodos(cat, statusFilter, sort);
          setTitle("");
          setDescription("");
          setCategory("");
          setCompleted(false);

          setTitleError(false);
          setDescriptionError(false);

          setMode(0);
        }
        else alert('Error');
      }).catch(err => {
        alert(`Update Todo Item failed`);
        console.log(err.response.data);
      })
  }

  const deleteTodo = (idx: string) => {
    axios.delete(`http://localhost:5000/todos/${idx}`)
      .then(res => {
        if (res.data === "success") {
          getTodos(cat, statusFilter, sort);

          setId("");
          setTitle("");
          setDescription("");
          setCategory("");
          setCompleted(false);

          setTitleError(false);
          setDescriptionError(false);

          setMode(0);
        }
        else alert('Error');
      }).catch(err => {
        alert(`Delete Todo Item failed`);
        console.log(err.response.data);
      })
  }

  const clickCategory = (c: string) => {
    setCat(c);
    getTodos(c, statusFilter, sort);
  }

  const clickTodoItem = (id: string) => {
    let index: number = todos.findIndex((item: Item) => item.id === id);

    setId(todos[index].id);
    setTitle(todos[index].title);
    setCategory(todos[index].category);
    setDescription(todos[index].description);
    setCompleted(todos[index].completed);

    setMode(2);
  }

  const handleSave = () => {
    if (mode === 1) {
      addTodo();
    } else {
      updateTodo();
    }
  }

  const handleCancel = () => {
    setId("");
    setTitle("");
    setDescription("");
    setCategory("");
    setCompleted(false);

    setTitleError(false);
    setDescriptionError(false);

    setMode(0);
  }

  const handleRemove = (idx: string) => {
    deleteTodo(idx);
  }

  const categories = useSelector((store: any) => store.categories.data);
  const todos = useSelector((store: any) => store.todos.data);

  return (
    <div>
      <Navbar />
      <div className='container'>
        <div className='row'>
          <div className='side-bar'>
            <div className='card'>
              <div className='card-header'>
                <div>Categories</div>
              </div>
              <div className='card-body'>
                <button onClick={() => clickCategory("all")} className='category-item'>All</button>
                {
                  Array.isArray(categories) ? categories.map((item: string, index: number) => <button onClick={() => clickCategory(item)} key={index} className={`category-item ${cat === item && 'category-item-active'}`}>{`${item}`}</button>) : <div className='no-data'>No Categories</div>
                }
              </div>
              <div className='card-footer'>
                <MyInput error={catError} value={newCat} onChange={(e: any) => setNewCat(e.target.value)} className='cat-input' placeholder='New Category' />
                <button onClick={postCategory} className='btn btn-default'>Add</button>
              </div>
            </div>
          </div>
          <div className='mainstage' style={{ width: mode ? '50%' : '80%' }}>
            <div className='card'>
              <div className='card-header'>
                <div>Todos</div>
                <div>
                  <select className='filter-date-input' value={sort} onChange={(e) => setSort(Number(e.target.value))}>
                    {
                      [-1, 1].map((item: number, index: number) => <option value={item} key={index}>{item === 1 ? "New" : "Older"}</option>)
                    }
                  </select>
                  <select className='filter-date-input' value={statusFilter} onChange={(e) => setStatusFilter(Number(e.target.value))}>
                    {
                      ['All', 'Active', 'Completed'].map((item: string, index: number) => <option value={index} key={index}>{item}</option>)
                    }
                  </select>
                  <button className='btn btn-blue' onClick={() => setMode(1)}>+ Add</button>
                </div>
              </div>
              <div className='card-body'>
                {
                  Array.isArray(todos) && todos.length > 0 ? todos.map((item: Item, index: number) => <TodoItem
                    key={index}
                    id={item.id}
                    category={item.category}
                    title={item.title}
                    description={item.description}
                    dueDate={item.dueDate}
                    completed={item.completed}
                    clickTodoItem={clickTodoItem}
                    handleRemove={handleRemove}
                  />) : <div className='no-data'>No Categories</div>
                }
              </div>
            </div>
          </div>
          <div className='right-bar' style={{ width: mode ? '30%' : '0%' }}>
            {
              mode ? <div className='card'>
                <div className='card-header'>
                  <div>{mode === 1 ? "Add" : "Edit"}</div>
                  <div>
                    <button style={{ marginRight: 10 }} className='btn btn-red' onClick={handleSave}>Save</button>
                    <button className='btn btn-default' onClick={handleCancel}>Cancel</button>
                  </div>
                </div>
                <div className='card-body'>
                  <MyInput error={titleError} value={title} onChange={(e: any) => setTitle(e.target.value)} className='input' placeholder='Title' />
                  <MyInput error={descriptionError} value={description} onChange={(e: any) => setDescription(e.target.value)} className='input' placeholder='Description' />
                  <select value={category} onChange={(e) => setCategory(e.target.value)} className='input'>
                    <option value="">&nbsp;</option>
                    {
                      categories.map((item: string, index: number) => <option key={index} value={item}>{item}</option>)
                    }
                  </select>
                  <div className='check'>
                    <input type='checkbox' checked={completed} onChange={(e) => setCompleted(e.target.checked)} />
                    <span>Is Completed?</span>
                  </div>
                </div>
              </div> : null
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
