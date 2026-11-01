import { FaPlusCircle, FaBookReader, FaUndoAlt } from "react-icons/fa";

const steps = [
  {
    icon: FaPlusCircle,
    title: "Add a Book",
    text: "Share a book from your own shelf so other readers can find it.",
  },
  {
    icon: FaBookReader,
    title: "Borrow a Book",
    text: "Pick any available book and keep it with you for seven days.",
  },
  {
    icon: FaUndoAlt,
    title: "Return a Book",
    text: "Done reading? Return it with one click so the next reader can enjoy it.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-base-200 py-16">
      <div className="mx-auto max-w-6xl px-4 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold">How Borrowing Works</h2>
          <p className="mt-2 opacity-80">Three simple steps, nothing more</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={step.title}
                className="flex h-full flex-col items-center rounded-xl border border-base-300 bg-base-100 p-8 text-center shadow-sm"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-2xl text-primary-content">
                  <Icon />
                </span>
                <p className="mt-4 text-sm font-semibold opacity-60">Step {index + 1}</p>
                <h3 className="mt-1 text-xl font-bold">{step.title}</h3>
                <p className="mt-2 opacity-80">{step.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
