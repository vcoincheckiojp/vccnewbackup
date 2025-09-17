import { 
  Star,
  MessageSquare,
  Heart
} from 'lucide-react';

export const mockUserData = {
  id: 1,
  name: 'Alex Chen',
  email: 'alex.chen@example.com',
  avatar: '',
  role: 'community_moderator',
  joinDate: '2023-01-15',
  location: 'San Francisco, CA',
  bio: 'Blockchain enthusiast and DeFi researcher. Passionate about Cardano ecosystem and decentralized finance innovations.',
  website: 'https://alexchen.dev',
  twitter: '@alexchen_dev',
  github: 'alexchen-dev',
  stats: {
    contributingScore: 2850,
    totalReviews: 47,
    threadsCreated: 23,
    commentsPosted: 156,
    helpfulVotes: 342,
    profileViews: 1247,
    articlesWritten: 8,
    eventsAttended: 12
  },
  badges: [
    { name: 'Community Moderator', type: 'role', color: 'bg-blue-500' },
    { name: 'Top Contributor', type: 'achievement', color: 'bg-yellow-500' },
    { name: 'Expert Reviewer', type: 'achievement', color: 'bg-green-500' },
    { name: 'Early Adopter', type: 'special', color: 'bg-purple-500' },
    { name: 'DeFi Specialist', type: 'expertise', color: 'bg-red-500' }
  ],
  recentReviews: [
    {
      id: 1,
      projectName: 'SundaeSwap',
      rating: 4.5,
      date: '2024-01-20',
      excerpt: 'Excellent DEX with innovative AMM implementation on Cardano...',
      likes: 23,
      type: 'Expert Review'
    },
    {
      id: 2,
      projectName: 'Minswap',
      rating: 4.2,
      date: '2024-01-18',
      excerpt: 'Solid fundamentals and good liquidity provision mechanisms...',
      likes: 18,
      type: 'Advanced Review'
    },
    {
      id: 3,
      projectName: 'WingRiders',
      rating: 3.8,
      date: '2024-01-15',
      excerpt: 'Good project with room for improvement in user experience...',
      likes: 12,
      type: 'Basic Review'
    }
  ],
  followedProjects: [
    {
      id: 1,
      name: 'SundaeSwap',
      category: 'DEX',
      score: 1350,
      change: '+2.5%',
      image: 'https://images.unsplash.com/photo-1639603683079-7398c604497a?w=100&h=100&fit=crop',
      following: true
    },
    {
      id: 2,
      name: 'Minswap',
      category: 'DEX',
      score: 1280,
      change: '+1.8%',
      image: 'https://images.unsplash.com/photo-1640340434855-6084b1f4901c?w=100&h=100&fit=crop',
      following: true
    },
    {
      id: 3,
      name: 'Cardano',
      category: 'Blockchain',
      score: 1450,
      change: '+3.2%',
      image: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=100&h=100&fit=crop',
      following: true
    },
    {
      id: 4,
      name: 'IOHK',
      category: 'Development',
      score: 1380,
      change: '-0.5%',
      image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=100&h=100&fit=crop',
      following: true
    }
  ],
  recentActivity: [
    {
      type: 'review',
      action: 'Published a review for',
      target: 'SundaeSwap',
      date: '2 hours ago',
      icon: Star
    },
    {
      type: 'thread',
      action: 'Created a new thread',
      target: 'DeFi Protocol Comparison',
      date: '1 day ago',
      icon: MessageSquare
    },
    {
      type: 'comment',
      action: 'Commented on',
      target: 'Cardano Smart Contracts',
      date: '2 days ago',
      icon: MessageSquare
    },
    {
      type: 'follow',
      action: 'Started following',
      target: 'WingRiders',
      date: '3 days ago',
      icon: Heart
    }
  ],
  mySubmissions: [
    {
      id: 1,
      name: 'ADA Yield Farm',
      category: 'DeFi',
      status: 'approved',
      submittedDate: '2024-01-10',
      reviewDate: '2024-01-15',
      score: 1250,
      description: 'A decentralized yield farming protocol built on Cardano blockchain with innovative staking mechanisms.',
      feedback: 'Excellent project with strong fundamentals and innovative approach.',
      image: 'https://images.unsplash.com/photo-1639603683079-7398c604497a?w=100&h=100&fit=crop'
    },
    {
      id: 2,
      name: 'Cardano NFT Marketplace',
      category: 'NFT',
      status: 'pending',
      submittedDate: '2024-01-20',
      reviewDate: null,
      score: null,
      description: 'A comprehensive NFT marketplace specifically designed for Cardano ecosystem with advanced trading features.',
      feedback: null,
      image: 'https://images.unsplash.com/photo-1640340434855-6084b1f4901c?w=100&h=100&fit=crop'
    },
    {
      id: 3,
      name: 'Smart Contract Auditor',
      category: 'Security',
      status: 'revision_needed',
      submittedDate: '2024-01-05',
      reviewDate: '2024-01-12',
      score: null,
      description: 'An automated smart contract auditing tool for Cardano Plutus contracts.',
      feedback: 'Project needs more technical documentation and security analysis.',
      image: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=100&h=100&fit=crop'
    },
    {
      id: 4,
      name: 'DeFi Analytics Dashboard',
      category: 'Analytics',
      status: 'approved',
      submittedDate: '2023-12-15',
      reviewDate: '2023-12-22',
      score: 1420,
      description: 'Real-time analytics dashboard for DeFi protocols on Cardano with advanced charting capabilities.',
      feedback: 'Outstanding project with great potential for the ecosystem.',
      image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=100&h=100&fit=crop'
    }
  ]
};
