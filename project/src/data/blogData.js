const blogs = [
  {
    id: 1,
    title: "The Future of Web Development in 2025",
    slug: "future-of-web-development-2025",
    excerpt: "Discover the latest trends and technologies shaping the future of web development and how they'll impact your work.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel tincidunt dapibus, nisl nisl aliquam nisl, eu aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel tincidunt dapibus, nisl nisl aliquam nisl, eu aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel tincidunt dapibus, nisl nisl aliquam nisl, eu aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel tincidunt dapibus, nisl nisl aliquam nisl, eu aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel tincidunt dapibus, nisl nisl aliquam nisl, eu aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel tincidunt dapibus, nisl nisl aliquam nisl, eu aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel tincidunt dapibus, nisl nisl aliquam nisl, eu aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel tincidunt dapibus, nisl nisl aliquam nisl, eu aliquam nisl nisl sit amet nisl.",
    category: "Technology",
    tags: ["Web Development", "Future", "Technology"],
    author: {
      name: "Jane Smith",
      avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    date: "2025-02-15",
    readTime: 8,
    coverImage: "https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    isFeatured: true
  },
  {
    id: 2,
    title: "Mastering React Hooks: A Comprehensive Guide",
    slug: "mastering-react-hooks-comprehensive-guide",
    excerpt: "Learn how to leverage the power of React Hooks to write cleaner, more efficient code and build better applications.",
    content: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.",
    category: "React",
    tags: ["React", "JavaScript", "Hooks", "Frontend"],
    author: {
      name: "Mark Johnson",
      avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    date: "2025-01-28",
    readTime: 12,
    coverImage: "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    isFeatured: true
  },
  {
    id: 3,
    title: "Designing for Accessibility: Best Practices",
    slug: "designing-for-accessibility-best-practices",
    excerpt: "Explore essential accessibility principles that every designer and developer should know to create inclusive digital experiences.",
    content: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.",
    category: "Design",
    tags: ["Accessibility", "UX", "Design", "Inclusion"],
    author: {
      name: "Sarah Lee",
      avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    date: "2025-01-20",
    readTime: 9,
    coverImage: "https://images.pexels.com/photos/3888151/pexels-photo-3888151.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    isFeatured: false
  },
  {
    id: 4,
    title: "Building High-Performance APIs with Node.js",
    slug: "building-high-performance-apis-nodejs",
    excerpt: "Discover proven strategies and techniques to optimize your Node.js APIs for maximum performance and scalability.",
    content: "Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.",
    category: "Backend",
    tags: ["Node.js", "API", "Performance", "Backend"],
    author: {
      name: "David Chen",
      avatar: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    date: "2025-01-12",
    readTime: 15,
    coverImage: "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    isFeatured: false
  },
  {
    id: 5,
    title: "The Psychology of User Experience Design",
    slug: "psychology-of-user-experience-design",
    excerpt: "Learn how understanding human psychology can help you create more intuitive, enjoyable, and effective user experiences.",
    content: "Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.",
    category: "UX",
    tags: ["UX", "Psychology", "Design", "User Research"],
    author: {
      name: "Lisa Wong",
      avatar: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    date: "2025-01-05",
    readTime: 10,
    coverImage: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    isFeatured: false
  },
  {
    id: 6,
    title: "Introduction to Web Animation with Framer Motion",
    slug: "introduction-web-animation-framer-motion",
    excerpt: "Get started with Framer Motion, a powerful library for creating beautiful animations in React applications.",
    content: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
    category: "Animation",
    tags: ["Framer Motion", "Animation", "React", "UI"],
    author: {
      name: "Alex Turner",
      avatar: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    date: "2024-12-28",
    readTime: 7,
    coverImage: "https://images.pexels.com/photos/2047905/pexels-photo-2047905.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    isFeatured: false
  }
];

export default blogs;