import './Home.css';
import { CiLogin } from 'react-icons/ci';
import { useNavigate } from 'react-router-dom';
function Home() {
    // Replace this with username fetched from /login endpoint
    const name = 'Rishab';
    const navigate = useNavigate();
    
    return (
        <div className="App">
            <header className="header">
                    <img src="src/assets/MarkByte Logo.jpg" alt="MarkByte Logo" className="page-logo-2" />
                    <button className="login-button" onClick={() => navigate('/login')}>Login &nbsp;<CiLogin /></button>
                    <button className="signup-button" onClick={() => navigate('/signup')}>Sign Up</button>
            </header>
            <div className="home-container">
                <section className="hero">
                    <div className="hero-content">
                        <h1>Welcome to MarkByte</h1>
                        <p className="tagline">Where your thoughts find their digital home</p>
                    </div>
                </section>

                <section className="user-welcome">
                    <div className="welcome-card">
                        <h2>Hello, {name}</h2>
                        <p>Ready to start writing?</p>
                        <button className="cta-button">Create New Post</button>
                    </div>
                </section>

                <section className="featured-posts">
                    <h3>Your Recent Posts</h3>
                    <div className="posts-grid">
                        {/* Post cards would go here */}
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Home;
