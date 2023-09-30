import "./LandingPage.css"
import MainForm from "./MainForm";

const LandingPage = () => {
    
    return (
        <div id="container">
            <nav>
                <div id="logo">Huj to wie</div>
                <a class="navitem">Wyszukiwarka kierunków</a>
                <a class="navitem">Jak szukać studiów?</a>
                <a class="navitem">Studenci zagraniczni</a>
            </nav>
            <header>
                <div id="content">
                    <span id="title">Znajdź swoje wymarzone studia!</span>
                    <span id="subtitle">Wiemy ile wyzwań niesie ze sobą wybór szkoły średniej, a naszym celem jest ułatwienie Wam tego procesu! </span>
                    <a href="#browser">Wyszukaj</a>
                </div>
            </header>
            <main>
                <MainForm></MainForm>
            </main>
        </div>
    );
}

export default LandingPage;