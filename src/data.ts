import { TimelineEvent } from './types.js';

/**
 * Static timeline event data
 */
export const timelineEvents: readonly TimelineEvent[] = [
  {
    year: 1969,
    title: "ARPANET - Birth of the Internet",
    description: "ARPANET was the predecessor to the modern internet, first deployed connecting four universities. This groundbreaking network laid the foundation for global digital communication and modern networking protocols.",
    imageURL: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=200&h=150&fit=crop",
    category: "Networking",
    wikipediaURL: "https://en.wikipedia.org/wiki/ARPANET"
  },
  {
    year: 1977,
    title: "Introduction of the First Personal Computer",
    description: "The first personal computer was introduced in 1977, which revolutionized the way people interacted with technology. These early systems made computing accessible to individuals and transformed various industries.",
    imageURL: "https://www.researchgate.net/profile/Jesse-Stein/publication/272146002/figure/fig1/AS:997096035475457@1614737628795/Apple-II-computer-including-disk-drives-and-a-monitor-first-released-in-1977-by-Apple_Q320.jpg",
    category: "Hardware",
    wikipediaURL: "https://en.wikipedia.org/wiki/Personal_computer"
  },
  {
    year: 1981,
    title: "IBM PC Launch",
    description: "IBM launched its personal computer, setting the standard for PC architecture that dominated the industry for decades. Its open architecture encouraged third-party development and widespread adoption, establishing the foundation for modern PC computing.",
    imageURL: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=200&h=150&fit=crop",
    category: "Hardware",
    wikipediaURL: "https://en.wikipedia.org/wiki/IBM_PC"
  },
  {
    year: 1985,
    title: "Microsoft Windows 1.0 Launch",
    description: "Microsoft Windows 1.0 introduced the first graphical user interface from Microsoft, revolutionizing personal computing with point-and-click functionality. This groundbreaking operating system laid the foundation for modern desktop computing and established Microsoft as a dominant force in the software industry.",
    imageURL: "https://geeks.co.uk/wp-content/uploads/2019/11/MicrosoftTeams-image.png",
    category: "Software",
    wikipediaURL: "https://en.wikipedia.org/wiki/Windows_1.0"
  },
  {
    year: 1991,
    title: "World Wide Web Goes Live",
    description: "Tim Berners-Lee's invented the World Wide Web which was made publicly available, leading to the rapid growth of the internet. This invention regularized information and connected the world in unprecedented ways.",
    imageURL: "https://static.vecteezy.com/system/resources/previews/007/629/964/non_2x/world-wide-web-line-icon-vector.jpg",
    category: "Networking",
    wikipediaURL: "https://en.wikipedia.org/wiki/World_Wide_Web"
  },
  {
    year: 2004,
    title: "Facebook is Founded",
    description: "Facebook was launched by Mark Zuckerberg when he was in Harvard University which changed the landscape of social interaction. Facebook grew into a global phenomenon connecting billions of people, influencing culture and communication.",
    imageURL: "https://logowik.com/content/uploads/images/facebook3939.logowik.com.webp",
    category: "Social Media",
    wikipediaURL: "https://en.wikipedia.org/wiki/Facebook"
  }
] as const;