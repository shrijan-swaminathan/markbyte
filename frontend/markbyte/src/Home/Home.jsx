import './Home.css';
function Home() {
    const name = 'Rishab';
    
    return (
        <div className="home-container">
            {/* Hero Section */}
            <section className="hero">
                <div className="hero-content">
                    <h1>Welcome to MarkByte</h1>
                    <p className="tagline">Where your thoughts find their digital home</p>
                </div>
            </section>

            {/* Personal Greeting */}
            <section className="user-welcome">
                <div className="welcome-card">
                    <h2>Hello, {name}</h2>
                    <p>Ready to start writing?</p>
                    <button className="cta-button">Create New Post</button>
                </div>
            </section>

            {/* Featured Posts Grid */}
            <section className="featured-posts">
                <h3>Your Recent Posts</h3>
                <div className="posts-grid">
                    {/* Post cards would go here */}
                </div>
            </section>
        </div>
    );
}

export default Home;
