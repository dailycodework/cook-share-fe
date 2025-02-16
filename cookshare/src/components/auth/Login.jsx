import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Form, Button } from "react-bootstrap";
import { getUser } from "../services/RecipeService";

const Login = () => {
  const [username, setUsername] = useState();
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setUsername(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (username.trim() === "") {
      setErrorMessage("Please enter or choose a new username");
      return;
    }

    try {
      const response = await getUser(username);

      if (response !== "") {
        const newUsername = window.prompt(
          "Username found! " +
            response +
            '. Please choose another username and click on "OK" if this is not you,  else, click on "Cancel" to continue'
        );

        switch (newUsername) {
          case null:
            // User clicked Cancel
            navigate("/add-recipe", { state: { username } }); // Navigate with original username
            break;

          case "":
            // User entered an empty string
            setErrorMessage("Please enter a valid username.");
            break;

          default:
            // User entered a new username
            navigate("/add-recipe", { state: { username: newUsername } }); // Navigate with new username
            break;
        }
      } else {
        // If no existing user, proceed directly to add recipe form
        navigate("/add-recipe", { state: { username } });
      }
    } catch (error) {
      setErrorMessage("Failed to login: " + error.message);
      console.error(error);
    } finally {
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }
  };

  return (
    <Container className='p-5' style={{ maxWidth: "600px", margin: "0 auto" }}>
      <div className='border p-4'>
        <Form onSubmit={handleSubmit}>
          {errorMessage && <p className='text-danger'>{errorMessage}</p>}
          <Row className='mb-3'>
            <Form.Group controlId='formTitle'>
              <Form.Label className='mb-4'>
                {" "}
                Enter your existing username or choose a new one if you have not
                gotten any.
              </Form.Label>
              <hr />
              <Form.Control
                type='text'
                name='username'
                placeholder='Enter or choose your username to continue'
                value={username}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Row>
          <hr />
          <Button type='submit' variant='outline-secondary'>
            Continue
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default Login;
