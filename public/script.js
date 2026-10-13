const questionInput = document.getElementById("question");
const askBtn = document.getElementById("askBtn");
const answer = document.getElementById("answer");

askBtn.addEventListener("click", async () => {

    const question = questionInput.value.trim();

    if (!question) {
        answer.textContent = "Please enter a question.";
        return;
    }

    answer.textContent = "Thinking...";

    try {

        const response = await fetch("http://localhost:5000/ask", {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                question: question
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Something went wrong");
        }

        answer.textContent = data.answer;

    } catch (error) {

        console.error(error);

        answer.textContent =
            "Sorry, something went wrong. Please try again.";
    }
});