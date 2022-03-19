import { AppControlContext } from "../../context/AppControlContext";
import { useContext, useState } from "react";
import LoginPopup from "../../components/Popups/LoginPopup";
import HeroBottom from "../../components/HeroBottom/HeroBottom";
import BlogItem from "../../components/Cards/BlogItem";
import BlogItems from "./util/BlogItems";

const Blog = () => {
  const [selectedBlog, setSelectedBlog] = useState(0);
  const { loginPopupState, setLoginPopupState } = useContext(AppControlContext);
  const changeLoginPopupState = () => {
    setLoginPopupState(!loginPopupState);
  };

  const changeSelectedBlog = (id) => {
    setSelectedBlog(id);
    window.scrollTo(0, 0);
  };

  return (
    <div id="dashboard-page" className="white-page">
      <section className="dashboard">
        <div className="container">
          <div className="dashboard__row">
            <div className="dashboard__content dashboard__content--sm">
              <div className="sub-menu">
                {selectedBlog > 0 && (
                  <div className="active-blog">
                    <div className="blog-detail">
                      <div className="blog-back-btn">
                        <a href="#0" onClick={() => changeSelectedBlog(0)}>
                          <i className="icon-angle-left"></i>
                        </a>
                      </div>
                      <div className="blog-detail-sec">
                        <h1>{BlogItems[selectedBlog - 1].heading}</h1>
                      </div>
                    </div>
                    <img
                      src={BlogItems[selectedBlog - 1].image}
                      alt={BlogItems[selectedBlog - 1].heading}
                    ></img>
                    <p>{BlogItems[selectedBlog - 1].description}</p>
                    {/* <h3>Sub Titles</h3>
                    <p>Some content goes here akjsd a kasd lkasda dladalksjdakljd alksdja salk dlkda slkda dalkdla sdla dlandasndlasdasldnald ld adlakdajda dlanmda dlasd lsad ald</p> */}
                    {BlogItems[selectedBlog - 1]["subParts"].map((obj) => (
                      <div>
                        <h3>{Object.entries(obj)[0][0]}</h3>
                          <p>{Object.entries(obj)[0][1]}</p>
                      </div>
                    ))}
                  </div>
                )}
                {selectedBlog === 0 ? (
                  <article className="text">
                    <h1>Blog</h1>
                  </article>
                ) : (
                  <h1 className="secondary-title">More News</h1>
                )}
                <div>
                  {BlogItems.map((item, index) => (
                    <BlogItem
                      id={index + 1}
                      heading={item.heading}
                      image={item.image}
                      description={item.description}
                      key={index + 1}
                      onclick={changeSelectedBlog}
                    />
                  ))}
                  {/* <div className="blog-btn-wrap">
                    <a className="btn btn--full alert--success">
                      Loading more ...
                    </a>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <HeroBottom description="Ready to Fuel Up Your Business?" />
      <LoginPopup
        popupState={loginPopupState}
        onClose={changeLoginPopupState}
      />
    </div>
  );
};

export default Blog;
