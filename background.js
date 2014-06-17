$(".comment_author").after("<span class=mute_commenter>(mute)</span>");

// $(".mute_commenter").click(function() {
$(document).on('click', '.mute_commenter', function() {
  userName = $(this).prev().text();
  toggleCommenter(userName, "mute");
});

// $(".show_commenter").click(function() {
$(document).on('click', '.show_commenter', function() {
  userName = $(this).prev().text();
  toggleCommenter(userName, "show");
});

function toggleCommenter(userName, muteAction) {
  console.log("Toggle user: " + userName + " with muteAction: " + muteAction);

  $(".comment_author").each( function() {
    if ( $(this).text() == userName ) {
      commentId = $(this).parent().attr('id').substr(8);   // 'comment-XXXXXXX'
      commentBody = "comment-body-" + commentId;

      if (muteAction == "mute") {
        $("#" + commentBody).hide();

        $(this).before("<span class=douche>&ngt;</>");
        $(this).hide().next().text("(show)").attr('class', 'show_commenter');
      }
      else if (muteAction == "show") {
        $("#" + commentBody).show();

        $(this).prev(".douche").remove();
        $(this).show().next().text("(mute)").attr('class', 'mute_commenter');
      }
    }
  });
}

// show the MR icon
chrome.tabs.onUpdated.addListener(showMRIconAction);


function showMRIconAction(tabId, changeInfo, tab) {
  if (tab.url.indexOf('marginalrevolution.com') {
    chrome.pageAction.show(tabId);
  }
};
