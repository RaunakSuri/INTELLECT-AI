import { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function App() {
  const [prompt, setPrompt] = useState("");
  const [answer, setAnswer] = useState("");
  const [submittedPrompt, setSubmittedPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const suggestions = [
    {
      number: "01",
      title: "Understand a concept",
      description: "Get clear explanations of complex topics.",
      prompt:
        "Explain how artificial intelligence works in simple terms.",
    },
    {
      number: "02",
      title: "Write better code",
      description: "Solve programming problems and debug code.",
      prompt:
        "Explain async and await in JavaScript with examples.",
    },
    {
      number: "03",
      title: "Explore new ideas",
      description: "Brainstorm projects and creative solutions.",
      prompt:
        "Suggest five innovative full-stack project ideas for developers.",
    },
    {
      number: "04",
      title: "Learn something new",
      description: "Build knowledge one step at a time.",
      prompt:
        "Create a practical roadmap for learning Node.js and Express.",
    },
  ];

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    const question = prompt.trim();

    if (!question || loading) return;

    setLoading(true);
    setError("");
    setAnswer("");
    setSubmittedPrompt(question);

    try {
      const res = await axios.post("/api/ask", {
        prompt: question,
      });

      if (res.data.success) {
        setAnswer(res.data.answer || "No answer was generated.");
      } else {
        setError(
          res.data.message || "Unable to generate a response."
        );
      }
    } catch (err) {
      console.error("Error occurred:", err);

      setError(
        err.response?.data?.message ||
          "Unable to connect to Intellect AI. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleNewChat = () => {
    setPrompt("");
    setAnswer("");
    setSubmittedPrompt("");
    setError("");
  };

  const handleSuggestion = (suggestion) => {
    setPrompt(suggestion);
  };

  const showWelcome = !submittedPrompt && !loading && !error;

  return (
    <div className="min-h-screen bg-[#101211] text-[#e8ebe8] selection:bg-[#527d6b]/40">
      <header className="sticky top-0 z-20 border-b border-white/[0.07] bg-[#101211]/95 backdrop-blur-md">
        <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-5 sm:px-8">
          <button
            onClick={handleNewChat}
            className="flex items-center gap-3"
            aria-label="Start a new chat"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#dce9df] text-[#18271f]">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-6 w-6"
                aria-hidden="true"
              >
                <path
                  d="M12 3L19 7V15L12 21L5 15V7L12 3Z"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 14L12 8L15 14M10 12H14"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div className="text-left">
              <div className="text-[15px] font-semibold tracking-tight text-white">
                Intellect<span className="text-[#8bb49a]"> AI</span>
              </div>
              <div className="mt-0.5 text-[10px] tracking-[0.16em] text-[#858b86]">
                YOUR AI ASSISTANT
              </div>
            </div>
          </button>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 text-xs text-[#a1a8a2] sm:flex">
              <span className="h-1.5 w-1.5 rounded-full bg-[#83b894]" />
              Ready to help
            </div>

            <button
              onClick={handleNewChat}
              className="rounded-lg border border-white/[0.12] px-3.5 py-2 text-xs font-medium text-[#d3d8d3] transition hover:border-white/25 hover:bg-white/[0.04] sm:text-sm"
            >
              New chat
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto flex min-h-[calc(100vh-72px)] w-full max-w-5xl flex-col px-5 sm:px-8">
        <section className="flex flex-1 flex-col">
          {showWelcome ? (
            <div className="flex flex-1 flex-col justify-center py-12 sm:py-16">
              <div className="mx-auto w-full max-w-3xl">
                <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#8bb49a]/20 bg-[#8bb49a]/[0.06] px-3 py-1.5 text-[11px] font-medium tracking-wide text-[#a8c7b0]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#8bb49a]" />
                  A little clarity goes a long way
                </div>

                <h1 className="max-w-2xl text-4xl font-medium leading-[1.15] tracking-[-0.04em] text-[#f0f2ef] sm:text-5xl lg:text-[58px]">
                  What would you
                  <br />
                  like to{" "}
                  <span className="text-[#8bb49a]">figure out?</span>
                </h1>

                <p className="mt-5 max-w-xl text-sm leading-7 text-[#a0a7a0] sm:text-base">
                  From understanding difficult concepts to building your next
                  project, start with a question and work through it together.
                </p>

                <div className="mt-12">
                  <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-[#c0c6c0]">
                      Get started
                    </h2>
                    <span className="text-xs text-[#717972]">
                      Choose a starting point
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {suggestions.map((item) => (
                      <button
                        key={item.number}
                        type="button"
                        onClick={() => handleSuggestion(item.prompt)}
                        className="group rounded-xl border border-white/[0.09] bg-[#171a18] p-5 text-left transition duration-200 hover:border-[#8bb49a]/40 hover:bg-[#1b211d]"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="text-sm font-medium text-[#e4e8e3]">
                              {item.title}
                            </h3>

                            <p className="mt-2 text-xs leading-6 text-[#929a93]">
                              {item.description}
                            </p>
                          </div>

                          <span className="text-xs font-medium tabular-nums text-[#747e76] transition group-hover:text-[#a8c7b0]">
                            {item.number}
                          </span>
                        </div>

                        <div className="mt-5 flex items-center justify-between border-t border-white/[0.06] pt-3">
                          <span className="text-[11px] text-[#8f9990]">
                            Use suggestion
                          </span>

                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            className="h-4 w-4 text-[#7c887e] transition group-hover:translate-x-0.5 group-hover:text-[#a8c7b0]"
                            aria-hidden="true"
                          >
                            <path
                              d="M5 12H19M12 5L19 12L12 19"
                              stroke="currentColor"
                              strokeWidth="1.6"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] text-[#7e867f]">
                  <span className="flex items-center gap-2">
                    <span className="text-[#8bb49a]">✓</span>
                    Explanations that make sense
                  </span>

                  <span className="flex items-center gap-2">
                    <span className="text-[#8bb49a]">✓</span>
                    Help with coding
                  </span>

                  <span className="flex items-center gap-2">
                    <span className="text-[#8bb49a]">✓</span>
                    Ideas worth exploring
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="mx-auto w-full max-w-3xl flex-1 py-10 sm:py-14">
              <div className="mb-10 flex justify-end">
                <div className="max-w-[90%] rounded-2xl rounded-br-md border border-white/[0.09] bg-[#1b201c] px-4 py-3.5 text-sm leading-7 text-[#e4e8e3] sm:max-w-[80%] sm:px-5">
                  <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#8bb49a]">
                    You
                  </p>
                  {submittedPrompt}
                </div>
              </div>

              <div className="flex items-start gap-3 sm:gap-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#8bb49a]/20 bg-[#8bb49a]/10 text-[#a8c7b0]">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-5 w-5"
                    aria-hidden="true"
                  >
                    <path
                      d="M12 3L19 7V15L12 21L5 15V7L12 3Z"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9 14L12 8L15 14M10 12H14"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                <div className="min-w-0 flex-1 pt-1">
                  <div className="mb-5 flex items-center gap-2">
                    <span className="text-sm font-semibold text-[#e8ebe8]">
                      Intellect AI
                    </span>
                    <span className="text-xs text-[#788078]">
                      · Assistant
                    </span>
                  </div>

                  {loading ? (
                    <div className="space-y-4 py-2">
                      <div className="flex items-center gap-3 text-sm text-[#a0a7a0]">
                        <div className="flex gap-1.5">
                          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#8bb49a]" />
                          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#8bb49a] [animation-delay:150ms]" />
                          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#8bb49a] [animation-delay:300ms]" />
                        </div>
                        Working on your answer
                      </div>

                      <div className="h-3 w-[90%] animate-pulse rounded bg-white/[0.05]" />
                      <div className="h-3 w-[76%] animate-pulse rounded bg-white/[0.05]" />
                      <div className="h-3 w-[62%] animate-pulse rounded bg-white/[0.05]" />
                    </div>
                  ) : error ? (
                    <div
                      role="alert"
                      className="rounded-lg border border-red-400/20 bg-red-400/[0.05] p-4 text-sm leading-6 text-red-300"
                    >
                      <p>{error}</p>

                      <button
                        type="button"
                        onClick={() => {
                          setError("");
                          setPrompt(submittedPrompt);
                        }}
                        className="mt-3 text-xs font-medium underline underline-offset-4"
                      >
                        Try again
                      </button>
                    </div>
                  ) : (
                    <div className="markdown-content break-words text-sm leading-7 text-[#c8cec8] sm:text-[15px]">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          h1: ({ children }) => (
                            <h1 className="mb-4 mt-8 text-2xl font-semibold tracking-tight text-[#f0f2ef] first:mt-0">
                              {children}
                            </h1>
                          ),
                          h2: ({ children }) => (
                            <h2 className="mb-3 mt-8 border-b border-white/[0.08] pb-2 text-xl font-semibold text-[#e8ebe8]">
                              {children}
                            </h2>
                          ),
                          h3: ({ children }) => (
                            <h3 className="mb-2 mt-6 text-base font-semibold text-[#b9d0be]">
                              {children}
                            </h3>
                          ),
                          p: ({ children }) => (
                            <p className="mb-4 leading-7 text-[#c8cec8]">
                              {children}
                            </p>
                          ),
                          ul: ({ children }) => (
                            <ul className="mb-5 ml-5 list-disc space-y-2 marker:text-[#8bb49a]">
                              {children}
                            </ul>
                          ),
                          ol: ({ children }) => (
                            <ol className="mb-5 ml-5 list-decimal space-y-2 marker:text-[#8bb49a]">
                              {children}
                            </ol>
                          ),
                          li: ({ children }) => (
                            <li className="pl-1 leading-7">{children}</li>
                          ),
                          strong: ({ children }) => (
                            <strong className="font-semibold text-[#f0f2ef]">
                              {children}
                            </strong>
                          ),
                          blockquote: ({ children }) => (
                            <blockquote className="my-5 border-l-2 border-[#8bb49a]/60 pl-4 text-[#aab3ab]">
                              {children}
                            </blockquote>
                          ),
                          a: ({ href, children }) => (
                            <a
                              href={href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#a8c7b0] underline decoration-[#8bb49a]/30 underline-offset-4 hover:text-[#d0e3d4]"
                            >
                              {children}
                            </a>
                          ),
                          hr: () => (
                            <hr className="my-7 border-white/[0.09]" />
                          ),
                          table: ({ children }) => (
                            <div className="my-5 overflow-x-auto rounded-lg border border-white/[0.09]">
                              <table className="w-full border-collapse text-left text-sm">
                                {children}
                              </table>
                            </div>
                          ),
                          th: ({ children }) => (
                            <th className="border-b border-white/[0.09] bg-white/[0.035] px-4 py-3 font-semibold text-[#e8ebe8]">
                              {children}
                            </th>
                          ),
                          td: ({ children }) => (
                            <td className="border-b border-white/[0.06] px-4 py-3 text-[#c8cec8]">
                              {children}
                            </td>
                          ),
                          code: ({ children, className }) => {
                            const isBlock = Boolean(className);

                            return isBlock ? (
                              <code className="block font-mono text-[13px] leading-6 text-[#c4d9c9]">
                                {children}
                              </code>
                            ) : (
                              <code className="rounded bg-[#8bb49a]/10 px-1.5 py-0.5 font-mono text-[0.9em] text-[#b9d0be]">
                                {children}
                              </code>
                            );
                          },
                          pre: ({ children }) => (
                            <pre className="my-5 overflow-x-auto rounded-xl border border-white/[0.09] bg-[#0b0d0c] p-4">
                              {children}
                            </pre>
                          ),
                        }}
                      >
                        {answer}
                      </ReactMarkdown>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </section>

        <footer className="sticky bottom-0 z-10 mt-auto bg-gradient-to-t from-[#101211] via-[#101211] to-transparent pb-4 pt-5 sm:pb-6">
          <form
            onSubmit={handleOnSubmit}
            className="mx-auto w-full max-w-3xl"
          >
            <div className="rounded-2xl border border-white/[0.12] bg-[#191c1a] transition focus-within:border-[#8bb49a]/50">
              <textarea
                rows={2}
                value={prompt}
                onChange={(event) => setPrompt(event.target.value)}
                onKeyDown={(event) => {
                  if (
                    event.key === "Enter" &&
                    !event.shiftKey &&
                    !event.nativeEvent.isComposing
                  ) {
                    event.preventDefault();
                    event.currentTarget.form?.requestSubmit();
                  }
                }}
                placeholder="Ask Intellect anything..."
                disabled={loading}
                aria-label="Your message"
                className="max-h-40 min-h-[58px] w-full resize-y bg-transparent px-4 py-4 text-sm leading-6 text-[#eef0ed] outline-none placeholder:text-[#777f78] disabled:opacity-60 sm:px-5"
              />

              <div className="flex items-center justify-between border-t border-white/[0.07] px-3 py-2.5 sm:px-4">
                <div className="flex items-center gap-2 text-[10px] text-[#8a928b] sm:text-xs">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-4 w-4 text-[#8bb49a]"
                    aria-hidden="true"
                  >
                    <path
                      d="M12 3L19 7V15L12 21L5 15V7L12 3Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>Powered by Gemini</span>
                  <span className="hidden sm:inline">·</span>
                  <span className="hidden sm:inline">
                    Enter to send
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={loading || !prompt.trim()}
                  className="flex items-center gap-2 rounded-lg bg-[#dce9df] px-4 py-2.5 text-xs font-semibold text-[#18271f] transition hover:bg-[#c6ddcc] disabled:cursor-not-allowed disabled:opacity-40 sm:px-5 sm:text-sm"
                >
                  {loading ? (
                    <>
                      <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-[#18271f]/25 border-t-[#18271f]" />
                      Thinking
                    </>
                  ) : (
                    <>
                      Send
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        className="h-4 w-4"
                        aria-hidden="true"
                      >
                        <path
                          d="M5 12H19M12 5L19 12L12 19"
                          stroke="currentColor"
                          strokeWidth="1.7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </div>

            <p className="mt-3 text-center text-[10px] text-[#737b74] sm:text-[11px]">
              Intellect AI can make mistakes. Verify important information.
            </p>
          </form>
        </footer>
      </main>
    </div>
  );
}

export default App;
