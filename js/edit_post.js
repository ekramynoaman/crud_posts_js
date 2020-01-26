// Globle Variable of inputs
const postName = document.getElementById('postName');
const postContent = document.getElementById('postContent');
const postForm = document.getElementById('postForm');
const saveAlert = document.getElementById('saveAlert');

// Get posts from local storge
let posts = JSON.parse(localStorage.getItem('posts'));
// get id of the post
let postId = window.location.href.substring(window.location.href.lastIndexOf('?') + 1)

for (let i = 0; i<posts.length; i++ ) {

    if (posts[i].id == postId) {
        // Set post data in inputs values
        postName.value = posts[i].title;
        postContent.value = posts[i].body;
    }

}
// Save post after edit
postForm.addEventListener('submit', (e) => {

    e.preventDefault();

    for (var i = 0; i < posts.length; i++) {
        // Check if inputs are empty
        if (postName.value == '' || postContent == '' ) {
            saveAlert.style.display = 'block';
        }
        else if (posts[i].id == postId) {
            posts[i].title = postName.value;
            posts[i].body = postContent.value;

            localStorage['posts'] =  JSON.stringify(posts);
            // Go to edit post page
            document.location.href = "posts.html";
        }
    }




        let saveRequest = new Promise ((resolve,reject) => {
            let request = new XMLHttpRequest;
            request.open('PUT', `https://jsonplaceholder.typicode.com/posts/${postId}`);
            request.send();
            request.onload = () => {
                if (request.status === 200) {
                    resolve(Response);
                    console.log(request.response)

                }
                else if (request.status === 404){
                    let error = 'No posts saved'
                    reject(error);

                }
            }

        });

        saveRequest.then((message) => {
            console.log(message);
            

        }, (error) => {
            console.log(error);
        });
        
    
});
              
