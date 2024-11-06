import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Insert.css';

function Insert() { 
    const navigate = useNavigate(); // Hook to navigate between pages
    const [questionText, setQuestionText] = useState(''); 
    const [answer, setAnswer] = useState(''); 
    const [categoryId, setCategoryId] = useState(''); 
    const [categories, setCategories] = useState([]); 

    useEffect(() => {  //hook to fetch the categories from the server when component is rendered
        const fetchCategories = async () => {
            try {
                const response = await fetch('http://localhost:3003/categories'); // Sending a GET request to fetch categories
                if (response.ok) {
                    const data = await response.json();
                    setCategories(data.categories || []); // Update the categories state with the fetched data, if falsy set[](prevents errors w/ undefined data)
                } else {
                    console.error('Failed to fetch categories');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };
        
        fetchCategories();
    }, []); //this effect runs once when the component mounts

    const handleSubmit = async (e) => {   // handleSubmit function is triggered when the form is submitted
        e.preventDefault(); 

        if (!categoryId) {
            alert('Please select a category');
            return; 
        }

        try { 
            // Sending a POST request to add the new question to the server
            const response = await fetch('http://localhost:3003/questions', { 
                method: 'POST', 
                headers: { 
                    'Content-Type': 'application/json', 
                },
                body: JSON.stringify({ 
                    question_text: questionText, 
                    answer: answer, 
                    category_id: categoryId, 
                }),
            });
            if (response.ok) { 
                alert('Question added successfully'); 
                //clear fields
                setQuestionText(''); 
                setAnswer(''); 
                setCategoryId(''); 
            } else { 
                const errorData = await response.json(); 
                alert(`Error: ${errorData.message}`); 
            }
        } catch (error) { 
            console.error('Error:', error); 
        }
    };

    // Function to navigate back to dashboard
    const goToDashboard = () => {
        navigate('/dashboard');
    };

    return (
        <div className="insert-section">
            <div className="header-container">
                <h2 className="section-title">Add a Killer Question</h2>
                <button onClick={goToDashboard} className="dashboard-button">Back to Questions</button>
            </div>
            <form onSubmit={handleSubmit}>
    <input
        type="text"
        placeholder="Enter Question Here"
        value={questionText} // Bind input field to state (questionText)
        onChange={(e) => setQuestionText(e.target.value)} // Update the state when the input value changes
        required/>
    <input
        type="text"
        placeholder="Answer"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        required/>
    <div className="category-container">
        <select
            className="category-select"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)} // Update categoryId state with selected value
            required>
            <option value="" disabled>Select Category</option>
            {/* For each category looped in  array, create an <option> element */}
            {categories.map((category) => (
                //key for react indentifying category, and store value in ID when user selects option
                <option key={category.category_id} value={category.category_id}>
                    {category.category_name} {/*dropdown names*/}
                </option>
            ))}
        </select>
        {/*submit question */ }
        <button type="submit" className="add-question-button">Add Question</button>
      </div>
     </form>
    </div>);
}

export default Insert;
