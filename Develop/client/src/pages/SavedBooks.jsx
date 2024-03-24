import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import {
  Container,
  Card,
  Button,
  Row,
  Col
} from 'react-bootstrap';

import { GET_ME, REMOVE_BOOK } from '../utils/API';
import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';
import { use } from '../../../server/routes';

const SavedBooks = () => {
  const [userData, setUserData] = useState({});

  // use this to determine if `useEffect()` hook needs to run again
  const userDataLength = Object.keys(userData).length;

  useQuery(() => {
    const { loading, error, data } = useQuery(GET_ME);
    if (data) {
      setUserData(data.me);
    }
  },);

  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const [removeBookMutation] = useMutation(REMOVE_BOOK);
  const handleDeleteBook = async (bookId) => {
    try {
      const { data } = await removeBookMutation({
        variables: { bookId }
      });
      removeBookId(bookId);
      setUserData(data.removeBook);
    } catch (err) {
      console.error(err);
    }
    if (loading) return <h2>LOADING...</h2>;
    if (error) return <h2>ERROR: {error.message}</h2>;

    const userData = data.me;
  }

  return (
    <>
      <div fluid className="text-light bg-dark p-5">
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </div>
      <Container>
        <h2 className='pt-5'>
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${userData.savedBooks.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        <Row>
          {userData.savedBooks.map((book) => {
            return (
              <Col md="4">
                <Card key={book.bookId} border='dark'>
                  {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <p className='small'>Authors: {book.authors}</p>
                    <Card.Text>{book.description}</Card.Text>
                    <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                      Delete this Book!
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SavedBooks;
