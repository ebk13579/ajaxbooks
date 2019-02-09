import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import DeleteBtn from "../components/DeleteBtn";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";
import API from "../utils/API";

class Books extends Component {
    // Initialize this.state.books as an empty array
    state = {
        books: [],
        title: "",
        author: "",
        synopsis: ""
    };

    // Add code here to get all books from the database and save them to this.state.books

    getAllBooks() {
        API.getBooks().then(result => {
            this.setState({ books: result.data });
        })        
    }

    componentDidMount() {
        this.getAllBooks();
    }

    handleInputChange = event => {
        const { name, value } = event.target;

        this.setState({ [name]: value });
    }

    handleFormSubmit = event => {
        const bookData = {
            title: this.state.title,
            author: this.state.author,
            synopsis: this.state.synopsis
        }

        API.saveBook(bookData).then(result => {
            console.log(result);
        })
    }

    deleteBook = book => {
        API.deleteBook(book).then(result => {
            this.getAllBooks();
        })
    }

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col size="md-6">
                        <Jumbotron>
                            <h1>What Books Should I Read?</h1>
                        </Jumbotron>
                        <form>
                            <Input name="title" placeholder="Title (required)" value={this.state.title} onChange={this.handleInputChange} />
                            <Input name="author" placeholder="Author (required)" value={this.state.author} onChange={this.handleInputChange} />
                            <TextArea name="synopsis" placeholder="Synopsis (Optional)" value={this.state.synopsis} onChange={this.handleInputChange} />
                            <FormBtn onClick={this.handleFormSubmit}>Submit Book</FormBtn>
                        </form>
                    </Col>
                    <Col size="md-6 sm-12">
                        <Jumbotron>
                            <h1>Books On My List</h1>
                        </Jumbotron>
                        {this.state.books.length ? (
                            <List>
                                {this.state.books.map(book => (
                                    <ListItem key={book._id}>
                                        <a href={"/books/" + book._id}>
                                            <strong>
                                                {book.title} by {book.author}
                                            </strong>
                                        </a>
                                        <DeleteBtn onClick={() => this.deleteBook(book._id)} />
                                    </ListItem>
                                ))}
                            </List>
                        ) : (
                                <h3>No Results to Display</h3>
                            )}
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Books;
