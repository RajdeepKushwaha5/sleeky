import type { User } from "@/features/profile/types/user";

export const USER: User = {
  firstName: "Rajdeep",
  lastName: "Singh",
  displayName: "Rajdeep Singh",
  username: "rajdeepkushwaha5",
  gender: "male",
  pronouns: "he/him",
  bio: "Passionate about bridging creativity and functionality. Full Stack Web Developer & Blockchain Developer.",
  flipSentences: [
    "Passionate about bridging creativity and functionality.",
    "Full Stack Web Developer & Blockchain Developer",
    "MERN Stack & Blockchain Expert",
  ],
  address: "Jaipur, India", // Update with your location
  phoneNumber: "KzkxICoqKioqNjIzMzE=", // Update with your phone number (base64 encoded) - 5 digits hidden
  email: "cmFqZGVlcHNpbmdoMTA3ODlAZ21haWwuY29t", // Update with your email (base64 encoded)
  website: "https://rajdeep-singh.vercel.app", // Update with your website URL
  coverImage: "/assets/cover-image.png", // Add your cover image path here
  jobTitle: "Full Stack Web Developer & Blockchain Developer", // Update with your job title
  jobs: [
    {
      title: "freelancing",
      company: "Self-Employed",
      website: "https://rajdeep-singh.vercel.app",
    },
    // Add more jobs as needed
  ],
  about: `
Hi, I'm Rajdeep Singh 👋
Full Stack Web Developer & Blockchain Developer

Passionate about bridging creativity and functionality. I design and build modern, responsive, and scalable web applications from the ground up.

With a solid foundation in both front-end and back-end development, I specialize in delivering clean code, seamless user experiences, and production-ready solutions. My expertise spans across the MERN stack to the depths of blockchain technologies like Ethereum and Solana.

I'm driven by the thrill of building real-world applications, constantly learning emerging technologies, and contributing to impactful digital experiences. Whether it's a real-time chat app, an e-commerce platform, or a decentralized application (dApp), I love turning ideas into reliable products.
  `,
  avatar: "https://github.com/RajdeepKushwaha5.png", // Update with your avatar URL
  ogImage: "https://yourwebsite.com/og-image.png", // Update with your OG image URL
  namePronunciationUrl: "/audio/rajdeep.mp3", // Update with your name pronunciation audio
  keywords: [
    "rajdeep",
    "rajdeepsingh",
    "rjdp",
    "fullstack",
    "webdeveloper",
    "blockchain",
    "ethereum",
    "solana",
    "mern",
    "react",
    "nodejs",
    "dapp",
    "developer",
    // Add your relevant keywords
  ],
  dateCreated: "2023-10-20", // Update with your portfolio creation date
};
