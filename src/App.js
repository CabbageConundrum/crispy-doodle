import './App.css';

import firebase from './firebase';
import { useEffect, useState } from 'react';



function App() {
  const [books, setBooks] = useState([]);
  const [userInput, setUserInput] = useState('');
  
  useEffect(() => {
    // Here we create a variable that holds a reference to our database
    const dbRef = firebase.database().ref();

    dbRef.on('value', (response) => {

      //here we're creating a variable to store the new user State that we want to introduce to our app (the on/off)
      const newState = [];

      //here is the Variable to hold to store the Response from our Query to our firebase database 
      // .val() is a FIREBASE METHOD to get us the information we want
      const ourData = response.val();

      //the data we have collected is an object so we can iterate through it with a <for in loop>
      for (let key in ourData) {

        //inside the for loop, we push each object to an array we made in dbRef variable with .on METHOD.
        //KEY is the unique Firebase-assigned ID of the book we push in
        //OUR-DATA[KEY] is the associated book title (that we inputted) of the key value 
        newState.push({ key: key, name: ourData[key] });
      }

      //then, we call or setBooks function (from the destructured books useState) and pass in the local array newState
      setBooks(newState);

    
    })
  }, [])
  
  //now, lets make a new Event function that will fire whenever an input is passed into it. it doesnt yet fire
  const handleChange = function(event) {

    //we create a variable that holds the value of our input
    setUserInput(event.target.value);
  }

  const handleClick = function (theHappening) {
    //event.preventDefault prevents the default action: form submission
    theHappening.preventDefault();

    //create a variable that holds our firebase database reference
    const theDatabase = firebase.database().ref();

    //we run a push to the database from whatever value was pulled from the form
    theDatabase.push(userInput);

    //then we reset the string to empty
    setUserInput('');
  }

  //create a function which takes an argumen, which is the id of the db book
  const removeBook = function(x) {
    const moreMufugginData = firebase.database().ref();

    //using the firebase-made methods '.child' and '.remove() we remove the database-node specific to the book ID'
    moreMufugginData.child(x).remove();
  }

  return (
    <div>
      <h1>My Bitchin' Bookshelf</h1>
      <ul>
        {books.map((book) => {
          return (
            //the li key value is 
            <li key = {book.x}>
              <p>{book.name} - {book.key}</p>
               <button onClick={() => removeBook(book.key)}> Remove that bodacious biblio, brah!</button>
           </li>
         ) 
        })}
      </ul>

      <form action='submit'>
        <label htmlFor='newBook'> Add a book to this bitchin' bibliography of balsa-based bombshells!</label>
        <input
          type='text'
          id='newBook'
          onChange={handleChange}
          value={userInput}
        />
        
        {/* run the handleclick function we created when we perform an onclick */}
        <button onClick={handleClick}>Add a book, bro!</button>
      </form>
     
       
   
    </div>
  );
}

export default App;

// <!-- The core Firebase JS SDK is always required and must be listed first -->
// <script src="https://www.gstatic.com/firebasejs/8.3.2/firebase-app.js"></script>

// <!-- TODO: Add SDKs for Firebase products that you want to use
//      https://firebase.google.com/docs/web/setup#available-libraries -->

// <script>
//   // Your web app's Firebase configuration
//   var firebaseConfig = {
//     apiKey: "AIzaSyB43FwHv5hYzZFcXMCI-bU_tIgKkTmxI-Q",
//     authDomain: "bookshelf-12004.firebaseapp.com",
//     projectId: "bookshelf-12004",
//     storageBucket: "bookshelf-12004.appspot.com",
//     messagingSenderId: "643261498494",
//     appId: "1:643261498494:web:0996df5de7eea2f76c842f"
//   };
//   // Initialize Firebase
//   firebase.initializeApp(firebaseConfig);
// </script>
