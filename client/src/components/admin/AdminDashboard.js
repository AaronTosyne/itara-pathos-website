import React, { useState, useEffect } from 'react';
import { LogOut, FileText, Mail, PlusCircle, Edit, Trash2, Eye } from 'lucide-react';
import { postsAPI, contactAPI } from '../../services/api';

const AdminDashboard = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('posts');
  const [posts, setPosts] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState('');

  useEffect(() => {
    const storedToken = localStorage.getItem('adminToken');
    if (storedToken) {
      setToken(storedToken);
      if (activeTab === 'posts') {
        fetchPosts(storedToken);
      } else if (activeTab === 'contacts') {
        fetchContacts(storedToken);
      }
    }
  }, [activeTab]);

  const fetchPosts = async (authToken) => {
    setLoading(true);
    try {
      const response = await postsAPI.getAll();
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchContacts = async (authToken) => {
    setLoading(true);
    try {
      const response = await contactAPI.getAll(authToken);
      setContacts(response.data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePost = async (id) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;

    try {
      await postsAPI.delete(id, token);
      setPosts(posts.filter(post => post._id !== id));
      alert('Post deleted successfully');
    } catch (error) {
      alert('Error deleting post: ' + error.message);
    }
  };

  const handleDeleteContact = async (id) => {
    if (!window.confirm('Are you sure you want to delete this contact submission?')) return;

    try {
      await contactAPI.delete(id, token);
      setContacts(contacts.filter(contact => contact._id !== id));
      alert('Contact submission deleted successfully');
    } catch (error) {
      alert('Error deleting contact: ' + error.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    onLogout();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-slate-900 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Admin Dashboard</h1>
              <p className="text-sm text-cyan-400">Welcome back, {user.username}</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-colors"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('posts')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'posts'
                  ? 'border-cyan-600 text-cyan-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <FileText className="inline mr-2" size={18} />
              Blog Posts
            </button>
            <button
              onClick={() => setActiveTab('contacts')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'contacts'
                  ? 'border-cyan-600 text-cyan-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Mail className="inline mr-2" size={18} />
              Contact Submissions ({contacts.length})
            </button>
          </nav>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'posts' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Blog Posts</h2>
              <button
                onClick={() => setActiveTab('create-post')}
                className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
              >
                <PlusCircle size={18} />
                Create New Post
              </button>
            </div>

            {loading ? (
              <p className="text-center py-12 text-gray-500">Loading posts...</p>
            ) : posts.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg shadow">
                <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-500">No blog posts yet. Create your first post!</p>
              </div>
            ) : (
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Title
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {posts.map((post) => (
                      <tr key={post._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">{post.title}</div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-cyan-100 text-cyan-800">
                            {post.category}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            post.published 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {post.published ? 'Published' : 'Draft'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {new Date(post.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-right text-sm font-medium">
                          <button
                            className="text-red-600 hover:text-red-900 ml-4"
                            onClick={() => handleDeletePost(post._id)}
                          >
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === 'contacts' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Submissions</h2>

            {loading ? (
              <p className="text-center py-12 text-gray-500">Loading contacts...</p>
            ) : contacts.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg shadow">
                <Mail className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-500">No contact submissions yet.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {contacts.map((contact) => (
                  <div key={contact._id} className="bg-white shadow rounded-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{contact.subject}</h3>
                        <p className="text-sm text-gray-500">
                          From: {contact.name} ({contact.email})
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {new Date(contact.createdAt).toLocaleString()}
                        </p>
                      </div>
                      <button
                        onClick={() => handleDeleteContact(contact._id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                    <div className="bg-gray-50 rounded p-4">
                      <p className="text-gray-700 whitespace-pre-wrap">{contact.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'create-post' && (
          <CreatePostForm 
            token={token} 
            onSuccess={() => {
              setActiveTab('posts');
              fetchPosts(token);
            }}
            onCancel={() => setActiveTab('posts')}
          />
        )}
      </main>
    </div>
  );
};

// Create Post Form Component
const CreatePostForm = ({ token, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    featuredImage: '',
    category: 'Security',
    published: true
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleImageUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  // Check file size (max 5MB)
  if (file.size > 5 * 1024 * 1024) {
    alert('Image size should be less than 5MB');
    return;
  }

  // Show loading state
  setImagePreview('uploading');

  try {
    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch('http://localhost:5000/api/upload', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setFormData(prev => ({ ...prev, featuredImage: data.data.url }));
      setImagePreview(data.data.url);
    } else {
      throw new Error(data.error);
    }
  } catch (error) {
    console.error('Upload error:', error);
    alert('Error uploading image: ' + error.message);
    setImagePreview(null);
  }
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    // DEBUG: Log everything
    console.log('=== FORM SUBMIT DEBUG ===');
    console.log('Form Data:', formData);
    console.log('Title:', formData.title);
    console.log('Content:', formData.content);
    console.log('Excerpt:', formData.excerpt);
    console.log('Category:', formData.category);
    console.log('Token:', token);
    console.log('=========================');

    setSubmitting(true);

    try {
      await postsAPI.create(formData, token);
      alert('Post created successfully!');
      onSuccess();
    } catch (error) {
      alert('Error creating post: ' + error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Create New Blog Post</h2>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Title *
          </label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-600"
            placeholder="Enter post title"
          />
        </div>

            <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-600"
            />
            {imagePreview === 'uploading' && (
            <p className="text-sm text-gray-600 mt-2">Uploading image...</p>
            )}
            {imagePreview && imagePreview !== 'uploading' && (
            <div className="mt-4">
                <p className="text-sm text-gray-600 mb-2">Image Preview:</p>
                <img 
                src={imagePreview} 
                alt="Preview" 
                className="max-w-md rounded-lg shadow-lg"
                />
            </div>
            )}     

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Excerpt (Short Summary) *
          </label>
          <textarea
            required
            value={formData.excerpt}
            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
            rows="3"
            maxLength="300"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-600"
            placeholder="Brief summary (max 300 characters)"
          />
          <p className="text-xs text-gray-500 mt-1">{formData.excerpt.length}/300 characters</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category *
          </label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-600"
          >
            <option value="Security">Security</option>
            <option value="Product Development">Product Development</option>
            <option value="Industry Insights">Industry Insights</option>
            <option value="Company News">Company News</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Content *
          </label>
          <textarea
            required
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            rows="15"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-600 font-mono text-sm"
            placeholder="Write your blog post content here. Use double line breaks for paragraphs."
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="published"
            checked={formData.published}
            onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
            className="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-gray-300 rounded"
          />
          <label htmlFor="published" className="ml-2 block text-sm text-gray-900">
            Publish immediately
          </label>
        </div>

        <div className="flex gap-4">
            <button
            type="button"
            onClick={handleSubmit}
            disabled={submitting}
            className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2 rounded-lg disabled:opacity-50"
            >
            {submitting ? 'Creating...' : 'Create Post'}
            </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-lg"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;