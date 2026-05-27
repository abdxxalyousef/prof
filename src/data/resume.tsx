import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";
import { ReactLight } from "@/components/ui/svgs/reactLight";
import { NextjsIconDark } from "@/components/ui/svgs/nextjsIconDark";
import { Typescript } from "@/components/ui/svgs/typescript";
import { Nodejs } from "@/components/ui/svgs/nodejs";
import { Python } from "@/components/ui/svgs/python";
import { Golang } from "@/components/ui/svgs/golang";
import { Postgresql } from "@/components/ui/svgs/postgresql";
import { Docker } from "@/components/ui/svgs/docker";
import { Kubernetes } from "@/components/ui/svgs/kubernetes";
import { Java } from "@/components/ui/svgs/java";
import { Csharp } from "@/components/ui/svgs/csharp";

export const DATA = {
  name: "Abdalrahman Alqashi",
  initials: "DV",
  url: "https://abdalrahman-alqashi.io",
  location: "San Francisco, CA",
  locationLink: "https://www.google.com/maps/place/sanfrancisco",
  description: "Cyber security student in JUST",
  summary:
    "It all started in 9th grade. What began as a simple curiosity grew into a deep passion for understanding systems and how to break into them.\n\nI didn’t just choose Cybersecurity; I fell in love with it. My journey is fueled by solving CTF challenges and uncovering hidden vulnerabilities. My goal is always to find the cracks before anyone else does.\n\nFor me, it’s not just a career—it’s a lifelong passion for learning and a constant challenge to stay one step ahead.",
  avatarUrl: "/me.png",
  skills: [
    { name: "Docker", icon: Docker },
    { name: "Python - Crypto - Data Analysis - LLM Training", icon: Python },
    { name: "C++", icon: Csharp },
    { name: "Assembly", icon: Icons.assembly },
    { name: "Linux", icon: Icons.linux },
  ].map((skill) => ({
    ...skill,
    icon: typeof skill.icon === "function" ? skill.icon : () => null,
  })),
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog", icon: NotebookIcon, label: "Blog" },
  ],
  contact: {
    email: "hello@example.com",
    tel: "+123456789",
    social: {
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/abdalrahman-alqashi/",
        icon: Icons.linkedin,
        navbar: true,
      },
      Instagram: {
        name: "Instagram",
        url: "https://www.instagram.com/abd.alyousef_07/",
        icon: Icons.instagram,
        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "#",
        icon: Icons.email,
        navbar: false,
      },
    },
  },
  work: [
    {
      company: "Atomic Finance",
      href: "https://atomic.finance",
      badges: [],
      location: "Remote",
      title: "Bitcoin Protocol Engineer",
      logoUrl: "/atomic.png",
      start: "May 2021",
      end: "Oct 2022",
      description:
        "Implemented the Bitcoin discreet log contract (DLC) protocol specifications as an open source Typescript SDK. Dockerized all microservices and setup production kubernetes cluster. Architected a data lake using AWS S3 and Athena for historical backtesting of bitcoin trading strategies. Built a mobile app using react native and typescript.",
    },
    {
      company: "Shopify",
      badges: [],
      href: "https://shopify.com",
      location: "Remote",
      title: "Software Engineer",
      logoUrl: "/shopify.svg",
      start: "January 2021",
      end: "April 2021",
      description:
        "Implemented a custom Kubernetes controller in Go to automate the deployment of MySQL and ProxySQL custom resources in order to enable 2,000+ internal developers to instantly deploy their app databases to production. Wrote several scripts in Go to automate MySQL database failovers while maintaining master-slave replication topologies and keeping Zookeeper nodes consistent with changes.",
    },
    {
      company: "Nvidia",
      href: "https://nvidia.com/",
      badges: [],
      location: "Santa Clara, CA",
      title: "Software Engineer",
      logoUrl: "/nvidia.png",
      start: "January 2020",
      end: "April 2020",
      description:
        "Architected and wrote the entire MVP of the GeForce Now Cloud Gaming internal admin and A/B testing dashboard using React, Redux, TypeScript, and Python.",
    },
  ],
  education: [
    {
      school: "Jordan University of Science and Technology",
      href: "https://www.just.edu.jo/",
      degree: "Bachelor's Degree in Cyber Security",
      logoUrl: "/buildspace.jpg",
      start: "2025",
      end: "Now",
    },
    {
      school: "University of Waterloo",
      href: "https://uwaterloo.ca",
      degree: "Bachelor's Degree of Computer Science (BCS)",
      logoUrl: "/waterloo.png",
      start: "2016",
      end: "2021",
    },
    {
      school: "Wilfrid Laurier University",
      href: "https://wlu.ca",
      degree: "Bachelor's Degree of Business Administration (BBA)",
      logoUrl: "/laurier.png",
      start: "2016",
      end: "2021",
    },
    {
      school: "International Baccalaureate",
      href: "https://ibo.org",
      degree: "IB Diploma",
      logoUrl: "/ib.png",
      start: "2012",
      end: "2016",
    },
  ],
  projects: [
    {
      title: "Chat Collect",
      href: "https://chatcollect.com",
      dates: "Jan 2024 - Feb 2024",
      active: true,
      description:
        "With the release of the [OpenAI GPT Store](https://openai.com/blog/introducing-the-gpt-store), I decided to build a SaaS which allows users to collect email addresses from their GPT users. This is a great way to build an audience and monetize your GPT API usage.",
      technologies: [
        "Next.js",
        "Typescript",
        "PostgreSQL",
        "Prisma",
        "TailwindCSS",
        "Stripe",
        "Shadcn UI",
        "Magic UI",
      ],
      links: [
        {
          type: "Website",
          href: "https://chatcollect.com",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "",
      video:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/chat-collect.mp4",
    },
    {
      title: "Magic UI",
      href: "https://magicui.design",
      dates: "June 2023 - Present",
      active: true,
      description:
        "Designed, developed and sold animated UI components for developers.",
      technologies: [
        "Next.js",
        "Typescript",
        "PostgreSQL",
        "Prisma",
        "TailwindCSS",
        "Stripe",
        "Shadcn UI",
        "Magic UI",
      ],
      links: [
        {
          type: "Website",
          href: "https://magicui.design",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/magicuidesign/magicui",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "https://cdn.magicui.design/bento-grid.mp4",
    },
    {
      title: "llm.report",
      href: "https://llm.report",
      dates: "April 2023 - September 2023",
      active: true,
      description:
        "Developed an open-source logging and analytics platform for OpenAI: Log your ChatGPT API requests, analyze costs, and improve your prompts.",
      technologies: [
        "Next.js",
        "Typescript",
        "PostgreSQL",
        "Prisma",
        "TailwindCSS",
        "Shadcn UI",
        "Magic UI",
        "Stripe",
        "Cloudflare Workers",
      ],
      links: [
        {
          type: "Website",
          href: "https://llm.report",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/Abdalrahman Alqashiverma/llm.report",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "https://cdn.llm.report/openai-demo.mp4",
    },
    {
      title: "Automatic Chat",
      href: "https://automatic.chat",
      dates: "April 2023 - March 2024",
      active: true,
      description:
        "Developed an AI Customer Support Chatbot which automatically responds to customer support tickets using the latest GPT models.",
      technologies: [
        "Next.js",
        "Typescript",
        "PostgreSQL",
        "Prisma",
        "TailwindCSS",
        "Shadcn UI",
        "Magic UI",
        "Stripe",
        "Cloudflare Workers",
      ],
      links: [
        {
          type: "Website",
          href: "https://automatic.chat",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "",
      video:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/automatic-chat.mp4",
    },
  ],
  hackathons: [
    {
      title: "Linux Opreation System Basics",
      dates: "November 17th - 23th, 2025",
      image: "/image.png",
      links: [],
    },
    {
      title: "Cyber Security Training (Basics)",
      dates: "November 29th - 30th, 2025",
      image: "/nahnoo.png",
      links: [],
    },
    {
      title: "Pre-Security TryHackme",
      dates: "2nd December 2025",
      icon: "public",
      image: "/pre-sec.png",
      links: [],
    },
    {
      title: "Computer Network Fundementals",
      dates: "11th December 2025",
      image: "/mhtech.png",
      links: [],
    },
    {
      title: "24 Security challenge Finished in 26 Days in Advent Of Cyber 2025 event",
      dates: "1st January 2026",
      image: "/AOC2025.png",
      links: [],
    },
    {
      title: "Integration between artificial intelligence and cybersecurity",
      dates: "January 6th - 16th, 2026",
      subtitle: "As a trainer",
      image: "/AI.png",
      links: [],
    },
    {
      title: "Artificial intelligence in marketing",
      dates: "12th February 2026",
      image: "/AI.png",
      links: [],
    },
    {
      title: "love at first breach 2026 - TryHackMe",
      dates: "25 February 2026",
      subtitle: "10th in the world",
      image: "/10thworld/1.png",
      links: [],
    },
    {
      title: "Intoduction to cyber security from Cisco Networking Academy",
      dates: "17 March 2026",
      image: "/itcys.jpg",
      links: [],
    },
    {
      title: "Certificate of Appreciation - Fundamentals of Cybersecurity",
      dates: "May 19, 2026",
      subtitle: "From JUST's Cybersecurity Department",
      image: "/1779377578309.jpg",
      links: [],
    },
    {
      title: "Certified Strategic OSINT Professional (CSOP)",
      dates: "May 20, 2026",
      image: "/csop.jpg",
      links: [],
    },
  ],
} as const;
