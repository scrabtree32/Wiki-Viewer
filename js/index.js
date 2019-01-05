$(document).ready(function() {

var searchOpen= false;
  
$(".search").click(function(){
  if (!searchOpen) {
    getSearchBar();
    searchOpen = true;
  } else {
    closeSearch();
    searchOpen = false;
  }
});


function getSearchBar() {
   $(".search").removeClass('closed');
   $(".search").addClass('open'); 
   $("#bar").removeClass('bar-close');
   $("#bar").addClass('bar-open');
   $("input").focus(); 
}

function closeSearch() {
  $(".search").addClass('closed');
  $(".search").removeClass('open');
  $("#bar").addClass('bar-close');
  $("#bar").removeClass('bar-open');
  
  $(".words").removeClass('hide');
  $(".articles").addClass('hide');
  $("input").val('');
  $(".container").addClass('margin');
}

function showArticles() {
  $(".articles").removeClass('hide');
 // $(".container").removeClass('margin'); 
}
  
function getWiki (event) {
  var input = $('input'),
      searchTerm = input.val(),
      x = event.keyCode;
  if (x == 13 && input.val() != '') {
    $.ajax({
      url: 'https://en.wikipedia.org/w/api.php?action=query&format=json&prop=links%7Cextracts%7Cinfo&meta=&titles=' + searchTerm + '&generator=search&redirects=1&formatversion=2&pllimit=10&exsentences=1&exlimit=10&exintro=1&inprop=url&gsrsearch=' + searchTerm + '&gsrlimit=10&gsrwhat=text&gsrprop=snippet%7Ctitlesnippet',
      type: 'GET',
      dataType: 'jsonp',
      success: function(data) {
        //Show title and 1st sentence of each article
        for (var i = 0; i < 10; i++) {
          $(".title" + i).html(data.query.pages[i].title);
          $(".sent" + i).html(data.query.pages[i].extract);
        };
          //Get rid of links
        getRidLink();
        for (var j = 0; j < 10; j++) {   
          getRidLink(j);
        };
        function getRidLink(j) {
          $(".art" + j).off("click");
        }
        //Go to link on click 
        getLink();
        for (var j = 0; j < 10; j++) {   
            getLink(j);
        };
        function getLink(j) {
          $(".art" + j).click(function() {
            window.open(data.query.pages[j].fullurl);
          });
        }
      },
      error: function(err) { alert(err); }
    });
    showArticles();
  }
}
  
$('input').keydown(function(event) {
  getWiki(event);
});
  
});