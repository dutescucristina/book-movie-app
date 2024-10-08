import { Container } from "react-bootstrap";

export const Footer = () => {
    return (
        <footer className="fixed-bottom navbar-dark bg-secondary justify-content-center">
            <Container style={{ textAlign: "center" }}>
                <h4 className="text-light">Copyright © 2024 Cristina Dutescu. </h4>
            </Container>
        </footer>
    );
}
