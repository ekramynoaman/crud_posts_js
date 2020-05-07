
// function to display posts
let displayPosts = () => {

    let temp = '';
    for (let i = 0; i< posts.length; i++) {

        temp+=`<strong class="d-inline-block mb-2 text-primary">${posts[i].category}</strong><h2 class="blog-post-title">${posts[i].title}</h2>
        <p class="blog-post-meta"><a href="#">${posts[i].createdby}</a> ${posts[i].createdat}</p>

        <p class="blog-post-body">${posts[i].content}</p>`
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
        request.open('GET', 'http://localhost:3000/xlarge/post/list');
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


