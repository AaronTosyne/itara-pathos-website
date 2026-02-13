import React, { useState, useEffect } from 'react';
import { Shield, Lock, Globe, ChevronRight, Mail, Phone, MapPin, Menu, X, Code, Users, Target, Award } from 'lucide-react';
import { postsAPI, contactAPI } from './services/api';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const [adminUser, setAdminUser] = useState(null);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  // Scroll to top when page changes
useEffect(() => {
  window.scrollTo(0, 0);
}, [currentPage, selectedPost]);

  // Fetch blog posts when component mounts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await postsAPI.getAll();
        setBlogPosts(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError('Failed to load blog posts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Check for existing admin session
  useEffect(() => {
    const storedToken = localStorage.getItem('adminToken');
    const storedUser = localStorage.getItem('adminUser');
    
    if (storedToken && storedUser) {
      setAdminUser(JSON.parse(storedUser));
      setIsAdminLoggedIn(true);
    }
  }, []);

  // Secret admin access shortcut (Ctrl+Shift+A)
useEffect(() => {
  const handleKeyPress = (e) => {
    // Ctrl+Shift+A or Cmd+Shift+A (Mac)
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'A') {
      e.preventDefault();
      setCurrentPage('admin');
    }
  };

  window.addEventListener('keydown', handleKeyPress);
  return () => window.removeEventListener('keydown', handleKeyPress);
}, []);

// Handle direct URL access to admin
useEffect(() => {
  const currentHash = window.location.hash.substring(1); // Remove the #
  if (currentHash === 'admin' || currentHash === 'admin-dashboard') {
    setCurrentPage('admin');
  }
}, []);
 
  // Handle Admin Logout
  const handleAdminLogin = (userData) => {
  setAdminUser(userData);
  setIsAdminLoggedIn(true);
  setCurrentPage('admin-dashboard');
};

  const handleAdminLogout = () => {
  setAdminUser(null);
  setIsAdminLoggedIn(false);
  setCurrentPage('home');
};

  const navigation = [
    { name: 'Home', id: 'home' },
    { name: 'About Us', id: 'about' },
    { name: 'Projects', id: 'projects' },
    { name: 'Blog', id: 'blog' },
    { name: 'Contact', id: 'contact' },
  ];

  const NavigationBar = () => (
    <nav className="bg-slate-900 text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => {
            setCurrentPage('home');
            setSelectedPost(null);
          }}>
            <img src="/logo.png" alt="Itara Pathos IT Logo" className="h-24 w-24 object-contain" />
            <div>
              <h1 className="text-xl font-bold">Itara Pathos IT</h1>
              <p className="text-xs text-cyan-400">Providing a secure internet</p>
            </div>
          </div>
          
          <div className="hidden md:flex space-x-8">
            {navigation.map(item => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentPage(item.id);
                  if (item.id === 'blog') {
                    setSelectedPost(null);
                  }
                }}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentPage === item.id 
                    ? 'bg-cyan-600 text-white' 
                    : 'text-gray-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>

          <button 
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-800">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigation.map(item => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentPage(item.id);
                  setMobileMenuOpen(false);
                  if (item.id === 'blog') {
                    setSelectedPost(null);
                  }
                }}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                  currentPage === item.id 
                    ? 'bg-cyan-600 text-white' 
                    : 'text-gray-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );

  const HomePage = () => {
    if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-cyan-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold mb-6">Securing Africa's Digital Future</h1>
              <p className="text-xl text-gray-300 mb-8">
                Itara Pathos IT Nig Ltd builds secure applications and products that protect users across the continent. We believe in creating technology that empowers people without compromising their safety.
              </p>
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => setCurrentPage('projects')}
                  className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors"
                >
                  View Our Projects <ChevronRight size={20} />
                </button>
                <button 
                  onClick={() => setCurrentPage('contact')}
                  className="bg-transparent border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-slate-900 px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Get In Touch
                </button>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="bg-slate-800 p-8 rounded-lg shadow-2xl border border-cyan-600">
                <Shield className="h-32 w-32 text-cyan-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-center mb-2">Security First</h3>
                <p className="text-gray-400 text-center">Every product we build puts user protection at the core</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-slate-900">What We Offer</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <Lock className="h-12 w-12 text-cyan-600 mb-4" />
              <h3 className="text-xl font-bold mb-3 text-slate-900">Secure Applications</h3>
              <p className="text-gray-600">
                We develop applications with security built into every layer, protecting your data and your users from threats.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <Globe className="h-12 w-12 text-cyan-600 mb-4" />
              <h3 className="text-xl font-bold mb-3 text-slate-900">Web Solutions</h3>
              <p className="text-gray-600">
                Custom web platforms designed for the African market, combining global standards with local understanding.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <Code className="h-12 w-12 text-cyan-600 mb-4" />
              <h3 className="text-xl font-bold mb-3 text-slate-900">Technical Consulting</h3>
              <p className="text-gray-600">
                Expert guidance on security architecture, development practices, and technology strategy for your business.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Featured Project: Sellam Online</h2>
              <p className="text-gray-300 mb-4">
                Our flagship marketplace platform brings trust back to online transactions. Sellam Online provides a secure space for Africans to buy and sell used products without fear of fraud or deception.
              </p>
              <p className="text-gray-300 mb-6">
                With built-in verification, escrow protection, and community reviews, Sellam Online represents our commitment to creating safer digital experiences.
              </p>
              <button 
                onClick={() => setCurrentPage('projects')}
                className="text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-2"
              >
                Learn More About Sellam Online <ChevronRight size={20} />
              </button>
            </div>
            <div className="bg-gradient-to-br from-cyan-600 to-cyan-800 p-8 rounded-lg shadow-xl">
              <div className="text-center">
                <img src="/sellamonlinelogo2.png" alt="Sellam Online logo" className="h-24px w-24px text-white mx-auto mb-4 opacity-90" />
                <h3 className="text-2xl font-bold mb-2">Coming Soon</h3>
                <p className="text-cyan-100">A new standard for secure online commerce in Africa</p>
              </div>
            </div>
          </div>
        </div>
      </section>

  <section className="py-16 bg-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid md:grid-cols-2 gap-12 items-center">
      <div>
        <h2 className="text-3xl font-bold mb-6">Latest from Our Blog</h2>
        {blogPosts.length > 0 ? (
          <>
            <h3 className="text-2xl font-semibold mb-4 text-cyan-400">
              {blogPosts[0].title}
            </h3>
            <p className="text-cyan-300 mb-4">
              {blogPosts[0].excerpt}
            </p>
            <p className="text-gray-400 text-sm mb-6">
              {new Date(blogPosts[0].createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
              <button 
                onClick={() => {
                  setSelectedPost(blogPosts[0]);
                  setCurrentPage('blog-detail');
                }}
                className="text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-2"
              >
                Read Full Article <ChevronRight size={20} />
              </button>
          </>
        ) : (
          <p className="text-gray-300">Loading latest posts...</p>
        )}
      </div>
      <div className="bg-gradient-to-br from-cyan-600 to-cyan-800 p-8 rounded-lg shadow-xl">
        <div className="text-center">
          <Shield className="h-24 w-24 text-white mx-auto mb-4 opacity-90" />
          <h3 className="text-2xl font-bold mb-2">Sellam Online</h3>
          <p className="text-cyan-100">A new standard for secure online commerce in Africa</p>
        </div>
      </div>
    </div>
  </div>
</section>
    </div>
  )
};

  const AboutPage = () => (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8 text-slate-900">About Itara Pathos IT Nig Ltd</h1>
        
        <div className="prose max-w-none mb-12">
          <p className="text-lg text-gray-700 mb-6">
            Itara Pathos IT Nig Ltd was founded on a simple belief: Africans deserve digital products that protect them rather than exploit them. In an era where data breaches and online fraud have become commonplace, we are building technology that puts security first.
          </p>
          <p className="text-lg text-gray-700 mb-6">
            Based in Nigeria, we understand the unique challenges facing African internet users. From payment fraud to identity theft, the digital landscape can be hostile. Our mission is to change that by creating applications and platforms that prioritize user safety without sacrificing functionality or ease of use.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="text-center p-6 bg-slate-50 rounded-lg">
            <Target className="h-12 w-12 text-cyan-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-3 text-slate-900">Our Mission</h3>
            <p className="text-gray-600">
              To provide secure, reliable digital solutions that empower African businesses and individuals to thrive online.
            </p>
          </div>
          <div className="text-center p-6 bg-slate-50 rounded-lg">
            <Users className="h-12 w-12 text-cyan-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-3 text-slate-900">Our Values</h3>
            <p className="text-gray-600">
              Security, transparency, and user trust guide every decision we make and every line of code we write.
            </p>
          </div>
          <div className="text-center p-6 bg-slate-50 rounded-lg">
            <Award className="h-12 w-12 text-cyan-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-3 text-slate-900">Our Commitment</h3>
            <p className="text-gray-600">
              Building products that stand the test of time, with security and privacy as non-negotiable features.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-slate-900 to-cyan-900 text-white p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Why Security Matters</h2>
          <p className="text-gray-300 mb-4">
            Africa's digital economy is growing faster than anywhere else in the world. But this growth has attracted criminals and fraudsters who exploit weak security measures. We have seen too many businesses fail and too many individuals lose money because the platforms they trusted did not prioritize protection.
          </p>
          <p className="text-gray-300">
            At Itara Pathos IT, we are changing this narrative. Every product we release undergoes rigorous security testing. Every feature is designed with privacy in mind. We are not just building apps; we are building trust.
          </p>
        </div>
      </div>
    </div>
  );

  const ProjectsPage = () => (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8 text-slate-900">Our Projects</h1>
        
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="md:flex">
            <div className="md:w-1/3 bg-gradient-to-br from-cyan-600 to-cyan-800 p-12 flex items-center justify-center">
              <a href="www.sellamonline.com"><img src="/sellamonlinelogo2.png" alt="Sellam Online logo" className="h-24px w-24px text-white mx-auto mb-4 opacity-90" /></a>
            </div>
            <div className="md:w-2/3 p-8">
              <div className="flex items-center gap-3 mb-4">
                <a href="www.sellamonline.com"><h2 className="text-3xl font-bold text-slate-900">Sellam Online</h2></a>
                <span className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-semibold">
                  Coming Soon
                </span>
              </div>
              <p className="text-gray-700 mb-6 text-lg">
                A secure marketplace platform designed specifically for the African market. Sellam Online allows users to buy and sell used products with confidence, protected by advanced verification systems and fraud prevention measures.
              </p>
              
              <h3 className="text-xl font-bold mb-3 text-slate-900">Key Features</h3>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-2 text-gray-700">
                  <ChevronRight className="h-5 w-5 text-cyan-600 mt-0.5 flex-shrink-0" />
                  <span>Identity verification for all sellers to prevent fraud</span>
                </li>
                <li className="flex items-start gap-2 text-gray-700">
                  <ChevronRight className="h-5 w-5 text-cyan-600 mt-0.5 flex-shrink-0" />
                  <span>Escrow payment system that protects both buyers and sellers</span>
                </li>
                <li className="flex items-start gap-2 text-gray-700">
                  <ChevronRight className="h-5 w-5 text-cyan-600 mt-0.5 flex-shrink-0" />
                  <span>Community rating and review system to build trust</span>
                </li>
                <li className="flex items-start gap-2 text-gray-700">
                  <ChevronRight className="h-5 w-5 text-cyan-600 mt-0.5 flex-shrink-0" />
                  <span>Encrypted messaging to protect user privacy</span>
                </li>
                <li className="flex items-start gap-2 text-gray-700">
                  <ChevronRight className="h-5 w-5 text-cyan-600 mt-0.5 flex-shrink-0" />
                  <span>Mobile-first design optimized for African internet speeds</span>
                </li>
              </ul>

              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                <p className="text-gray-700">
                  <strong className="text-slate-900">Launch Timeline:</strong> We are currently in the final stages of security testing and user experience refinement. Sellam Online will launch in Q2 2026.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-cyan-900 text-white p-8 rounded-lg text-center">
          <h3 className="text-2xl font-bold mb-4">More Projects Coming Soon</h3>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Sellam Online is just the beginning. We have several other security-focused products in development that will continue to raise the standard for digital safety in Africa.
          </p>
        </div>
      </div>
    </div>
  );

  const BlogPage = () => {
  if (loading) {
    return (
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-8 text-slate-900">Blog</h1>
          <p className="text-xl text-gray-600 mb-12">
            Insights on security, technology, and building better digital products for Africa.
          </p>
          <div className="text-center py-12">
            <p className="text-gray-500">Loading blog posts...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-8 text-slate-900">Blog</h1>
          <div className="text-center py-12">
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (blogPosts.length === 0) {
    return (
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-8 text-slate-900">Blog</h1>
          <p className="text-xl text-gray-600 mb-12">
            Insights on security, technology, and building better digital products for Africa.
          </p>
          <div className="text-center py-12">
            <p className="text-gray-500">No blog posts yet. Check back soon!</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8 text-slate-900">Blog</h1>
        <p className="text-xl text-gray-600 mb-12">
          Insights on security, technology, and building better digital products for Africa.
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article key={post._id} className="bg-gray-50 rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-cyan-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {post.category}
                  </span>
                  <span className="text-sm text-gray-500">
                    {new Date(post.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900">{post.title}</h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <button
                    onClick={() => {
                      setSelectedPost(post);
                      setCurrentPage('blog-detail');
                    }}
                    className="text-cyan-600 hover:text-cyan-700 font-semibold flex items-center gap-1"
                  >
                    Read More <ChevronRight size={16} />
                  </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

  const ContactPage = () => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      subject: '',
      message: ''
    });

    const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
  if (!formData.name || !formData.email || !formData.subject || !formData.message) {
    alert('Please fill in all fields');
    return;
  }

  try {
    setSubmitting(true);
    await contactAPI.submit(formData);
    alert('Thank you for your message. We will get back to you soon!');
    setFormData({ name: '', email: '', subject: '', message: '' });
  } catch (err) {
    console.error('Error submitting form:', err);
    alert('There was an error submitting your message. Please try again.');
  } finally {
    setSubmitting(false);
  }
  };

    return (
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-8 text-slate-900">Contact Us</h1>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold mb-6 text-slate-900">Get In Touch</h2>
              <p className="text-gray-700 mb-8">
                Have questions about our products or services? Want to discuss a potential partnership? We would love to hear from you.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Mail className="h-6 w-6 text-cyan-600 mt-1" />
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">Email</h3>
                    <p className="text-gray-600">itarapathos@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="h-6 w-6 text-cyan-600 mt-1" />
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">Phone</h3>
                    <p className="text-gray-600">+234 816 6435 844</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 text-cyan-600 mt-1" />
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">Location</h3>
                    <p className="text-gray-600">Lagos, Nigeria</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div>
                <div className="mb-4">
                  <label className="block text-slate-900 font-semibold mb-2">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-600"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-slate-900 font-semibold mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-600"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-slate-900 font-semibold mb-2">Subject</label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-600"
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-slate-900 font-semibold mb-2">Message</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    rows="5"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-600"
                  ></textarea>
                </div>
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                  {submitting ? 'Sending...' : 'Send Message'}
                  </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const Footer = () => (
    <footer className="bg-slate-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img src="/logo.png" alt="Itara Pathos IT Logo" className="h-24 w-24 object-contain" />
              <div>
                <h3 className="font-bold text-lg">Itara Pathos IT</h3>
                <p className="text-xs text-cyan-400">Providing a secure internet</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm">
              Building secure digital solutions for Africa's future.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><button onClick={() => setCurrentPage('home')} className="hover:text-cyan-400">Home</button></li>
              <li><button onClick={() => setCurrentPage('about')} className="hover:text-cyan-400">About Us</button></li>
              <li><button onClick={() => setCurrentPage('projects')} className="hover:text-cyan-400">Projects</button></li>
              <li><button onClick={() => setCurrentPage('blog')} className="hover:text-cyan-400">Blog</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Our Services</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>Dev. Secure Applications</li>
              <li>Web Solutions</li>
              <li>Technical Consulting</li>
              <li>Security Audits</li>
              <li>AI Solutions</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>Lagos, Nigeria</li>
              <li>itarapathos@gmail.com</li>
              <li>+234 816 643 5844</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; 2026 Itara Pathos IT Nig Ltd. All rights reserved.</p>
          {/* Hidden admin link - looks like a dot */}
          <button 
            onClick={() => setCurrentPage('admin')}
            className="text-slate-800 hover:text-cyan-400 text-xs mt-2"
            aria-label="Admin"
          >
            •
          </button>
        </div>
      </div>
    </footer>
  );

const BlogPostDetail = ({ post }) => {
  return (
    <div className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <button
          onClick={() => {
            setSelectedPost(null);
            setCurrentPage('blog');
          }}
          className="flex items-center gap-2 text-cyan-600 hover:text-cyan-700 mb-8 font-semibold"
        >
          <ChevronRight className="rotate-180" size={20} />
          Back to Blog
        </button>

        {/* Category and Date */}
        <div className="flex items-center gap-3 mb-4">
          <span className="bg-cyan-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
            {post.category}
          </span>
          <span className="text-gray-500">
            {new Date(post.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">
          {post.title}
        </h1>

        {/* Author */}
        <p className="text-gray-600 mb-8">
          By {post.author || 'Itara Pathos IT'}
        </p>

        {/* Divider */}
        <hr className="border-gray-200 mb-8" />

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          {post.content.split('\n\n').map((paragraph, index) => {
            // Skip empty paragraphs
            if (!paragraph.trim()) return null;
            
            return (
              <p key={index} className="mb-6 text-gray-700 text-lg leading-relaxed">
                {paragraph}
              </p>
            );
          })}
        </div>

        {/* Divider */}
        <hr className="border-gray-200 mt-12 mb-8" />

        {/* Back to blog button */}
        <div className="text-center">
          <button
            onClick={() => {
              setSelectedPost(null);
              setCurrentPage('blog');
            }}
            className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-lg font-semibold inline-flex items-center gap-2"
          >
            <ChevronRight className="rotate-180" size={20} />
            Back to All Posts
          </button>
        </div>
      </div>
    </div>
  );
};  

const renderPage = () => {
  switch(currentPage) {
    case 'home': return <HomePage />;
    case 'about': return <AboutPage />;
    case 'projects': return <ProjectsPage />;
    case 'blog': return <BlogPage />;
    case 'blog-detail': return selectedPost ? <BlogPostDetail post={selectedPost} /> : <BlogPage />;
    case 'contact': return <ContactPage />;
    case 'admin': 
      return isAdminLoggedIn 
        ? <AdminDashboard user={adminUser} onLogout={handleAdminLogout} />
        : <AdminLogin onLogin={handleAdminLogin} />;
    case 'admin-dashboard':
      return isAdminLoggedIn 
        ? <AdminDashboard user={adminUser} onLogout={handleAdminLogout} />
        : <AdminLogin onLogin={handleAdminLogin} />;
    default: return <HomePage />;
  }
};

  return (
    <div className="min-h-screen bg-white">
      <NavigationBar />
      {renderPage()}
      <Footer />
    </div>
  );
};

export default App;