import Head from "next/head";
import Image from "next/image";
import { Form, Button, Spinner } from "react-bootstrap";
import styles from "../styles/Home.module.css";
import mainImage from "./../assets/images/main_image.jpg";
import NextGPTImage from "./../assets/images/nextgpt.png";
import NextGPTLogo from "./../assets/images/nextgpt_without_background.png";
import { FormEvent, useState } from "react";

export default function Home() {
  const [quote, setQuote] = useState("");
  const [quoteLoading, setQuoteLoading] = useState(false);
  const [quoteLoadingError, setQuoteLoadingError] = useState(false);
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const prompt = formData.get("prompt")?.toString().trim();

    if (prompt) {
      try {
        setQuote("");
        setQuoteLoadingError(false);
        setQuoteLoading(true);

        const response = await fetch(
          "/api/ask?prompt=" + encodeURIComponent(prompt)
        );
        const body = await response.json();
        setQuote(body.quote);
      } catch (error) {
        console.error(error);
        setQuoteLoadingError(true);
      } finally {
        setQuoteLoading(false);
      }
    }
  }
  return (
    <>
      <Head>
        <title>NextGPT</title>
        <meta name="description" content="Generated by Open AI GPT-3" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="color-scheme" content="only light" />
        <link rel="icon" href="/nextgpt.ico" />
      </Head>
      <main className={styles.main}>
        <h1>
          <Image src={NextGPTLogo} height={70} alt="Logo" /> <b>NextGPT</b>
        </h1>
        <h3>powered by GPT-3</h3>
        <h6>Ask me anything . . . </h6>
        <div className={styles.mainImageContainer}>
          <Image
            src={mainImage}
            fill
            alt="Question NextGPT"
            priority
            className={styles.mainImage}
          />
        </div>
        <Form onSubmit={handleSubmit} className={styles.inputForm}>
          <Form.Group className="mb-3" controlId="prompt-input">
            <Form.Label>Get creative...</Form.Label>
            <Form.Control
              name="prompt"
              placeholder="e.g Tell me a meme on rats "
              maxLength={100}
            />
          </Form.Group>
          <Button type="submit" className="mb-3" disabled={quoteLoading}>
            Brief me . . .
          </Button>
        </Form>
        {quoteLoading && <Spinner animation="border" />}
        {quoteLoadingError && "Something went wrong. Please try again."}
        {quote && <h5>{quote}</h5>}
      </main>
      <footer className="container mx-auto flex justify-center flex-col items-center h-60 gap-10">
        <div>
          <ul className="list-inline">
            <li>
              <a href="https://github.com/Ankush1461/gpt-app">Github Code</a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/ankush-karmakar/">
                My LinkedIn
              </a>
            </li>
          </ul>
        </div>
        <p className="text-sm text-slate-500">
          &copy; 2023{" "}
          <span>
            <Image
              src={NextGPTImage}
              height={60}
              quality={100}
              alt="Logo of NextGPT"
            />
          </span>{" "}
          by Ankush Karmakar. All rights reserved
        </p>
      </footer>
    </>
  );
}
