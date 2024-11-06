
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';// Import the hooks to get the current location and navigate btw pages
import './Dashboard.css';

// component that represents each individual question and answer
const QuestionItem = ({ question, deleteQuestion }) => {
    const [isOpen, setIsOpen] = useState(false); // State to track if the answer is open / closed

     //  function for toggling whether the answer for a question is shown or hidden.
    const toggleDropdown = () => {
        setIsOpen(!isOpen);  // If it's open, close it; if it's closed, open it
    };

    return (
        <div className="question-item">
            <div className="question-header" onClick={toggleDropdown}>
                <p><strong>Q:</strong> {question.question_text}</p>  {/* Display the question text */}
                <span>{isOpen ? '-' : '+'}</span>   {/* Show '+' to open or '-' to close the answer */}
            </div>
            {isOpen && (   //  is open : display the answer and the delete button
                <div className="question-answer">
                    <p><strong>A:</strong> {question.answer}</p> {/* Display the answer text */}
                    <button onClick={() => deleteQuestion(question.question_id)} className="delete-button">Delete</button>
                </div>
            )}
        </div>
    );
};

// display the list of categories and questions
const Dashboard = () => {
    const navigate = useNavigate();
    const location = useLocation(); // Get the location object(uname)
    const [categories, setCategories] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const username = location.state?.username || 'User';  // useLocation is used to get the username passed through the navigation state

    // Fetching Data :  hook runs the fetchCategories function once when the component mounts.
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                // Fetch categories from the backend API
                const response = await fetch('http://localhost:3003/categories');
                if (response.ok) {
                    const data = await response.json();
                    setCategories(data.categories || []); //Store the categories in the state
                } else {
                    console.error('Failed to fetch categories');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchCategories();
    }, []);

    // Fetching Data: fetchQuestions fetches questions for the selected category when the user clicks on a category button.
    const fetchQuestions = async (categoryId, categoryName) => {
        try {
            // Fetch the questions for a specific category from the backend API
            const response = await fetch(`http://localhost:3003/questions/by-category?categoryId=${categoryId}`);
            const data = await response.json();
            setQuestions(data.questions || []);
            setSelectedCategory(categoryName); // Set the name of the selected category
        } catch (error) {
            console.error('Error fetching questions:', error);
            setQuestions([]); // Clear questions if there’s an error
        }
    };

     // Deleting a Question: sends a DELETE request to remove the question from the backend API.
    const deleteQuestion = async (id) => {
        try {
            // Send DELETE request to remove the question by its ID
            const response = await fetch(`http://localhost:3003/questions/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                // updates state of removed question  ::  Filter out the deleted question from the questions state
                setQuestions(questions.filter((question) => question.question_id !== id));
            } else {
                console.error('Failed to delete question');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // Routing: handleLogout user, redirects to the home page
    const handleLogout = () => {
        navigate('/');
    };

     // Routing: handleNavigateToInsert navigates to the page where users can add a new question
    const handleNavigateToInsert = () => {
        navigate('/insert'); // Navigate to Insert page
    };

    return (
        <div className="dashboard">
            <h2>Welcome, {username}</h2>  {/* Display the username here */}
            <p>Click on a question below to test your knowledge on serial killers.</p>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
        {/* Button to navigate to the page for adding new questions */}
            <button className="add-button" onClick={handleNavigateToInsert}>Add a New Question</button>

            <div className="categories">
                {categories.length > 0 ? (        // Check if there are any categories in the "categories" array
                    categories.map((category) => ( //  map over categ. to create a button for each 
                        <button
                            key={category.category_id} //unique key based on category ID
                            onClick={() => fetchQuestions(category.category_id, category.category_name)}
                            // When the button is clicked, fetch the questions for that category
                            className="category-button" >
                            {category.category_name}
                        </button>
                    ))
                ) : (
                    <p>No categories available. Please add categories first.</p>  // Display a message if there are no categories in the "categories" array
                )}
               
            </div>
            <div className="questions-section">
                {selectedCategory && <h3>Questions for {selectedCategory}</h3>} {/* If a category is selected, display its name */}
                {questions.map((question) => (
                //The QuestionItem:display each individual question and its answer. toggle the answer’s visibility and to delete the question.    
                    <QuestionItem key={question.question_id} question={question} deleteQuestion={deleteQuestion} /> ))}  
            </div>
        </div>
    );
};

export default Dashboard;
