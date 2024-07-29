import React, { useState, useEffect } from 'react';
import './Main.css';
import { FaTruckFast } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

function Main() {
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });
  const [todos, setTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentTodoId, setCurrentTodoId] = useState(null);

  // Fetch todos when the component mounts
  useEffect(() => {
    fetchTodos();
  }, []);

  // API call to fetch todos
  const fetchTodos = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
      setTodos(response.data);
      setFilteredTodos(response.data); // Initialize filteredTodos
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  // Filter todos based on the search term
  const filterTodos = (searchTerm) => {
    if (!searchTerm) {
      setFilteredTodos(todos); // Show all todos if searchTerm is empty
    } else {
      const filtered = todos.filter(todo =>
        todo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        todo.description?.toLowerCase().includes(searchTerm.toLowerCase()) // Check if description exists
      );
      setFilteredTodos(filtered);
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  // API call to add or edit a todo
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentTodoId) {
        // Edit an existing todo
        const response = await axios.put(`https://jsonplaceholder.typicode.com/todos/${currentTodoId}`, formData);
        const updatedTodos = todos.map(todo => todo.id === currentTodoId ? response.data : todo);
        setTodos(updatedTodos);
        setFilteredTodos(updatedTodos); // Update filteredTodos
        setSuccess('Todo updated successfully');
      } else {
        // Add a new todo
        const response = await axios.post('https://jsonplaceholder.typicode.com/todos', formData);
        const newTodos = [response.data, ...todos];
        setTodos(newTodos); // Update todos
        setFilteredTodos(newTodos); // Update filteredTodos
        setSuccess('Todo added successfully');
      }
      setError('');
      setFormData({ title: '', description: '' });
      setCurrentTodoId(null);
    } catch (error) {
      setError('Error processing todo');
      setSuccess('');
    }
  };

  const handleEdit = (todo) => {
    setFormData({ title: todo.title, description: todo.description });
    setCurrentTodoId(todo.id);
  };

  // API call to delete a todo with confirmation using SweetAlert2
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
          const updatedTodos = todos.filter(todo => todo.id !== id);
          setTodos(updatedTodos);
          setFilteredTodos(updatedTodos); // Update filteredTodos
          Swal.fire(
            'Deleted!',
            'Your todo has been deleted.',
            'success'
          );
        } catch (error) {
          console.error('Error deleting todo:', error);
        }
      }
    });
  };

  const handleSearchChange = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);
    filterTodos(searchTerm);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg py-4">
        <div className="container">
          <Link className="navbar-brand" to={'/main'}>To DO <span> <FaTruckFast size={35} /> APP </span> </Link>
          <button className="navbar-toggler" type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup" aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav ms-auto align-items-center">
              <h5 className="me-4 fw-bold">Welcome <span>Mohamed Eldanf</span></h5>
              <Link className="btn btn1 fw-bold" to={'/login'}>LOGOUT</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="main-section">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <section className="basic-header">
                <div className="add-todo card">
                  <h1>Add Todo</h1>
                  {error && <div className="alert alert-danger">{error}</div>}
                  {success && <div className="alert alert-success">{success}</div>}
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="title" className="form-label">Title</label>
                      <input type="text" className="form-control" id="title" value={formData.title} onChange={handleInputChange} aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="description" className="form-label">Description</label>
                      <textarea className="form-control" id="description" value={formData.description} onChange={handleInputChange} rows="3"></textarea>
                    </div>
                    <button type="submit" className="btn w-100">Add Todo</button>
                  </form>
                </div>
              </section>
            </div>

            <div className="col-md-9">
              <section className="basic-header over">
                <div className="add-todo card ">
                  <h1>Todo List</h1>
                  <input
                    type="search"
                    className="form-control"
                    id="searchInput"
                    placeholder="Search by title or description"
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                  <div className="row">
                    {filteredTodos
                      .map((todo) => (
                        <div key={todo.id} className="col-lg-4 col-md-12">
                          <section className="basic-header">
                            <div className="add-todo card dsds">
                              <form>
                                <div className="mb-3">
                                  <label htmlFor={`description-${todo.id}`} className="form-label">{todo.title}</label>
                                  <textarea className="form-control" id={`description-${todo.id}`} value={todo.description} rows="3" readOnly></textarea>
                                </div>
                                <div className="d-flex">
                                  <button type="button" className="btn w-50 me-1" onClick={() => handleEdit(todo)}>Edit</button>
                                  <button type="button" className="btn w-50 ms-1" onClick={() => handleDelete(todo.id)}>Delete</button>
                                </div>
                              </form>
                            </div>
                          </section>
                        </div>
                      ))}
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
