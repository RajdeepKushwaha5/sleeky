import { Panel, PanelContent, PanelHeader, PanelTitle } from "./panel";

type Book = {
  title: string;
  author: string;
};

type BookCategory = {
  label: string;
  books: Book[];
};

const LIBRARY: BookCategory[] = [
  {
    label: "Development / Programming",
    books: [
      {
        title: "The Pragmatic Programmer",
        author: "Andrew Hunt & David Thomas",
      },
      { title: "Clean Code", author: "Robert C. Martin" },
      {
        title: "Designing Data-Intensive Applications",
        author: "Martin Kleppmann",
      },
      { title: "Competitive Programming Handbook", author: "Antti Laaksonen" },
      {
        title: "Introduction to Algorithms",
        author: "Thomas H. Cormen et al.",
      },
      {
        title: "Cracking the Coding Interview",
        author: "Gayle Laakmann McDowell",
      },
      {
        title: "Build a Large Language Model from Scratch",
        author: "Sebastian Raschka",
      },
      { title: "Effective C++", author: "Scott Meyers" },
    ],
  },
  {
    label: "Casual / Self-Growth / Business",
    books: [
      { title: "Zero to One", author: "Peter Thiel" },
      { title: "Steve Jobs", author: "Walter Isaacson" },
      { title: "The Almanack of Naval Ravikant", author: "Eric Jorgenson" },
      { title: "The Subtle Art of Not Giving a F*ck", author: "Mark Manson" },
      { title: "Man's Search for Meaning", author: "Viktor E. Frankl" },
      { title: "Elon Musk", author: "Walter Isaacson" },
      { title: "Eat That Frog!", author: "Brian Tracy" },
    ],
  },
];

export function Library() {
  return (
    <Panel id="library">
      <PanelHeader>
        <PanelTitle>Library</PanelTitle>
      </PanelHeader>

      <PanelContent>
        <div className="flex flex-col gap-8">
          {LIBRARY.map((cat) => (
            <div key={cat.label}>
              {/* Category label */}
              <p className="mb-4 font-mono text-[10px] font-semibold tracking-[0.14em] text-muted-foreground/50 uppercase">
                {cat.label}
              </p>

              {/* Books grid */}
              <div className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
                {cat.books.map((book) => (
                  <div key={book.title} className="flex flex-col gap-0.5">
                    <p className="text-sm leading-snug font-medium text-foreground/85">
                      {book.title}
                    </p>
                    <p className="text-xs text-muted-foreground/50">
                      {book.author}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <p className="font-serif text-xs text-muted-foreground/35 italic">
            *and many more — these are just some of my best reads
          </p>
        </div>
      </PanelContent>
    </Panel>
  );
}
