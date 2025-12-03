import { useState, useEffect, useRef } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import ModalForm from './ModalForm'
import BackToTopButton from './BackToTopButton'
import SummaryInputBox from './AIResponseBox/SummaryInputBox'
import './Blogs.scss'

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const cardRefs = useRef({});

  const scrollToCard = (id) => {
    const card = cardRefs.current[id];
    if (card) {
      card.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_CNAPP_DATA_SERVICE_BASE_URL}/data/gks`)
    .then(response => response.json())
    .then(data => {
        setBlogs(data);
    })
    .catch(error => {
        console.error('Error fetching blogs:', error);
    });
  }, [])

  return (
    <>
      <Header pageName={'Blogs'} />
      <div className="blog-header-buttons">
        {blogs.map((blog) => (
          <button
            key={blog.id}
            onClick={() => scrollToCard(blog.id)}
            className="blog-scroll-btn"
          >
            {blog.qno}
          </button>
        ))}
      </div>
      <SummaryInputBox blogs={blogs} />
      <div className="blogs-page">
        <h1 className="page-title">Latest GKs</h1>
        <div className="blogs-container">
          {blogs.map((blog) => (
            <div key={blog.id} className="blog-card" ref={(el) => (cardRefs.current[blog.id] = el)}>
              <div className="blog-image-container">
                <img src={blog.imageUrl} alt={blog.qno} className="blog-image" />
              </div>
              <div className="blog-content">
                <h2 className="blog-title">{blog.qno}</h2>
                {/* <p className="blog-excerpt">
                  {blog.excerpt}
                </p> */}
                <p
                  className="blog-excerpt"
                  dangerouslySetInnerHTML={{
                    __html: blog.ques.replace(/\n/g, "<br />")
                  }}
                ></p>
                {
                  blog.tags !== null && 
                    <div className="blog-tags">
                      {blog.tags.map((tag, index) => (
                        <span key={index} className="blog-tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                }
                {
                  blog.ans != "" && 
                    <div className="blog-category">
                      <strong>Ans:</strong> {blog.ans}
                    </div>
                }
              </div>
            </div>
          ))}
        </div>
        <div className="add-blog-container">
          <button onClick={openModal} className="open-modal-btn">Create GK Entry</button>
          {showModal && <ModalForm closeModal={closeModal} />}
        </div>
      </div>
      <BackToTopButton />
      <Footer/>
    </>
  )
}

export default Blogs
