import "./Sidebar.css";
import { useContext, useEffect } from "react";
import { MyContext } from "./MyContext.jsx";
import { v1 as uuidv1 } from "uuid";

function Sidebar() {

    const {
        allThreads,
        setAllThreads,
        currThreadId,
        setNewChat,
        setPrompt,
        setReply,
        setCurrThreadId,
        setPrevChats
    } = useContext(MyContext);


    /* =========================
       GET ALL THREADS
    ========================= */
    const getAllThreads = async () => {

        const token = localStorage.getItem("token");

        try {

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/thread`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`

                    }
                }
            );

            const res = await response.json();

            const filteredData = res.map(thread => ({
                threadId: thread.threadId,
                title: thread.title
            }));

            setAllThreads(filteredData);

        } catch (err) {
            console.log(err);
        }
    };


    /* =========================
       LOAD THREADS ON START
    ========================= */
    useEffect(() => {
        getAllThreads();
    }, [currThreadId]);



    /* =========================
       CREATE NEW CHAT
    ========================= */
    const createNewChat = () => {

        setNewChat(true);
        setPrompt("");
        setReply(null);

        const newThreadId = uuidv1();
        setCurrThreadId(newThreadId);

        setPrevChats([]);

    };


    /* =========================
       CHANGE THREAD
    ========================= */
    const changeThread = async (newThreadId) => {

        const token = localStorage.getItem("token");

        setCurrThreadId(newThreadId);

        try {

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/thread/${newThreadId}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );

            const res = await response.json();

            setPrevChats(res);

            setNewChat(false);
            setReply(null);

        } catch (err) {
            console.log(err);
        }

    };


    /* =========================
       DELETE THREAD
    ========================= */
    const deleteThread = async (threadId) => {

        const token = localStorage.getItem("token");

        try {

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/thread/${threadId}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const res = await response.json();

            console.log(res);

            setAllThreads(prev =>
                prev.filter(thread => thread.threadId !== threadId)
            );

            if (threadId === currThreadId) {
                createNewChat();
            }

        } catch (err) {
            console.log(err);
        }

    };


    /* =========================
       UI
    ========================= */
    return (

        <section className="sidebar">

            <button onClick={createNewChat}>

                <img
                    src="Frontend/public/logo.png"
                    alt="gpt logo"
                    className="logo"
                />

                <span>
                    <i className="fa-solid fa-pen-to-square"></i>
                </span>

            </button>


            <ul className="history">

                {allThreads?.map((thread, idx) => (

                    <li
                        key={idx}
                        onClick={() => changeThread(thread.threadId)}
                        className={
                            thread.threadId === currThreadId
                                ? "highlighted"
                                : ""
                        }
                    >

                        {thread.title}

                        <i
                            className="fa-solid fa-trash"
                            onClick={(e) => {
                                e.stopPropagation();
                                deleteThread(thread.threadId);
                            }}
                        ></i>

                    </li>

                ))}

            </ul>


            <div className="sign">
                <p>By Manish &hearts;</p>
            </div>

        </section>

    );
}

export default Sidebar;