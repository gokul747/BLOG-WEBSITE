function addPost() {
  const title = document.getElementById("title").value;
  const category = document.getElementById("category").value;
  const content = document.getElementById("content").value;
  const imageInput = document.getElementById("image-upload");
  const imageFile = imageInput.files[0];

  if (!title || !category || !content || !imageFile) {
    alert("Please fill in all fields and upload an image.");
    return;
  }

  const reader = new FileReader();

  reader.onload = function(e) {
    const imageSrc = e.target.result;

    const postDiv = document.createElement("div");
    postDiv.classList.add("blog-post");

    postDiv.innerHTML = `
      <h3>${title}</h3>
      <p><strong>Category:</strong> ${category}</p>
      <img src="${imageSrc}" alt="${title}" />
      <p>${content}</p>
      <div class="comment-section">
        <input type="text" class="comment-input" placeholder="Add a comment..." />
        <button class="comment-button">Comment</button>
        <div class="comment-list"></div>
      </div>
    `;

    // Add comment functionality
    const commentBtn = postDiv.querySelector(".comment-button");
    const commentInput = postDiv.querySelector(".comment-input");
    const commentList = postDiv.querySelector(".comment-list");

    commentBtn.addEventListener("click", function() {
      const commentText = commentInput.value.trim();
      if (commentText) {
        const comment = document.createElement("div");
        comment.classList.add("comment");
        comment.textContent = commentText;
        commentList.appendChild(comment);
        commentInput.value = "";
      }
    });

    document.getElementById("blog-container").prepend(postDiv);

    // Clear input fields
    document.getElementById("title").value = "";
    document.getElementById("category").value = "";
    document.getElementById("content").value = "";
    document.getElementById("image-upload").value = "";
  };

  reader.readAsDataURL(imageFile);
}
