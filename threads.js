var dds = document.getElementsByTagName("dd");

for (var i = 0; i < dds.length; ++i) {
  var author = dds[i].previousElementSibling.children[0];
  author.insertAdjacentHTML('beforebegin', '<span class="thread_toggle">[-]</span>');

  var threadToggle = author.previousElementSibling;
  threadToggle.addEventListener('click', toggleThread, false);
}

function toggleThread() {
   if (this.innerText == '[-]') {
     this.innerText = '[+]';
   } else {
     this.innerText = '[-]';
   }
   this.parentElement.nextElementSibling.classList.toggle("nodisplay");
}

