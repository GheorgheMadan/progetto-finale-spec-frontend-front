import { Link } from "react-router-dom";

export default function NotFoundPage() {
    return (
        <div className="not-found-page">
            <h1>404 - Page Not Found</h1>
            <p>Sorry, the page you are looking for does not exist.</p>
            <p>Please check the URL or return to the homepage.</p>
            <button><Link to='/'>Home</Link></button>
        </div>
    );
}