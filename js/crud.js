// load JQuery to prevent Conflict
$(window).on('load', function(){ 
    
    // get table body element to diplay posts
    const tablBody = document.getElementById('tableBody');
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

            // Store posts in localStorge
            localStorage.setItem('posts',JSON.stringify(posts));

            // Display posts in DOM
            displayPosts();

        
        }, (error) => {
            console.error(error);
            
        });

    } // End of Else statment

    // Event to handle post btns
    tableBody.addEventListener('click', editDeleteBtns);

    // Display posts function
    function displayPosts () {
        // Declar temp to push posts 
        let temp = '';
        for (let i = 0; i< posts.length; i++) {

            temp+=`<tr><td scope="row">${posts[i].title}</td><td class="blog-post-body">${posts[i].body}</td>
                <td><a data_index="${i}" data_id="${posts[i].id}" class="editbtn btn btn-primary btn-sm btn-outline-secondary text-white">Edit</a>
                <a data_index="${i}" data_id="${posts[i].id}" class="delbtn btn btn-danger btn-sm btn-outline-secondary text-white" data-toggle="modal" data-target="#warningModal">Delete</a></td>
            </tr>`

            tablBody.innerHTML = temp;

        }   
    }

    // Edit || Delete post function
    function editDeleteBtns (e) {

        // Declare variable to store post id of clicked btn
        let postId;
        // Declare variable to store post index of clicked btn
        let postIndex;

                // Handle delete post btn
                if (e.target.classList.contains('delbtn')) {
        
                    // store post id  of clicked btn
                    postId = e.target.getAttribute('data_id');

                    // store post Index  of clicked btn
                    postIndex = e.target.getAttribute('data_index');
        
                    // Get modal confirm button element
                    let confirmDelete = document.getElementById('confirmDelete');
                    // show modal
                    $('#warningModal').modal('show');// P.s using jq to prevent conflict
                    
                    // Event on confirm btn clicked
                    confirmDelete.addEventListener('click', function (){

                        // remove post from localStorage and redisplay it
                        posts.splice(postIndex, 1);
                        localStorage["posts"] = (JSON.stringify(posts));
                        displayPosts();
                        $('#warningModal').modal('hide');

                        // Delete post from api
                        let delRequest = new Promise ((resolve,reject) => {
                            let request = new XMLHttpRequest;
                            request.open('DELETE', `https://jsonplaceholder.typicode.com/posts/${postId}`);
                            request.send();
                            request.onload = () => {
                                if (request.status === 200) {
                                    resolve(Response);
                                    console.log(request.response);
                                    alert('Post is deleted');
                                }
                                else if (request.status === 404){
                                    let error = 'No posts DELETED'
                                    reject(error);
                                }
                            }
                        });
        
                        delRequest.then((message) => {
                            console.log(message);
                        }, (error) => {
                            console.log(error);
                        });
                    });
                }

                // Handle Edit post btn
                else if (e.target.classList.contains('editbtn')) {
                    // store post id  of clicked btn
                    postId = e.target.getAttribute('data_id');
                    // Go to edit post page
                    window.location.href = './edit_post.html?'+postId

                }
            }


}); // End of JQ function




