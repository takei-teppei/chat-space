$(function(){
  function buildHTML(message){
    var image = message.image_url?`<img class="chat_contents__message" src="${message.image_url}">`:"";
    var html = `<div class="chat-message" data-id="${message.id}">
                  <div class="chat_contents__top--username">
                    ${message.name}
                  </div>
                  <div class="chat_contents__top--datetimes">
                    ${message.date}
                  </div>
                  <p class="chat_contents__message">
                    ${message.content}
                  </p>
                    ${image}
                </div>`
    return html;
  };

  $('#new_message').on("submit", function(e){
    e.preventDefault()
    var formData = new FormData(this);
    var url = $(this).attr("action");
    $.ajax({
      url: url, 
      type: 'POST',
      data: formData,  
      dataType: 'json',
      processData: false,
      contentType: false
    })  
    .done(function(message){
      var html = buildHTML(message);
      $('.chat_contents').append(html)
      $('#new_message')[0].reset();
      $('.chat_contents').animate({ scrollTop: $('.chat_contents')[0].scrollHeight});
    })
    .fail(function(){
      alert("メッセージ送信に失敗しました");
    })
    .always(function(){
      $('.form__btn--submit').prop('disabled', false);
    });
  })

  var reloadMessages = function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      var last_message_id = $(".chat-message").last().data("id");
      $.ajax({
        url: "api/messages",
        type: 'GET',
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function(messages) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.chat_contents').append(insertHTML)
        $('.chat_contents').animate({ scrollTop: $('.chat_contents')[0].scrollHeight});
      })
      .fail(function() {
        alert('error');
      })
    };
  }
  setInterval(reloadMessages, 7000);
}); 
