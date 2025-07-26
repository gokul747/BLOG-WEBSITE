let posts = JSON.parse(localStorage.getItem("posts")) || [];

function savePosts() {
  localStorage.setItem("posts", JSON.stringify(posts));
}

function renderPosts() {
  const blogContainer = document.getElementById("blog-container");
  blogContainer.innerHTML = "";

  const searchQuery = document.getElementById("search-input").value.toLowerCase();
  const selectedCategory = document.getElementById("category-filter").value;

  posts.forEach((post, index) => {
    if (
      (post.title.toLowerCase().includes(searchQuery) || post.content.toLowerCase().includes(searchQuery)) &&
      (selectedCategory === "" || post.category === selectedCategory)
    ) {
      const postDiv = document.createElement("div");
      postDiv.classList.add("blog-post");

      postDiv.innerHTML = `
        <h3>${post.title}</h3>
        <p><strong>Category:</strong> ${post.category}</p>
        <img src="${post.image}" alt="Post Image" />
        <p>${post.content}</p>
        <div class="comment-section">
          <input type="text" class="comment-input" placeholder="Add a comment..." />
          <button class="comment-button">Comment</button>
          <div class="comment-list">${(post.comments || []).map(c => `<div class="comment">${c}</div>`).join("")}</div>
        </div>
        <button class="delete-button">Delete Post</button>
      `;

      // Handle comments
      postDiv.querySelector(".comment-button").onclick = () => {
        const input = postDiv.querySelector(".comment-input");
        if (input.value.trim() !== "") {
          post.comments = post.comments || [];
          post.comments.push(input.value);
          savePosts();
          renderPosts();
        }
      };

      // Handle deletion
      postDiv.querySelector(".delete-button").onclick = () => {
        if (confirm("Are you sure you want to delete this post?")) {
          posts.splice(index, 1);
          savePosts();
          renderPosts();
          updateCategoryDropdown();
        }
      };

      blogContainer.appendChild(postDiv);
    }
  });
}

function updateCategoryDropdown() {
  const dropdown = document.getElementById("category-filter");
  const uniqueCategories = [...new Set(posts.map(p => p.category))];
  dropdown.innerHTML = '<option value="">All Categories</option>';
  uniqueCategories.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    dropdown.appendChild(option);
  });
}

function addPost() {
  const title = document.getElementById("title").value;
  const category = document.getElementById("category").value;
  const content = document.getElementById("content").value;
  const imageFile = document.getElementById("image-upload").files[0];

  if (!title || !category || !content || !imageFile) {
    alert("Please fill in all fields and upload an image.");
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    const newPost = {
      title,
      category,
      content,
      image: e.target.result,
      comments: []
    };
    posts.unshift(newPost);
    savePosts();
    renderPosts();
    updateCategoryDropdown();

    // Reset form
    document.getElementById("title").value = "";
    document.getElementById("category").value = "";
    document.getElementById("content").value = "";
    document.getElementById("image-upload").value = "";
  };
  reader.readAsDataURL(imageFile);
}

document.getElementById("search-input").addEventListener("input", renderPosts);
document.getElementById("category-filter").addEventListener("change", renderPosts);

// Load everything
renderPosts();
updateCategoryDropdown();
