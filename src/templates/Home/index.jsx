import { Component } from 'react';
import { Button } from '../../components/Button';
import { Posts } from '../../components/Posts';
import { TextInput } from '../../components/TextInput';
import { loadPosts } from '../../utils/load-posts';

import './style.css';

class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 2,
    searchValue: '',
  };

  async componentDidMount() {
    await this.loadPosts();
  }

  loadPosts = async () => {
    const { page, postsPerPage } = this.state;
    const postsAndPhotos = await loadPosts();

    this.setState({
      posts: postsAndPhotos.slice(page, postsPerPage),
      allPosts: postsAndPhotos,
    });
  };

  loadMorePosts = () => {
    const { page, postsPerPage, allPosts } = this.state;
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    //posts.push(...nextPosts);
    this.setState({ posts: nextPosts, page: nextPage });
  };

  hendleChange = (e) => {
    const { value } = e.target;
    this.setState({ searchValue: value });
  };

  render() {
    const { posts, page, postsPerPage, allPosts, searchValue } = this.state;
    const noMorePosts = page + postsPerPage >= allPosts.length;
    const filteredPosts = !!searchValue
      ? allPosts.filter((post) => {
          return post.title.toLowerCase().includes(searchValue.toLowerCase());
        })
      : posts;

    return (
      <section className='container'>
        <div className='search-container'>
          {!!searchValue && <h1>Seach value: {searchValue}</h1>}
          <TextInput
            searchValue={searchValue}
            hendleChange={this.hendleChange}
          ></TextInput>
        </div>

        {filteredPosts.length > 0 && <Posts posts={filteredPosts} />}
        {filteredPosts.length === 0 && <p>Não exitem posts</p>}

        <div className='button-container'>
          {!searchValue && (
            <Button
              text='Load more posts'
              onClick={this.loadMorePosts}
              disabled={noMorePosts}
            />
          )}
        </div>
      </section>
    );
  }
}
export default Home;
