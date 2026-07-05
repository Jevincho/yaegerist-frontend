import React, { useState, useEffect } from 'react';
import '../styles/DiscussionForum.css';
import { API } from "../config/api";
import { socket } from "../config/socket";

const DiscussionForum = ({ studentData }) => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: '', content: '', category: 'matematika' });
  const [selectedPost, setSelectedPost] = useState(null);
  const [newReply, setNewReply] = useState('');
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  const getToken = () => localStorage.getItem("token");
  const isAdmin = localStorage.getItem("role") === "admin";

  const loadPosts = () => {
    setLoading(true);
    fetch(API.forumPosts, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
      .then(res => res.json())
      .then(data => {
        setPosts(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  const loadPostDetail = (postId) => {
    fetch(`${API.forumPosts}/${postId}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
      .then(res => res.json())
      .then(data => setSelectedPost(data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    loadPosts();

    // Listener global: ada post baru dibuat orang lain -> refresh daftar
    const handleNewPost = () => loadPosts();

    // Listener global: statistik post berubah (reply/upvote) -> refresh daftar biar angka update
    const handleStatsUpdated = () => loadPosts();

    // Listener global: post dihapus admin -> refresh daftar
    const handlePostRemoved = () => loadPosts();

    socket.on("forum_new_post", handleNewPost);
    socket.on("forum_stats_updated", handleStatsUpdated);
    socket.on("forum_post_removed", handlePostRemoved);

    return () => {
      socket.off("forum_new_post", handleNewPost);
      socket.off("forum_stats_updated", handleStatsUpdated);
      socket.off("forum_post_removed", handlePostRemoved);
    };
  }, []);

  // Join/leave room khusus saat buka/tutup detail post
  useEffect(() => {
    if (!selectedPost) return;

    const postId = selectedPost.id;
    socket.emit("join_post", postId);

    // Listener: post yang sedang dibuka ini di-update (reply/upvote baru)
    const handlePostUpdated = (updatedPost) => {
      if (updatedPost.id === postId) {
        setSelectedPost(updatedPost);
      }
    };

    // Listener: post yang sedang dibuka ini dihapus admin
    const handlePostDeleted = (data) => {
      if (data.postId == postId) {
        alert("Post ini telah dihapus oleh admin");
        setSelectedPost(null);
      }
    };

    socket.on("forum_post_updated", handlePostUpdated);
    socket.on("forum_post_deleted", handlePostDeleted);

    return () => {
      socket.emit("leave_post", postId);
      socket.off("forum_post_updated", handlePostUpdated);
      socket.off("forum_post_deleted", handlePostDeleted);
    };
  }, [selectedPost?.id]);

  const createPost = () => {
    if (!newPost.title.trim() || !newPost.content.trim()) {
      alert('Judul dan konten tidak boleh kosong!');
      return;
    }

    fetch(API.forumPosts, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`
      },
      body: JSON.stringify(newPost)
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setNewPost({ title: '', content: '', category: 'matematika' });
          loadPosts();
        } else {
          alert(data.message || 'Gagal membuat post');
        }
      })
      .catch(err => console.error(err));
  };

  const upvotePost = (postId) => {
    fetch(`${API.forumPosts}/${postId}/upvote`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (!data.success) {
          alert(data.message);
        }
        // Tidak perlu manual reload di sini, socket event akan handle update
      })
      .catch(err => console.error(err));
  };

  const addReply = (postId) => {
    if (!newReply.trim()) return;

    fetch(`${API.forumPosts}/${postId}/replies`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`
      },
      body: JSON.stringify({ content: newReply })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setNewReply('');
          // Tidak perlu manual reload, socket event akan update selectedPost otomatis
        } else {
          alert(data.message || 'Gagal mengirim jawaban');
        }
      })
      .catch(err => console.error(err));
  };

  const upvoteReply = (postId, replyId) => {
    fetch(`${API.forumReplies}/${replyId}/upvote`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (!data.success) {
          alert(data.message);
        }
      })
      .catch(err => console.error(err));
  };

  const deletePost = (postId) => {
    if (!window.confirm("Yakin ingin menghapus post ini?")) return;

    fetch(`${API.forumPosts}/${postId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setSelectedPost(null);
          loadPosts();
        } else {
          alert(data.message);
        }
      })
      .catch(err => console.error(err));
  };

  const deleteReply = (postId, replyId) => {
    if (!window.confirm("Yakin ingin menghapus jawaban ini?")) return;

    fetch(`${API.forumReplies}/${replyId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (!data.success) {
          alert(data.message);
        }
        // Tidak perlu manual reload, socket event akan update selectedPost otomatis
      })
      .catch(err => console.error(err));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMins < 1) return 'Baru saja';
    if (diffMins < 60) return `${diffMins} menit yang lalu`;
    if (diffHours < 24) return `${diffHours} jam yang lalu`;
    if (diffDays < 7) return `${diffDays} hari yang lalu`;
    return date.toLocaleDateString('id-ID');
  };

  const getCategoryIcon = (category) => {
    const icons = {
      matematika: '📐',
      fisika: '⚛️',
      kimia: '🧪',
      biologi: '🧬',
      bahasa: '🇬🇧',
      umum: '💬'
    };
    return icons[category] || '💬';
  };

  const filteredPosts = posts
    .filter(p => filter === 'all' || p.category === filter)
    .filter(p => 
      searchQuery === '' ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.content.toLowerCase().includes(searchQuery.toLowerCase())
    );

  if (loading) {
    return (
      <div className="forum-container">
        <p>Memuat forum...</p>
      </div>
    );
  }

  if (selectedPost) {
    return (
      <div className="forum-container">
        <button className="btn-back" onClick={() => setSelectedPost(null)}>
          ← Kembali ke Forum
        </button>

        <div className="post-detail">
          <div className="post-header">
            <div className="post-meta">
              <span className="category-badge">
                {getCategoryIcon(selectedPost.category)} {selectedPost.category}
              </span>
              <span className="post-author">oleh {selectedPost.author}</span>
              <span className="post-date">{formatDate(selectedPost.created_at)}</span>
            </div>
            <h1>{selectedPost.title}</h1>
            <p className="post-content">{selectedPost.content}</p>
            
            <div className="post-actions">
              <button 
                className="upvote-btn"
                onClick={() => upvotePost(selectedPost.id)}
              >
                👍 {selectedPost.upvotes}
              </button>
              <span className="reply-count">
                💬 {selectedPost.replies.length} jawaban
              </span>
              {isAdmin && (
                <button 
                  className="delete-btn"
                  onClick={() => deletePost(selectedPost.id)}
                  style={{ marginLeft: 'auto', color: 'red', background: 'none', border: '1px solid red', borderRadius: '4px', padding: '4px 10px', cursor: 'pointer' }}
                >
                  🗑️ Hapus Post
                </button>
              )}
            </div>
          </div>

          <div className="replies-section">
            <h3>💬 Jawaban ({selectedPost.replies.length})</h3>
            
            {selectedPost.replies.length > 0 ? (
              <div className="replies-list">
                {selectedPost.replies.map(reply => (
                  <div key={reply.id} className="reply-item">
                    <div className="reply-header">
                      <strong>{reply.author}</strong>
                      <span className="reply-date">{formatDate(reply.created_at)}</span>
                    </div>
                    <p className="reply-content">{reply.content}</p>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <button 
                        className="upvote-btn small"
                        onClick={() => upvoteReply(selectedPost.id, reply.id)}
                      >
                        👍 {reply.upvotes}
                      </button>
                      {isAdmin && (
                        <button 
                          className="delete-btn small"
                          onClick={() => deleteReply(selectedPost.id, reply.id)}
                          style={{ color: 'red', background: 'none', border: '1px solid red', borderRadius: '4px', padding: '2px 8px', cursor: 'pointer', fontSize: '0.85em' }}
                        >
                          🗑️ Hapus
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <p>Belum ada jawaban. Jadilah yang pertama menjawab!</p>
              </div>
            )}

            <div className="reply-form">
              <h4>Tulis Jawaban:</h4>
              <textarea
                value={newReply}
                onChange={(e) => setNewReply(e.target.value)}
                placeholder="Bagikan pengetahuanmu di sini..."
                rows="4"
              />
              <button 
                className="btn-primary"
                onClick={() => addReply(selectedPost.id)}
              >
                Kirim Jawaban
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="forum-container">
      <div className="forum-header">
        <h1>💬 Forum Diskusi</h1>
        <p>Bertanya, berbagi, dan belajar bersama</p>
      </div>

      {/* Create New Post */}
      <div className="create-post-card">
        <h3>✍️ Buat Pertanyaan Baru</h3>
        <div className="form-group">
          <select 
            value={newPost.category}
            onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
            className="category-select"
          >
            <option value="matematika">📐 Matematika</option>
            <option value="fisika">⚛️ Fisika</option>
            <option value="kimia">🧪 Kimia</option>
            <option value="biologi">🧬 Biologi</option>
            <option value="bahasa">🇬🇧 Bahasa</option>
            <option value="umum">💬 Umum</option>
          </select>
        </div>
        <input
          type="text"
          placeholder="Judul pertanyaan..."
          value={newPost.title}
          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
          className="title-input"
        />
        <textarea
          placeholder="Jelaskan pertanyaanmu dengan detail..."
          value={newPost.content}
          onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
          rows="4"
          className="content-input"
        />
        <button className="btn-primary" onClick={createPost}>
          Posting Pertanyaan
        </button>
      </div>

      {/* Filters and Search */}
      <div className="forum-controls">
        <div className="filter-buttons">
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            Semua
          </button>
          <button 
            className={`filter-btn ${filter === 'matematika' ? 'active' : ''}`}
            onClick={() => setFilter('matematika')}
          >
            📐 Matematika
          </button>
          <button 
            className={`filter-btn ${filter === 'fisika' ? 'active' : ''}`}
            onClick={() => setFilter('fisika')}
          >
            ⚛️ Fisika
          </button>
          <button 
            className={`filter-btn ${filter === 'bahasa' ? 'active' : ''}`}
            onClick={() => setFilter('bahasa')}
          >
            🇬🇧 Bahasa
          </button>
        </div>
        
        <input
          type="search"
          placeholder="🔍 Cari pertanyaan..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Posts List */}
      <div className="posts-list">
        {filteredPosts.length > 0 ? (
          filteredPosts.map(post => (
            <div 
              key={post.id} 
              className="post-card"
              onClick={() => loadPostDetail(post.id)}
            >
              <div className="post-card-header">
                <span className="category-badge">
                  {getCategoryIcon(post.category)} {post.category}
                </span>
                <h3>{post.title}</h3>
              </div>
              
              <p className="post-preview">
                {post.content.substring(0, 150)}
                {post.content.length > 150 ? '...' : ''}
              </p>
              
              <div className="post-footer">
                <span className="post-author">👤 {post.author}</span>
                <span className="post-date">🕐 {formatDate(post.created_at)}</span>
                <span className="post-stats">
                  👍 {post.upvotes} • 💬 {post.reply_count}
                </span>
                {isAdmin && (
                  <button 
                    className="delete-btn small"
                    onClick={(e) => {
                      e.stopPropagation();
                      deletePost(post.id);
                    }}
                    style={{ color: 'red', background: 'none', border: '1px solid red', borderRadius: '4px', padding: '2px 8px', cursor: 'pointer', fontSize: '0.85em' }}
                  >
                    🗑️
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <h3>Tidak ada pertanyaan ditemukan</h3>
            <p>Coba ubah filter atau buat pertanyaan baru!</p>
          </div>
        )}
      </div>

      {/* Forum Guidelines */}
      <div className="forum-guidelines">
        <h3>📌 Panduan Forum</h3>
        <ul>
          <li>✅ Tulis pertanyaan dengan jelas dan detail</li>
          <li>✅ Pilih kategori yang sesuai</li>
          <li>✅ Berikan jawaban yang membantu dan konstruktif</li>
          <li>✅ Upvote jawaban yang bermanfaat</li>
          <li>❌ Jangan spam atau posting yang tidak relevan</li>
          <li>❌ Jangan kasar atau menyinggung</li>
        </ul>
      </div>
    </div>
  );
};

export default DiscussionForum;