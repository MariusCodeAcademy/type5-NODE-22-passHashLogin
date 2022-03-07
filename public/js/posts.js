console.log('posts');
const URL = 'http://localhost:3000';
const postContainerEl = document.querySelector('.flex-container');

// getPostsFe
// su fetch parsisiusnciam postus is http://localhost:3000/posts
// log response data
// kai gaunam duomenis piesiam/generuojam korteles su gautais duomenim
// renderPosts()

async function getPostsFe() {
  const resp = await fetch(`${URL}/posts`);
  const dataInJs = await resp.json();
  console.log('dataInJs ===', dataInJs);
  if (dataInJs.success === true) {
    renderPosts(dataInJs.data, postContainerEl);
  }
}

function renderPosts(postsArray, dest) {
  dest.innerHTML = '';
  console.log('postsArray ===', postsArray);
  const newPostsArrayString = postsArray
    .map(
      (post) => `
    <div data-id='${post.post_id}' class="card">
      <h3 class="c__title">${post.title}</h3>
      <p class="c__text">${post.body}</p>
      <button>Learn more</button>
      <h4>Category: ${post.category}</h4>
    </div>
  `,
    )
    .join('');
  dest.innerHTML = newPostsArrayString;
}

getPostsFe();
