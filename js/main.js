
// function to display posts
let displayPosts = () => {

    let temp = '';
    for (let i = 0; i< posts.length; i++) {

        temp+=`<h2 class="blog-post-title">${posts[i].id}- ${posts[i].title}</h2>
        <p class="blog-post-meta">January 1, 2014 by <a href="#">${posts[i].userId}</a></p>

        <p class="blog-post-body">${posts[i].body}</p>`
        document.getElementById('blogPost').innerHTML = temp;
   
    }
}

// Array to store data
let posts =[];

// get posts from localStorage if it exist
posts =JSON.parse(localStorage.getItem('posts'));
if (posts!=null) { displayPosts();}
else {
    // Promise for get posts from api
    let getPosts = new Promise((resolve, reject) => {
        // instance XHR to interact with server
        let request = new XMLHttpRequest;
        request.open('get', 'https://jsonplaceholder.typicode.com/posts');
        request.send();
        request.onload = () => {
            // Success case
            if (request.status == 200) {
                resolve(JSON.parse(request.response));
            }
            // Failed case
            else if (request.status == 404) {
                let error = 'No Posts';
                reject(error);
            }   
        }
    });

    // After fetch api proccess success
    getPosts.then ((postsData) => {
        // Store posts in posts array
        posts = postsData;
        // Display posts in DOM
        displayPosts();

        // Set posts in localStorage must be stringify
        localStorage.setItem('posts', JSON.stringify(posts));
    }, (error) => {
        console.error(error);});
}// end of else statment


