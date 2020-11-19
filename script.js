const postsContainer = document.getElementById('posts-container');
const loading = document.querySelector('.loader');
const filter = document.getElementById('filter');

let limit = 5;
let page = 1;

// fetch posts from API
async function getPosts() {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`);

    const data = await res.json();

    return data
}

// Show posts in DOM
async function showPosts() {
    const posts = await getPosts();

    // console.log(posts)
    posts.forEach(post => {
        const postEl = document.createElement('div');
        postEl.classList.add('post');
        postEl.innerHTML = `
            <div class="number">${post.id}</div>
            <div class="post-info">
                <h2 class="post-title">${post.title}</h2>
                <p class="post-body">${post.body}</p>
            </div>
        `;

        postsContainer.appendChild(postEl);
    });
};

// show loader and fetch more posts
function showLoading(){
    loading.classList.add('show');

    setTimeout(() => {
        loading.classList.remove('show');

        setTimeout(() => {
            page++;
            showPosts();
        }, 300);
    }, 1000);
};

// // filter posts by input
// function filterPosts(e) {
//     const term = e.target.value.toUpperCase();
//     const posts = document.querySelectorAll('.post');

//     posts.forEach(post => {
//         const title = post.querySelector('.post-title').innerText.toUpperCase();
//         const body = post.querySelector('.post-body').innerText.toUpperCase();

//         if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
//             post.style.display = 'flex';
//         } else {
//             post.style.display = 'none';
//         }
//     })
// }

// filter posts by input
function filterPosts(e) {
    const term = e.target.value.toUpperCase();
    const posts = document.querySelectorAll('.post');

    posts.forEach(post => {
        const title = post.querySelector('.post-title').innerText.toUpperCase();
        const body = post.querySelector('.post-body').innerText.toUpperCase();

        if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
            post.style.display = 'flex';
        } else {
            post.style.display = 'none';
        }
    })
}

// Show initial posts
showPosts();

window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight,  clientHeight} = 
    document.documentElement;
    // console.log(`pixels from top is ${scrollTop}`);
    // console.log(`entire  VIEWABLE height ${clientHeight}`);
    // console.log(`entire height of element is ${scrollHeight}`);

    if (scrollTop + clientHeight >= scrollHeight ){
        // user has reached bottom of page
        showLoading();
    }
});

filter.addEventListener('input', filterPosts);