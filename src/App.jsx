import React, { useState } from "react";

const App = () => {
    const [review, setReview] = useState("");
    const [response, setResponse] = useState(null);

    const exampleReviews = [
        { text: "I absolutely loved this movie!", sentiment: "Positive", score: 0.95 },
        { text: "Not what I expected, quite boring.", sentiment: "Negative", score: 0.25 },
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://127.0.0.1:8000/predict/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ review }),  // Match the "review" key expected in backend
            });
            if (!res.ok) {
                throw new Error("Failed to fetch");
            }
            const data = await res.json();
            setResponse(data);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div
            className="h-screen bg-cover flex items-center justify-center"
            style={{
                backgroundImage: "url('https://img.freepik.com/free-photo/people-cinema-watching-movie_23-2151005467.jpg')",
            }}
        >
            <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-lg">
                <h1 className="text-2xl font-bold mb-4 text-center">Sentiment Analysis of Movie Review</h1>
                
                <form onSubmit={handleSubmit} className="mb-4">
                    <textarea
                        className="w-full p-3 border rounded-lg mb-2"
                        placeholder="Enter your movie review here..."
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                    />
                    <button className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                        Analyze Review
                    </button>
                </form>
                
                {response && (
                    <div className="mt-4 p-3 bg-gray-100 rounded-lg text-center">
                        <p><strong>Sentiment:</strong> {response.sentiment}</p>
                        <p><strong>Score:</strong> {response.score}</p>
                    </div>
                )}
                
                <div className="mt-6">
                    <h2 className="text-lg font-semibold mb-2">Example Reviews:</h2>
                    {exampleReviews.map((item, index) => (
                        <div key={index} className="p-3 border-b">
                            <p>{item.text}</p>
                            <p>
                                <strong>Sentiment:</strong> {item.sentiment} | <strong>Score:</strong> {item.score}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default App;
