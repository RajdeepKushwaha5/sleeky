import type { Testimonial } from "../types/testimonials";

export const TESTIMONIALS_1: Testimonial[] = [
  {
    handle: "@manan78796",
    avatar: "https://unavatar.io/twitter/manan78796",
    displayName: "Manan Vala",
    bio: "Twitter User",
    url: "https://x.com/manan78796",
    content: "I really liked your portfolio. Amazing!",
  },
  {
    handle: "Umair Manzoor",
    avatar: "https://ui-avatars.com/api/?name=Umair+Manzoor&background=random",
    displayName: "Umair Manzoor",
    bio: "Game Developer",
    url: "https://www.linkedin.com/in/umair-manzoor/?lipi=urn%3Ali%3Apage%3Ad_flagship3_people_connections%3BW0ym3cR3S7OizmhAftmOZA%3D%3D",
    content:
      "Hey, Hope you are ballin, Actually I saw this portfolio site and I love it. How did you achieve it? I'm a game developer but It looks good and has theme I want.",
  },
];

export const TESTIMONIALS_2: Testimonial[] = [
  {
    handle: "@infysoubhagya",
    avatar: "https://unavatar.io/twitter/infysoubhagya",
    displayName: "Soubhagya Adhikary",
    bio: "Twitter User",
    url: "https://x.com/infysoubhagya",
    content: "Crazy dude 🔥",
  },
  {
    handle: "@ZuhaibHanfi",
    avatar:
      "https://unavatar.io/twitter/ZuhaibHanfi?fallback=https://ui-avatars.com/api/?name=Hanfi.jsx&background=random",
    displayName: "Hanfi.jsx",
    bio: "Twitter User",
    url: "https://x.com/ZuhaibHanfi",
    content: "Finally I found #1 Congrats bro you've put such great efforts 🙌🏻",
  },
];

export const TESTIMONIALS: Testimonial[] = [
  ...TESTIMONIALS_1,
  ...TESTIMONIALS_2,
];
