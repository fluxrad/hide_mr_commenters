var authorElems = document.querySelectorAll(".comment_author");
var mutedAuthors = [];

chrome.storage.sync.get('mutedAuthors', function(result) { 
  if (result.hasOwnProperty('mutedAuthors')) {
    if (result.mutedAuthors.length > 0) { 
      mutedAuthors = result.mutedAuthors;
    }
  }
  initializePage();
});

// create the mute option for every comment author.
function initializePage() {
  console.log("Already muted authors: " + mutedAuthors);

  // add mute links for err'body
  for (var i = 0; i < authorElems.length; ++i) {
     var authorElem = authorElems[i];
     var authorName = authorElem.textContent;

     authorElem.insertAdjacentHTML('afterend', '<span class="mute_button">[mute]</span>');
     var muteLink = authorElem.nextElementSibling;
     muteLink.addEventListener('click', toggleMute, false);
  }

  // now mute anyone who should already be muted
  for (var i = 0; i < mutedAuthors.length; ++i) {
    toggleAuthorComments(mutedAuthors[i]);
  }

}

function toggleAuthorStatus(authorName) { 
  var authorStatus = '';
  var authorIndex = mutedAuthors.indexOf(authorName);
  if (authorIndex != -1) {
    mutedAuthors.splice(authorIndex, 1);
  } else {
    mutedAuthors.push(authorName);
  }

  chrome.storage.sync.set({ 'mutedAuthors' : mutedAuthors }, function() {
    console.log("set muted authors to: " + JSON.stringify(mutedAuthors));
  });
}

function toggleMute() { 
  var muteButton = this;
  var authorElem = this.previousElementSibling;
  var authorName = authorElem.textContent;

  toggleAuthorStatus(authorName);
  toggleAuthorComments(authorName);
}

function toggleAuthorComments(authorName) {
  for (var i = 0; i < authorElems.length; ++i) {
    var authorElem = authorElems[i];

    if (authorElem.textContent == authorName) {
      var muteElem = authorElem.nextElementSibling;
      var commentDt = authorElem.parentElement;
      var commentId = commentDt.id.substr(8);
      var commentBody = document.getElementById("comment-body-" + commentId);

      muteElem.textContent = muteElem.textContent == '[mute]' ? '[unmute]' : '[mute]';
      authorElem.classList.toggle("muted_author");
      commentBody.classList.toggle("nodisplay");
    }
  }
}
