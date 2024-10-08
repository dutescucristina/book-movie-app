import Container from 'react-bootstrap/Container';

export const Header = () => {
    return (
        <header className="fixed-top navbar-dark bg-success">
            <Container style={{ textAlign: "center" }}>
                <div className="row">
                    <h1 className="text-light">Book a movie</h1>
                </div>
            </Container>
        </header>
    );
}
