import React, { useEffect, useRef, useState } from "react";
import { Card, CardBody, CardFooter, CardHeader, Input } from "reactstrap";
import { chatApi } from "../../../api/utilityApi";

const UserChatWindow = ({ brainName, filesData, height }) => {
	const [userMessage, setUserMessage] = useState("");
	const [typing, setTyping] = useState(false);

	const [files, setFiles] = useState([]);
	const [prevMessages, setPrevMessages] = useState([]);
	useEffect(() => {
		if (filesData) {
			getAllFilesName();
		}
	}, [filesData]);

	const getAllFilesName = async () => {
		var array = [];
		await filesData.map((file) => {
			array.push(file.fileName);
		});
		setFiles(array);
	};

	const [messages, setMessages] = useState([]);
	const chatbotContainerRef = useRef(null);
	const inputRef = useRef(null);

	const scrollToBottom = () => {
		if (chatbotContainerRef.current) {
			chatbotContainerRef.current.scrollTop =
				chatbotContainerRef.current.scrollHeight;
		}
	};

	const result = {};

	for (let i = 0; i < messages.length; i += 2) {
		const userMessage = messages[i]?.message;
		const botMessage = messages[i + 1]?.message;
		result[userMessage] = botMessage;
	}

	const formattedArray = Object.entries(result).map(
		([question, answer]) => `"${question}":"${answer}"`
	);

	useEffect(() => {
		scrollToBottom();
	}, [messages]);

	const words = [
		"Lorem",
		"ipsum",
		"dolor",
		"sit",
		"amet",
		"consectetur",
		"adipiscing",
		"elit",
		"sed",
		"do",
		"eiusmod",
		"tempor",
		"incididunt",
		"ut",
		"labore",
		"et",
		"dolore",
		"magna",
		"aliqua.",
	];

	// Function to generate random paragraph
	function generateRandomParagraph() {
		const paragraphLength = Math.floor(Math.random() * 5) + 1; // Random length from 1 to 5 sentences
		let paragraph = "";

		for (let i = 0; i < paragraphLength; i++) {
			const sentenceLength = Math.floor(Math.random() * 8) + 4; // Random length from 4 to 11 words
			let sentence = "";

			for (let j = 0; j < sentenceLength; j++) {
				const randomWord = words[Math.floor(Math.random() * words.length)];
				sentence += randomWord + " ";
			}

			paragraph += sentence.trim() + ". ";
		}

		return paragraph.trim();
	}

	const handleChatInput = async (e) => {
		e.preventDefault();
		if (userMessage) {
			setTyping(true);
			const newMessage = {
				sender: "user",
				message: userMessage,
			};
			setMessages((messages) => [...messages, newMessage]);
			scrollToBottom();

			const payload = {
				question: userMessage,
				brainName,
				files,
				prevMessages: [],
			};
			// const payload = {
			// 	question: userMessage,
			// 	brainName: props.data.brainName,
			// 	files: [props.data.fileName],
			// 	prevMessages: prevMessages,
			// };
			setUserMessage("");
			await chatApi(payload)
				.then((res) => {
					if (res.success) {
						setMessages((messages) => [
							...messages,
							{ sender: "bot", message: res.data },
						]);
						setPrevMessages((prevMessages) => [
							...prevMessages,
							payload.question,
						]);
						setPrevMessages((prevMessages) => [...prevMessages, res.data]);
					}
					setUserMessage("");
				})
				.catch((e) => console.log(e))
				.finally(() => {
					setTyping(false);
					inputRef.current.focus();
					scrollToBottom();
				});
			// setTimeout(() => {
			//   scrollToBottom();
			//   setMessages((messages) => [
			//     ...messages,
			//     { sender: "bot", message: generateRandomParagraph() },
			//   ]);
			//   setTyping(false);
			//   inputRef.current.focus();
			//   scrollToBottom();
			// }, 1500);
		}
	};

	return (
		<Card className="" style={{ height: height }}>
			<CardHeader className="bg-light w-100">
				<div className="d-flex align-items-center justify-content-between w-100">
					<div>
						<h2>Ask your Twin</h2>
						<p className="text-muted">
							You can ask anything related to content
						</p>
					</div>
					{/* <span
						className="p-2 bg-soft-info rounded-circle d-flex justify-content-center align-items-center"
						style={{ height: "3rem", width: "3rem" }}
					>
						<i class="bx bxs-message-square-dots fs-2 text-info"></i>
					</span> */}
				</div>
			</CardHeader>
			<div
				style={{
					overflowY: "scroll",
					overflowX: "hidden",
					position: "relative",
				}}
				className="p-3 h-100 relative"
				ref={chatbotContainerRef}
			>
				<div className="d-flex justify-content-start w-100 my-3">
					<p
						style={{
							borderRadius: "0px 18px 18px 18px",
							overflowWrap: "break-word",
						}}
						className="bg-soft-info px-3 py-2"
					>
						Hi! Ask me anything about this.
					</p>
				</div>

				{messages?.map((item, i) => {
					if (item.sender === "bot") {
						return (
							<div key={i} className="d-flex justify-content-start w-100 my-3">
								<p
									style={{
										borderRadius: "0px 18px 18px 18px",
										overflowWrap: "break-word",
									}}
									className="bg-soft-info px-3 py-2"
								>
									{item.message}
								</p>
							</div>
						);
					}
					if (item.sender === "user") {
						return (
							<div className="d-flex justify-content-end w-100 my-3">
								<p
									style={{
										borderRadius: "18px 18px 0px 18px",
										overflowWrap: "break-word",
									}}
									className="bg-light px-3 py-2"
								>
									{item.message}
								</p>
							</div>
						);
					}
				})}
				{typing && (
					<div
						className="d-flex justify-content-start w-100 my-3"
						// style={{ position: "absolute", bottom: "0" }}
					>
						<p
							style={{
								borderRadius: "0px 18px 18px 18px",
								overflowWrap: "break-word",
							}}
							className="bg-soft-info px-3 py-2"
						>
							<div class="spinner">
								<div class="bounce1"></div>
								<div class="bounce2"></div>
								<div class="bounce3"></div>
							</div>{" "}
						</p>
					</div>
				)}
			</div>
			<CardFooter className="p-0">
				<form onSubmit={handleChatInput} className="w-100 d-flex gap-2 p-2">
					<input
						type="text"
						placeholder={
							typing ? "Wait for response..." : "Please type your question..."
						}
						className="w-100 p-2 form-control"
						row={4}
						disabled={typing}
						ref={inputRef}
						onChange={(e) => setUserMessage(e.target.value)}
						value={userMessage}
					/>
					<button
						disabled={typing}
						className="btn btn-primary d-flex justify-content-center align-items-center"
					>
						<i class="bx bxs-send fs-2 p-0"></i>
					</button>
				</form>
			</CardFooter>
		</Card>
	);
};

export default UserChatWindow;
